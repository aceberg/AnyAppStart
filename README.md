<h1><a href="https://github.com/aceberg/AnyAppStart">
    <img src="https://raw.githubusercontent.com/aceberg/AnyAppStart/main/assets/logo.png" width="20" />
</a>AnyAppStart</h1>
<br/>

Universal app to `Start`/`Stop`/`Restart`/`View Logs` for any Type of service (Docker, Systemd, VMs, remote, user scripts)

- Backend: `Go`, Frontend: `React`, `TypeScript`, `MobX`
- Small lightweight app, easy to set up and configure
- User can create own types (like LXC or WakeOnLAN)

![Screenshot](https://raw.githubusercontent.com/aceberg/AnyAppStart/refs/heads/main/assets/Screenshot_05.png)

## More screenshots
<details>
  <summary>Expand</summary>

![Screenshot](https://raw.githubusercontent.com/aceberg/AnyAppStart/refs/heads/main/assets/Screenshot_02.png)
![Screenshot](https://raw.githubusercontent.com/aceberg/AnyAppStart/refs/heads/main/assets/Screenshot_03.png)
![Screenshot](https://raw.githubusercontent.com/aceberg/AnyAppStart/refs/heads/main/assets/Screenshot_04.png)

</details>

## Install
<details>
  <summary>Expand</summary>

> :warning:  **Warning**   
> 1. There is Docker image available, but inside the container only Docker Type will work, which kinda defeats the purpose of this app. So installing binary is recommended. 
> 2. There is no built-in auth in this app, so make sure to restrict access to it with firewall and/or SSO (Authelia) or simple [ForAuth](https://github.com/aceberg/ForAuth)

### Binary
All binary packages can be found in [latest](https://github.com/aceberg/AnyAppStart/releases/latest) release. There are `.deb`, `.rpm`, `.apk` (Alpine Linux) and `.tar.gz` files.   

Supported architectures: `amd64`, `i386`, `arm_v5`, `arm_v6`, `arm_v7`, `arm64`.   

For `amd64` there is a `deb` repo [available](https://github.com/aceberg/ppa)

### Docker
For demo purpose, mostly.
```sh
docker run --name AnyAppStart \
  -e "TZ=$YOURTIMEZONE" \
  -v ~/.dockerdata/AnyAppStart:/data/AnyAppStart \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 8855:8855 \
aceberg/anyappstart
```

</details>

## Config
<details>
  <summary>Expand</summary>

| Variable  | Description | Default |
| --------  | ----------- | ------- |
| TZ | Set your timezone for correct time | |
| HOST | Listen address | 0.0.0.0 |
| PORT   | Port for web GUI | 8855 |
| THEME | Any theme name from https://bootswatch.com in lowcase or [additional](https://github.com/aceberg/aceberg-bootswatch-fork) | minty |
| COLOR | Background color: light or dark | dark |
| NODEPATH | Path to local node modules |  |
</details>

## Options
<details>
  <summary>Expand</summary>

| Key  | Description | Default | Systemd (root) | Systemd (user) |
| --------  | ----------- | ------- | ------- | ------- | 
| -d | Path to config dir | /data/AnyAppStart | /etc/AnyAppStart | ~/.config/AnyAppStart |
| -n | Path to node modules |  | | |

</details>

## Thanks
<details>
  <summary>Expand</summary>

- All go packages listed in [dependencies](https://github.com/aceberg/DiaryMD/network/dependencies)
- Favicon and logo: [Flaticon](https://www.flaticon.com)
- [Bootstrap](https://getbootstrap.com/)

</details>