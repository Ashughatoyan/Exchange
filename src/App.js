import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuySection from "./components/Pages/BuySection.js"
import About from "./components/Pages/About.js";
import { MainPage } from "./components/Pages/MainPage";
import Contact from "./components/Pages/Contact";
import SignPage from "./components/Pages/Sign";
import Dashboard from "./components/Pages/Dashboard";

export default function App(){

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="buysection" element={<BuySection/>} ></Route>
          <Route path="about" element={<About/>} ></Route>
          <Route path="contact" element={<Contact/>} ></Route> 
          <Route path="sign" element={<SignPage/>} ></Route>
          <Route path="dashboard" element={<Dashboard/>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}