function Header() {

  const theme = "sand";
  const path = "https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+theme+"/bootstrap.min.css";

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"></link>
      <link href={path} rel="stylesheet"></link>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="container-lg">
          <ul className="nav navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <a className="nav-link active" href="">Config</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
