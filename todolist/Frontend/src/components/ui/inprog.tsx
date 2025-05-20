import axiosClient from "@/axiosClient";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { useEffect, useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";

function InProg() {
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

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const [list, setList] = useState<Task[]>([]);

  const fetchInProg = async () => {
    try {
      const response = await axiosClient.get(`/fetchInProg/${userId}`);
      console.log(response.data);
      const responseData = response.data;
      setList(responseData);
      console.log(list);
    } catch (e: any) {
      console.error(e.error);
    }
  };

  useEffect(() => {
    fetchInProg();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>IN PROGRESS</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 justif">
        {list ? (
          list?.slice(0, 3).map((item) => (
            <Card>
              <CardHeader className="flex justify-between">
                <div>
                <CardTitle>{item.title}</CardTitle>
                <span>{item.deadline ? item.deadline.slice(0, 10) : ""}</span>
                </div>
                <div>
                    <Button variant="ghost" className="border">Done</Button>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div>
                  <span>{item.description}</span>
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary"className="h-fit">
                    {item.priority?.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary" className="h-fit">{item.task_status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}

export default InProg;
