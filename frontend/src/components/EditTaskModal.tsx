import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"
import { useState, useEffect } from "react"
import type { Task } from "../services/taskService"
import React from "react"

type Props = {
  open: boolean
  task: Task | null
  onClose: () => void
  onSave: (updated: { title: string; status: Task["status"] }) => void
}

export default function EditTaskModal({ open, task, onClose, onSave }: Props) {
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState<Task["status"]>("todo")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setStatus(task.status)
    }
  }, [task])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <Select value={status} onValueChange={(val: any) => setStatus(val as Task["status"])}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            onClick={() => onSave({ title, status })}
            disabled={!title.trim()}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}