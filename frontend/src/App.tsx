import "bootstrap/js/dist/dropdown";
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import { useEffect } from "react";
import { fetchItems, updAllItems } from "./functions/updstate";

function App() {

  useEffect(() => {
    fetchItems();

    setInterval(() => {
      updAllItems();
    }, 60000); // 60000 ms = 1 minute
  }, []);

  return (
    <div className="container-lg mb-2">
      <Header></Header>
      <Body></Body>
    </div>
  )
}

export default App
