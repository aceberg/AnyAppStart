import TypeEdit from "./TypeEdit";
import mobxStore from "../../functions/store";
import { observer } from "mobx-react-lite";

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
