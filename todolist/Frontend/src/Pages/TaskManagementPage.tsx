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
import { ArrowUpDownIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function TaskManagementPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  type priority = "all" | "low" | "medium" | "high";

  interface Task {
    id: number | null;
    user_id: number;
    title: string;
    description: string;
    task_status: string;
    is_completed: number;
    orderby: "asc" | "desc";
    priority: priority;
    deadline: string | null;
  }
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [_priority, setPriority] = useState("low");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
    total: 0,
    lastPage: 1,
  });
  const [listItem, setListItems] = useState<Task>({
    id: null,
    user_id: userId,
    title: "",
    description: "",
    is_completed: 0,
    task_status: "IN PROGRESS",
    orderby: "asc",
    priority: "all",
    deadline: "",
  });

  const handleOrder = () => {
    setOrderBy(!_orderby);
  };
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
          perPage: pagination.perPage,
          page: pagination.page,
        },
      });
      setTasks(response.data.data);
      const newPagination = {
        page: response.data.current_page,
        perPage: response.data.per_page,
        total: response.data.total, // optional if you want to render page numbers
        lastPage: response.data.last_page,
      };
      setPagination(newPagination);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addTasks = async () => {
    const formattedDate = date?.toISOString().slice(0, 10);
    const data = {
      ...listItem,
      priority: _priority,
      deadline: formattedDate,
    };
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
      setDate(new Date());
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [activeTab, _orderby, listItem.priority, pagination.page]);
  const TABLE_HEAD = [
    "TASK #",
    "TITLE",
    "DESCRIPTION",
    "STATUS",
    "PRIORITY",
    "DEADLINE",
    "ACTIONS",
  ];
  const TASK_STATUS = ["COMPLETED", "IN PROGRESS", "INCOMPLETE"];
  const PRIORITY = ["all", "low", "medium", "high"];
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
                  <div className="flex flex-col gap-2">
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
                        setListItems({
                          ...listItem,
                          description: e.target.value,
                        })
                      }
                    ></Textarea>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col gap-2">
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-fit "
                      />
                    </div>

                    <div
                      className="flex flex-col gap-5 items-start justify-start
                    h-full"
                    >
                      <Label>Select Status and Priority</Label>
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

                      <Select
                        defaultValue="low"
                        onValueChange={(value) => setPriority(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Task Priority</SelectLabel>
                            {PRIORITY.map((item) => {
                              return (
                                <SelectItem key={item} value={item}>
                                  {item.toUpperCase()}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
        <div className="flex justify-between">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-row items-center gap-5">
              <TabsTrigger value="ALL">All</TabsTrigger>
              <TabsTrigger value="INCOMPLETE">Todo</TabsTrigger>
              <TabsTrigger value="IN PROGRESS">In Progress</TabsTrigger>
              <TabsTrigger value="COMPLETED">Done</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleOrder}>
              <ArrowUpDownIcon></ArrowUpDownIcon>
            </Button>

            <Select
              defaultValue="all"
              onValueChange={(value) =>
                setListItems({ ...listItem, priority: value as priority })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={listItem.priority} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Task Priority</SelectLabel>
                  {PRIORITY.map((item) => {
                    return (
                      <SelectItem key={item} value={item}>
                        {item.toUpperCase()}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
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
              {tasks.map((task) => {
                return (
                  <tr key={task.id} className="h-16">
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description.slice(0, 10)}</td>
                    <td>
                      {task.task_status === null ? (
                        <>NO STATUS</>
                      ) : (
                        <Badge variant="outline">{task.task_status}</Badge>
                      )}
                    </td>
                    <td>{task.priority.toUpperCase()}</td>
                    <td>
                      {task.deadline
                        ? task.deadline.slice(0, 10)
                        : "No Deadline"}
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  pagination.page > 1 &&
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink >{pagination.page}</PaginationLink>
            </PaginationItem>
             <PaginationItem>
              {
              pagination.page+1 > pagination.lastPage?<></>:<PaginationLink onClick={()=>setPagination({...pagination, page:pagination.page+1 })}>{pagination.page+1}</PaginationLink>
              }
            </PaginationItem>
             <PaginationItem>
              {
              pagination.page+2 > pagination.lastPage?<></>:<PaginationLink onClick={()=>setPagination({...pagination, page:pagination.page+2 })}>{pagination.page+2}</PaginationLink>
              }
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>{
                  if (pagination.page < pagination.lastPage){
                  setPagination({ ...pagination, page: pagination.page + 1 });
                  }
                  }
            }
                
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}

export default TaskManagementPage;
