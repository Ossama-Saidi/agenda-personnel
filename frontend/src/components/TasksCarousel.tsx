import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import type { Task } from "../services/taskService"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import React from "react"

type Props = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TasksCarousel({ tasks, onEdit, onDelete }: Props) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 16,
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      {tasks.map((task) => (
        <Card key={task.id} className="keen-slider__slide">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">{task.title}</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Status:{" "}
            <span
              className={`${
                task.status === "done"
                  ? "text-green-600"
                  : task.status === "in-progress"
                  ? "text-yellow-600"
                  : "text-gray-600"
              } font-medium`}
            >
              {task.status}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}