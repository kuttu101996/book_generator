import "./App.css";
import "./styles.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className={`min-h-screen flex`}>
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;
