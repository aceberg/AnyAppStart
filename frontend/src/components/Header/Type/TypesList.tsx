import { observer } from "mobx-react-lite";

import mobxStore from "../../../functions/store";

import TypeEdit from "./TypeEdit";

const TypesList: React.FC = observer(() => {

  return (
    <>
      {mobxStore.typeList?.map((t, i) => (
        <div key={i}>
          <TypeEdit typeItem={t}
            btnContent={<li><a href="#" className="dropdown-item">{t.Name}</a></li>}>
          </TypeEdit>              
        </div>
      ))}
    </>
  )
});

export default TypesList
