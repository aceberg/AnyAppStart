import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import "bootstrap/js/dist/dropdown";
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import { useEffect } from "react";
import { startUpdateCycle } from "./functions/updstate";
import ItemPage from './components/ItemPage';

function App() {

  useEffect(() => {
    startUpdateCycle();
  }, []);

  return (
    <div className="container-lg mb-2">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
