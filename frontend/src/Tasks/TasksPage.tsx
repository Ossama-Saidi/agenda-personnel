import { useEffect, useState } from "react"
import EditTaskModal from "../components/EditTaskModal"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Pencil, Trash2, Plus } from "lucide-react"
import {
  getTasks,
  createTask,
  deleteTask as deleteTaskAPI,
  updateTask,
  type Task,
} from "../services/taskService"
import TasksCarousel from "../components/TasksCarousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"
import React from "react"
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const loadTasks = async (status?: string) => {
    const fetched = await getTasks(status)
    setTasks(fetched)
  }

  useEffect(() => {
    const status = filter === "all" ? undefined : filter
    loadTasks(status)
  }, [filter])

  const addTask = async () => {
    if (!newTaskTitle.trim()) return
    await createTask({ title: newTaskTitle, status: "todo" })
    toast.success("Task created successfully")
    setNewTaskTitle("")
    loadTasks(filter === "all" ? undefined : filter)
  }

  const deleteTask = async (id: number) => {
    await deleteTaskAPI(id)
    toast.success("Task deleted successfully")
    loadTasks(filter === "all" ? undefined : filter)
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Select onValueChange={setFilter} value={filter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="New task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <Button onClick={addTask}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <Carousel className="w-full">
  <CarouselContent>
    {tasks.map((task) => (
      <CarouselItem key={task.id} className="md:basis-1/3 lg:basis-1/3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">{task.title}</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditTask(task)
                  setShowEditModal(true)
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
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
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
      {tasks.length === 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>No tasks found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You can add a new task using the input above.
            </p>
          </CardContent>
        </Card>
      )}
      <EditTaskModal
        open={showEditModal}
        task={editTask}
        onClose={() => {
          setShowEditModal(false)
          setEditTask(null)
        }}
        onSave={async (updated) => {
          if (editTask) {
            await updateTask(editTask.id, updated)
            toast.success("Task updated successfully")
            setShowEditModal(false)
            setEditTask(null)
            loadTasks(filter === "all" ? undefined : filter)
          }
        }}
      />
    </main>
  )
}