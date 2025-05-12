import axiosClient from "@/axiosClient";
import DateProg from "@/components/ui/dateprog";
import InProg from "@/components/ui/inprog";
import UpComing from "@/components/ui/upcoming";
import { useEffect, useState } from "react";

function Homepage() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;

    interface Task {
        user_id: number;
        title: string;
        description: string;
        is_completed: boolean;
    }
    const [tasks, setTasks] = useState<Task[]>([]);
    const [listItem, setListItems] = useState<Task>({
        user_id: userId,
        title: "",
        description: "",
        is_completed: false,
    });

    const fetchTasks = async () => {
        try {
            const response = await axiosClient.get<Task[]>(
                `/fetchTasks/${userId}`
            );
            setTasks(response.data);
        } catch (e) {
            console.error(e);
        }
    };
    const addTasks = async () => {
        const data = listItem;
        try {
            const response = await axiosClient.post("/addTasks", data);
            if (response.status === 200) {
                fetchTasks();
                setListItems({
                    user_id: userId,
                    title: "",
                    description: "",
                    is_completed: false,
                });
            } else {
            }
        } catch (error) {
            console.error("Error Adding Task", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <div className="flex flex-row gap-3">
            <div className="grow-2 flex flex-col gap-5">
                <div>
                    <DateProg />
                </div>
                <div>
                    <InProg />
                </div>
            </div>
            <div className="grow-1">
                <UpComing />
            </div>
        </div>
    );
}

export default Homepage;
