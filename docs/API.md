## API
```http
GET /api/conf
```
Get app config


```http
GET /api/exec?name=NAME&type=TYPE&exec=EXEC
```
Execute a command, where
- `NAME` - Item name
- `TYPE` - Item Type
- `EXEC` - one of the commands: Start, Stop, Restart, Logs, State

Returns:
- `Ok` - `true` or, if error occurred `false`
- `Out` - command output

<details>
  <summary>Example</summary>

```sh
curl "http://0.0.0.0:8855/api/exec?name=wyl&type=Docker&exec=Start"
```   
```json
{
    "Ok": true,
    "Out": "wyl\n"
}⏎ 
```

</details>   
<br>

```http
GET /api/items
```
Get all Items with their current states

```http
GET /api/types
```
Get all Types

```http
POST /api/conf
```
Save config variable `conf`. Example: `data.set('conf', JSON.stringify(conf))`
```http
POST /api/item
```
Edit Item. Variables:
- `old` - old Item
- `new` - new Item (empty Name to delete Item)
```http
POST /api/type
```
Edit Type. Variables:
- `old` - old Type
- `new` - new Type (empty Name to delete Type)