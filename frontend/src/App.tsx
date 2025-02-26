import "bootstrap/js/dist/dropdown";
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import { useEffect } from "react";
import { updAllItems } from "./functions/updstate";
import { getItems } from "./functions/api";
import mobxStore from "./functions/store";

function App() {

  const fetchData = async () => {
  
    const items = await getItems();
    mobxStore.setItemList(items);
    mobxStore.setUpdBody(true);
  }

  useEffect(() => {
    fetchData();

    setTimeout(() => {
      updAllItems();
    }, 1000);

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
