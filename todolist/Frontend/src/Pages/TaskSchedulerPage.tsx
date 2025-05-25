import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function TaskSchedulerPage() {
  return (
      <Card>
      <CardHeader>
        <CardTitle>Task Scheduler</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar className='h-full w-full'></Calendar>
      </CardContent>
    </Card>
  )
}

export default TaskSchedulerPage