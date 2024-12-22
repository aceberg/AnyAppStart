import { useEffect, useState } from "react";
import { getConfig, appConfig } from "../functions/api";
import ConfigDropdown from "./ConfigDropdown";
import TypesDropdown from "./TypesDropdown";

function Header() {

  const [path, setPath] = useState("");
  const [updHead, setUpdHead] = useState<boolean>(false);

  useEffect(() => {

    const fetchData = async () => {
    
      await getConfig();

      setPath("https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+appConfig.Theme+"/bootstrap.min.css");

      document.documentElement.setAttribute("data-bs-theme", appConfig.Color);
    };
    
    fetchData();
    setUpdHead(false);
  }, [updHead]);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"></link> {/* icons */}
      <link href={path} rel="stylesheet"></link> {/* bootstrap+themes */}
      <div className="container-lg">
        <div className='d-flex justify-content-between mt-2'>
          <h3 className="mt-2">QuickStart</h3>
          <div className='d-flex justify-content-between'>
            <TypesDropdown></TypesDropdown>
            <ConfigDropdown headUpd={setUpdHead}></ConfigDropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
