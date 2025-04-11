import { applyFilters } from "../../functions/sort_filter";
import mobxStore from "../../functions/store";

function BodyGroupFilter() {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    
    mobxStore.setFilterGroup(selectedValue);
    applyFilters();
  }

  return (
    <>
      <select className="gr-filter" defaultValue="Groups" onChange={handleChange}>
        <option value="Groups" disabled>Group</option>
        <option value="" title="All Groups">...</option>
        {mobxStore.grList?.map((key: string) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
    </>
  )
}

export default BodyGroupFilter
