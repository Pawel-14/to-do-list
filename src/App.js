import "./App.css";
import AddNewTask from "./AddNewTask";
import TaskList from "./TaskList";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="main">
      <TaskList />
      <AddNewTask />
      <Footer />
    </div>
  );
}
