import { X } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import axiosClient from "@/axiosClient";
import { useEffect, useState } from "react";
import Loading from "./loading";

function UpComing() {


    type Task = {
        id: number;
        title: string;
        description: string;
        is_completed: number;
    };

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;



    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        try {
            setLoading(true)
            const response = await axiosClient.get(`/fetchTasks/${userId}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error Fetching Tasks", error);
        }finally{
            setLoading(false)
        }
    };

    useEffect(()=>{
        fetchTasks()
    },[])
    
    const visibleTasks = tasks.slice(0, 3);
    return (
        <Card className="min-h-[635px] max-h-[635px] min-w-[250px] max-w-[250px]overflow-auto">
            <CardHeader>
                <CardTitle>
                    <span className="text-lg ">UPCOMING TASKS</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading?<Loading/>:
                <ul className="flex flex-col gap-5">
                    {visibleTasks.map((task) => (
                        <li>
                            <Card className="flex flex-col gap-10">
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <span>{task.title}</span>
                                    <Button variant="ghost">
                                        <X />
                                    </Button>
                                </CardHeader>
                                <CardContent className="flex gap-5 items-center justify-between">
                                    <div>
                                        {task.description.slice(0,10)}
                                        {task.is_completed}
                                    </div>
                                    <div>
                                        <Button variant="ghost">View</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
                }
            </CardContent>
        </Card>
    );
}

export default UpComing;
