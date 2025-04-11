import { BrowserRouter, Routes, Route }  from "react-router-dom";
import { useEffect } from "react";
import { startUpdateCycle } from "./functions/updstate";
import "bootstrap/js/dist/dropdown";
import './App.css';

import Body from './pages/Body';
import Header from './pages/Header';
import ItemPage from "./pages/ItemPage";

function App() {

  useEffect(() => {
    startUpdateCycle();
  }, []);

  return (
    <div className="container-lg mb-4">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
