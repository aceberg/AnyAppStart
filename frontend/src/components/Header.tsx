import { useEffect, useState } from "react";
import { getConfig, appConfig } from "../functions/api";
import Config from "./Config";

function Header() {

  const [path, setPath] = useState("");

  useEffect(() => {

    const fetchData = async () => {
    
      await getConfig();

      setPath("https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+appConfig.Theme+"/bootstrap.min.css");
    };
    
    fetchData();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"></link> {/* icons */}
      <link href={path} rel="stylesheet"></link> {/* bootstrap+themes */}
      <div className="container-lg">
        <div className='d-flex justify-content-between'>
          <h3 className="mt-2">QuickStart</h3>
          <div className='d-flex justify-content-between'>
            <i className="bi bi-inboxes shade-hover fs-3 text-primary me-2" title="Types"></i>
            <Config></Config>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
