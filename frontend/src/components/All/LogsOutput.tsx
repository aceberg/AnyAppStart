import { useEffect, useRef, useState } from "react";

import { apiExec } from "../../functions/api";

function LogsOutput(_props: any) {

  const [isLoading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<string>("");
  let interval: NodeJS.Timeout;

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const updateLogs = async () => {

    let item = _props.item;
    item.Exec = "Logs";

    const res = await apiExec(item);
    setLogs(res.Out);
    setLoading(false);
  }

  useEffect(() => {
    updateLogs();

    interval = setInterval(() => {
      console.log("Update logs for ", _props.item.Name);
      updateLogs();
    }, 5000); // 5000 ms = 5 s
    
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <>
    <div className="overflow-auto" ref={containerRef} style={{ height: _props.height }}>
      {isLoading ? <pre>Loading logs for {_props.item.Name}...</pre> : <pre>{logs}</pre>}
      
      <div className="position-absolute top-0 end-0">
        <i className="bi bi-chevron-bar-down shade-hover fs-3 opacity-50" 
          title="Scroll down logs"
          onClick={scrollToBottom}
        ></i>
      </div>
    </div>
    </>
  )
}

export default LogsOutput
