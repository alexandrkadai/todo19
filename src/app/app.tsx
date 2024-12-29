import { Route, Routes } from "react-router-dom";
import { UserPage } from "../pages/users";
import { TodoListPage } from "../pages/todo-list";

export function App() {
    return (
      <Routes>
        <Route path="/" element={<UserPage />}></Route> 
        <Route path="/:userId/tasks" element={<TodoListPage />}></Route> 
      </Routes>
    )
  }