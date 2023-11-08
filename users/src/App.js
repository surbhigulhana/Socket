import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Category from "./Component/AdminDashboard/Category";
import AddCategory from "./Component/AdminDashboard/AddCategory";
import Home from "./Component/AdminDashboard/Home";



function App() {
  return (
    <div>
      <Router>
        <Routes>
       
          <Route exact path="/" element={<Home />}></Route>
          
          <Route exact path="/Product" element={<Category/>}></Route>
          <Route exact path="/AddProduct" element={<AddCategory />}></Route>
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
