import axiosClient from "@/axiosClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";

function TaskManagementPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  type Task = {
    user_id: number;
    title: string;
    description: string;
    task_status: string;
    is_completed: number;
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const filteredTasks = tasks.slice(0, 10);
  const [loading, setLoading] = useState(false);
  const [listItem, setListItems] = useState<Task>({
    user_id: userId,
    title: "",
    description: "",
    is_completed: 0,
    task_status: "IN PROGRESS",
  });
  const [activeTab, setActiveTab] = useState("ALL");
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/fetchTasks/${userId}`, {
        params: {
          task_status: activeTab !== "ALL" ? activeTab : null,
        },
      });
      setTasks(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addTasks = async () => {
    const data = listItem;
    console.log(data);
    try {
      const response = await axiosClient.post("/addTasks", data);
      if (response.status === 200) {
        fetchTasks();
      } else {
      }
    } catch (error) {
      console.error("Error Adding Task", error);
    } finally {
      setListItems({ ...listItem, task_status: "IN PROGRESS" });
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [activeTab]);
  const TABLE_HEAD = ["TASK #", "TITLE", "DESCRIPTION", "STATUS", "ACTIONS"];
  const TASK_STATUS = ["COMPLETED", "IN PROGRESS", "INCOMPLETE"];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl">Task Management</span>
          <Dialog>
            <DialogTrigger className="border-2 p-3 rounded-sm">
              Add Task
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex gap-5">
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription className="flex flex-col  gap-5">
                  <Input
                    type="text"
                    placeholder="Title"
                    onChange={(e) =>
                      setListItems({ ...listItem, title: e.target.value })
                    }
                  ></Input>
                  <Textarea
                    placeholder="Description"
                    className="h-48"
                    onChange={(e) =>
                      setListItems({ ...listItem, description: e.target.value })
                    }
                  ></Textarea>
                  <Select
                    defaultValue="IN PROGRESS"
                    onValueChange={(value) =>
                      setListItems({ ...listItem, task_status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Task Status</SelectLabel>
                        {TASK_STATUS.map((item) => {
                          return (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="outline" onClick={addTasks}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-row items-center gap-5">
            <TabsTrigger value="ALL">All</TabsTrigger>
            <TabsTrigger value="INCOMPLETE">Todo</TabsTrigger>
            <TabsTrigger value="IN PROGRESS">In Progress</TabsTrigger>
            <TabsTrigger value="COMPLETED">Done</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loading />
        ) : (
          <table className=" w-full min-w-max table-auto  text-center items-center">
            <thead className="border">
              <tr className="h-16">
                {TABLE_HEAD.map((head) => {
                  return <th key={head}>{head}</th>;
                })}
              </tr>
            </thead>
            <tbody className="border">
              {filteredTasks.map((task, index) => {
                return (
                  <tr key={index + 1} className="h-16">
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description.slice(0,70)}</td>
                    <td>{task.task_status === null?<>NO STATUS</>:<Badge className={task.task_status === "COMPLETED"?"bg-primary":task.task_status==="INCOMPLETE"?"bg-red-400":task.task_status==="IN PROGRESS"?"bg-gray-400":""} variant="outline">{task.task_status}</Badge>}</td>
                    <td className="flex items-center justify-center">
                      <Button variant="ghost">
                        <PencilIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}

export default TaskManagementPage;
