import { useAppStore } from "../../../../app";
import { isFilter } from "../../../../shared";
import type { ColumnFilterItem } from 'antd/lib/table/interface';

type FilterDropdownProps = {
  prefixCls: string;
  filters: ColumnFilterItem[];
  confirm: () => void;
}

export function FilterDropdown({prefixCls, filters, confirm}: FilterDropdownProps) {
  const {tasks, setFilter} = useAppStore.getState();

  return (
    <ul className={`${prefixCls}`} style={{listStyle: "none", margin: 0, padding: '8px', maxWidth: "max-content"}} role="menu">
      {
        filters.map((item) => {
          const text = item.text;
          const filter = item.value.toString() || '';
          const onChange = () => {
            if (!isFilter(filter) || !text ) return;

            setFilter(filter);
            confirm();
          };

          return (
            <li key={`ant-dropdown-item-${filter}`}>
              <label style={{display: 'flex', alignItems: "center"}}>
                <input 
                  style={{margin: '0 5px 0 0'}}
                  type='radio'
                  name={'filter'}
                  defaultChecked={filter === tasks.filter}
                  onChange={onChange}
                />
                <span>{text}</span>
              </label>
            </li>
          )
        })
      }
    </ul>
  )
}