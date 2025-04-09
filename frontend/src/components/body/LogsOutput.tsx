import { useEffect, useState } from "react";
import { apiExec } from "../../functions/api";

function LogsOutput(_props: any) {

  const [isLoading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<string>("");
  let interval: NodeJS.Timeout;

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
    }, 10000); // 10000 ms = 10 s
    
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="overflow-auto" style={{ height: _props.height }}>
      {isLoading ? <pre>Loading logs for {_props.item.Name}...</pre> : <pre>{logs}</pre>}
    </div>
  )
}

export default LogsOutput
