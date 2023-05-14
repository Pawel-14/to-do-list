import "./App.css";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
export default function App() {
  return (
    <div className="main">
      <TaskList />
      <Footer />
    </div>
  );
}
