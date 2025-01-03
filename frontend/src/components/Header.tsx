import { useEffect, useState } from "react";
import { getConfig, appConfig } from "../functions/api";
import ConfigDropdown from "./ConfigDropdown";
import TypesDropdown from "./TypesDropdown";

function Header() {

  const [themePath, setThemePath] = useState('');
  const [iconsPath, setIconsPath] = useState('');
  const [updHead, setUpdHead] = useState<boolean>(false);

  useEffect(() => {

    const fetchData = async () => {
    
      await getConfig();

      if (appConfig.NodePath == '') {
        setThemePath("https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+appConfig.Theme+"/bootstrap.min.css");
        setIconsPath("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
      } else {
        setThemePath(appConfig.NodePath+"/node_modules/bootswatch/dist/"+appConfig.Theme+"/bootstrap.min.css");
        setIconsPath(appConfig.NodePath+"/node_modules/bootstrap-icons/font/bootstrap-icons.css");
      }

      document.documentElement.setAttribute("data-bs-theme", appConfig.Color);
    };
    
    fetchData();
    setUpdHead(false);
  }, [updHead]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <link rel="stylesheet" href={iconsPath}></link> {/* icons */}
      <link rel="stylesheet" href={themePath}></link> {/* theme */}
      <div className="container-lg">
        <div className='d-flex justify-content-between mt-2'>
          <h3 className="shade-hover rounded-3" onClick={handleReload}>AnyAppStart</h3>
          <div className='d-flex justify-content-between'>
            <TypesDropdown></TypesDropdown>
            <span className="p-3"></span>
            <ConfigDropdown headUpd={setUpdHead}></ConfigDropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
