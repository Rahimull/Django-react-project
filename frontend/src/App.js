import { Routes, Route } from "react-router-dom";
import Home from "./component/pages/home/Home"
import Books from "../src/component/pages/book/Book";
import Dashboard from "./component/pages/dashboard/Dashboard";
import DashboardLayout from "./component/layout/DashboardhLayout/DashboardLayout";
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={ <DashboardLayout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="books" element={<Books />} />   {/* http://localhost:3000/about */}
      </Routes>
    </div>
  );
}


export default App;


// export default App;

