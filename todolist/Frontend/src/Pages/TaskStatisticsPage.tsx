import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PiChart} from '@/components/ui/piechart'



function TaskStatisticsPage() {



  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <PiChart></PiChart>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskStatisticsPage