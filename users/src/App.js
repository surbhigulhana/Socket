import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Category from "./Component/AdminDashboard/Category";
import AddCategory from "./Component/AdminDashboard/AddCategory";
import Home from "./Component/AdminDashboard/Home";
import Data1 from "./Component/Pages/Data1";
import Data2 from "./Component/Pages/Data2";



function App() {
  return (
    <div>
      <Router>
        <Routes>
       
          <Route exact path="/" element={<Home />}></Route>
          
          <Route exact path="/Product" element={<Category/>}></Route>
          <Route exact path="/AddProduct" element={<AddCategory />}></Route>
        {/* socket use */}
        <Route exact path="/Data1" element={<Data1/>}></Route>
        <Route exact path="/Data2" element={<Data2 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
