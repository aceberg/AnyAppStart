import "bootstrap/js/dist/dropdown";
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import { useEffect } from "react";
import { startUpdateCycle } from "./functions/updstate";

function App() {

  useEffect(() => {
    startUpdateCycle();
  }, []);

  return (
    <div className="container-lg mb-2">
      <Header></Header>
      <Body></Body>
    </div>
  )
}

export default App
