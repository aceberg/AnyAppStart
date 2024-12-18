import { useEffect, useState } from "react";
import { getConfig, Conf } from "../functions/api";

function Header() {

  const [path, setPath] = useState("");

  useEffect(() => {

    let config: Conf = {
      Theme: "",
      Color: ""
    };

    const fetchData = async () => {
    
      config = await getConfig();

      setPath("https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+config.Theme+"/bootstrap.min.css");
    };
    
    fetchData();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"></link>
      <link href={path} rel="stylesheet"></link>
      <div className="container-lg">
        <div className='d-flex justify-content-between'>
          <h3 className="mt-2">QuickStart</h3>
          <i className="bi bi-gear shade-hover fs-3" title="Settings"></i>
        </div>
      </div>
    </>
  )
}

export default Header
