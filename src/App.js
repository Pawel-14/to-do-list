import "./App.css";
import TaskList from "./components/TaskList";
import AddNewTask from "./components/AddNewTask";
import Footer from "./components/Footer";
export default function App() {
  return (
    <div className="main">
      <TaskList />
      <AddNewTask />
      <Footer />
    </div>
  );
}
