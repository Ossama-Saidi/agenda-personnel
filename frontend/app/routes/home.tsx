import type { Route } from "./+types/home";
import TasksPage from "../Tasks/TasksPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Agenda Personnel" },
    { name: "description", content: "Welcome to React App!" },
  ];
}

export default function Home() {
  return <TasksPage />;
}
