import { useEffect, useState } from "react";

import { apiExecAny } from "../../functions/api";

function UserCommandForm(_props: any) {

  const [anyCommand, setAnyCommand] = useState<string>("");
  const [logs, setLogs] = useState<string>("");
  const [result, setResult] = useState(<></>);

  const handleRun = async () => {
    setResult(<div className="text-info">Running...</div>);
    setLogs("");

    const res = await apiExecAny(_props.item, anyCommand);
    if (!res.Ok) {
      setResult(<div className="text-danger">Error</div>);
      setLogs(res.Out);
    } else {
      setResult(<div className="text-success">Success</div>);
      setLogs(res.Out);
    }
  }

  useEffect(() => {
    setLogs("");
    setResult(<></>);
    setAnyCommand(_props.item.AnyCom);
  }, []);

  return (
    <>
      <form autoComplete="on" onSubmit={e => e.preventDefault()}>
        <div className="input-group mb-4">
          <input type="text" name="any-com" className="form-control" 
            placeholder="Set default command in Types menu"
            defaultValue={anyCommand}
            onChange={(e) => setAnyCommand(e.target.value)} 
            onKeyUp={(e) => {e.key === "Enter" ? handleRun() : {}}}
            ></input>
          <button className="btn btn-outline-primary" type="submit" onClick={handleRun}>Run</button>
        </div>
      </form>
      <hr></hr>
      {result}
      <hr></hr>
      <pre>{logs}</pre>
    </>
  )
}

export default UserCommandForm
