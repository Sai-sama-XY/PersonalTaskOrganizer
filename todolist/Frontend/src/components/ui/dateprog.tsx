import axiosClient from "@/axiosClient";
import { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import { Progress } from "./progress";

function DateProg() {

  type ProgressData = {
  percent: number;
  in_progress: number;
  total: number;
}

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();

const [percent, setPercent] = useState<ProgressData>({
  percent: 0,
  in_progress: 0,
  total: 0,
});

  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get(`/progPercent/${userId}`,) 
      setPercent(response.data)
      console.log(response.data)
      console.log(percent)
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="flex flex-row gap-2">
      <Card className="grow-2">
        <CardContent className="flex flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl">{day}</div>
            <div className="text-xl">{month}</div>
          </div>

          <div className="flex flex-col flex-grow gap-2">
            <span>Today's Task</span>
            <Progress value={percent?.percent} className="w-[100%]" />
            <div className="flex flex-row justify-between">
              <span>Done: {percent?.in_progress}</span>
              <span>Must Do:  {percent?.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DateProg;
