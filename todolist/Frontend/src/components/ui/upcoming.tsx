import { X } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import axiosClient from "@/axiosClient";
import { useEffect, useState } from "react";
import Loading from "./loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";

function UpComing() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  interface Task {
    id: number | null;
    user_id: number;
    title: string;
    description: string;
    task_status: string;
    is_completed: number;
    orderby: string;
    priority: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedRow, setSelectedRow] = useState<Task|null>(null);
  const [listItem, setListItems] = useState<Task>({
    id: null,
    user_id: userId,
    title: "",
    description: "",
    is_completed: 0,
    task_status: "IN PROGRESS",
    orderby: "desc",
    priority: "low",
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [_orderby, setOrderBy] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/fetchTasks/${userId}`, {
        params: {
          task_status: activeTab !== "ALL" ? activeTab : null,
          orderby: _orderby ? "asc" : "desc",
          priority: listItem.priority,
        },
      });
      setTasks(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const visibleTasks = tasks.slice(0, 3);
  return (
    <Card className="min-h-[635px] max-h-[635px] min-w-[250px] max-w-[250px]overflow-auto">
      <CardHeader>
        <CardTitle>
          <span className="text-lg ">UPCOMING TASKS</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loading />
        ) : (
          <ul className="flex flex-col gap-5">
            {visibleTasks.map((task) => (
              <li key={task.id}>
                <Card className="flex flex-col gap-10">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <span>{task.title}</span>
                    <Button variant="ghost">
                      <X />
                    </Button>
                  </CardHeader>
                  <CardContent className="flex gap-5 items-center justify-between">
                    <div>
                      {task.description.slice(0, 10)}
                      {task.is_completed}
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setSelectedRow(task);
                          }}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>View Task</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="flex flex-col gap-2">
                          <Label htmlFor="tasktitle">Task Title</Label>
                          <Input id="tasktitle"value={selectedRow?.title.toUpperCase()} readOnly/>
                          <Label htmlFor="taskdesc">Details</Label>
                          <Textarea id="taskdesc"value={selectedRow?.description} readOnly/>
                          <Label htmlFor="taskstatus">Status</Label>
                          <Input id="taskstatus" value={selectedRow?.task_status}/>
                          <Label htmlFor="taskprio">Priority</Label>
                          <Input id="taskprio"value={selectedRow?.priority.toUpperCase()}/>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default UpComing;
