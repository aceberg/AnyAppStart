import { useState } from "react";

import { apiSaveItem } from "../../functions/api";
import mobxStore from "../../functions/store";
import { emptyItem, Item } from "../../functions/exports";
import { prepareAllData, updAllItems } from "../../functions/updstate";

function EditItemForm(_props: any) {

  const [formData, setFormData] = useState<Item>(_props.item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const handleSelectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      Type: event.target.value,
    }));
  };

  const handleSave = async () => {
    await saveChanges(formData);
    _props.onSave();
  }
  
  const handleDel = async () => {
    await saveChanges(emptyItem);
    _props.onDelete();
  }

  const saveChanges = async (data: Item) => {
    await apiSaveItem(_props.item, data);
    prepareAllData();
    setTimeout(() => {
      updAllItems();
    }, 1000);
  }

  return (
    <>
          <form autoComplete="on" onSubmit={e => e.preventDefault()}>
            <label htmlFor="gid" className="form-label text-primary">Group</label>
            <input className="form-control mb-3" defaultValue={_props.item.Group} id="gid" name="Group" type="text" onChange={handleChange} placeholder="Not empty string"></input>
            <label htmlFor="nid" className="form-label text-primary">Name</label>
            <input className="form-control mb-3" defaultValue={_props.item.Name} id="nid" name="Name" type="text" onChange={handleChange} placeholder="Not empty string"></input>
            <label htmlFor="tid" className="form-label text-primary">Type</label>
            <select className="form-select mb-3" id="tid" onChange={handleSelectType} defaultValue={formData.Type}>
              <option value="" disabled>Select type</option>
              {mobxStore.typeList?.map((t, i) => (
                <option key={i} value={t.Name}>{t.Name}</option>
              ))}
            </select>
            <label htmlFor="iid" className="form-label text-primary">Icon</label>
            <input className="form-control mb-3" defaultValue={_props.item.Icon} id="iid" name="Icon" onChange={handleChange} placeholder="Link to Icon (optional)"></input>
            <label htmlFor="lid" className="form-label text-primary">Link</label>
            <input className="form-control mb-3" defaultValue={_props.item.Link} id="lid" name="Link" onChange={handleChange} placeholder="URL (optional)"></input>
            <hr></hr>
            <div className='d-flex justify-content-between'>
              <button className="btn btn-danger" type="button" onClick={handleDel}>Delete</button>
              <button className="btn btn-outline-primary" type="submit" onClick={handleSave}>Save</button>
            </div>
          </form>
    </>
  )
}

export default EditItemForm
