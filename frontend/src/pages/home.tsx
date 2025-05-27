import React from "react";
import { Helmet } from "react-helmet";
import TasksPage from "../Tasks/TasksPage";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Agenda Personnel</title>
        <meta name="description" content="Welcome to React App!" />
      </Helmet>
      <TasksPage />
    </>
  );
}