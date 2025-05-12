import { Card, CardContent } from "./card";
import { Progress } from "./progress";

function DateProg() {
    const today = new Date();
    const month = today.toLocaleString("en-US", { month: "long" });
    const day = today.getDate();

    return (
        <div className="flex flex-row gap-2">
            <Card className="grow-2">
                <CardContent className="flex flex-row items-center justify-center gap-8">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-2xl">{day}</div>
                        <div className="text-xl">{month}</div>
                    </div>

                    <div className="flex flex-col flex-grow gap-2">
                        <span>Todays Task</span>
                        <Progress value={44} className="w-[100%]" />
                        <div className="flex flex-row justify-between">
                            <span>Done:</span>
                            <span>Must Do:</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default DateProg;
