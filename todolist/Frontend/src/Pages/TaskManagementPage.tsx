import axiosClient from "@/axiosClient";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";

function TaskManagementPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  type Task = {
    user_id: number;
    title: string;
    description: string;
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
  });
  const [activeTab, setActiveTab] = useState("All");
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/fetchTasks/${userId}`);
      setTasks(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addTasks = async () => {
    const data = listItem;
    try {
      const response = await axiosClient.post("/addTasks", data);
      if (response.status === 200) {
        fetchTasks();
      } else {
      }
    } catch (error) {
      console.error("Error Adding Task", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const TABLE_HEAD = ["ID", "TITLE", "DESCRIPTION", "STATUS", "ACTIONS"];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl">Task Management</span>
          <Dialog>
            <DialogTrigger>
              <Button variant="secondary">Add Task</Button>
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
                  <Switch></Switch>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className="w-full">Cancel</Button>
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
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Todo">Todo</TabsTrigger>
            <TabsTrigger value="In Progress">In Progress</TabsTrigger>
            <TabsTrigger value="Done">Done</TabsTrigger>
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
              {filteredTasks.map((task) => {
                return (
                  <tr key={task.id} className="h-16">
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      {task.is_completed === 0 ? (
                        <Badge className="bg-red-300">Incomplete</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-500">
                          Complete
                        </Badge>
                      )}
                    </td>
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
