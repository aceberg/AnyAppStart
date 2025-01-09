import mobxStore from "../functions/store";

function BodyGroupFilter(_props: any) {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    
    mobxStore.setFilterGroup(selectedValue);
    mobxStore.setUpdBody(true);
  }

  return (
    <>
      <select className="gr-filter" defaultValue="Groups" onChange={handleChange}>
        <option value="Groups" disabled>Groups</option>
        <option value="" title="All Groups">...</option>
        {_props.grList?.map((key: string) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
    </>
  )
}

export default BodyGroupFilter
