import { apiFetch } from "../lib/apiClient"

export type Task = {
  id: number
  title: string
  date?: string
  status: "todo" | "in-progress" | "done"
}

export const getTasks = async (status?: string): Promise<Task[]> => {
  const query = status ? `?status=${status}` : ""
  return await apiFetch(`/tasks${query}`)
}

export const createTask = async (task: Omit<Task, "id">) => {
  return await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  })
}

export const updateTask = async (id: number, task: Partial<Task>) => {
  return await apiFetch(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  })
}

export const deleteTask = async (id: number) => {
  return await apiFetch(`/tasks/${id}`, {
    method: "DELETE",
  })
}