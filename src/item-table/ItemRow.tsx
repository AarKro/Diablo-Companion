import * as React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { ListItem } from '../App';

const itemColors = {
  'white': '#e0e0e0',
  'blue': '#3333ff',
  'yellow': '#e6e600',
  'orange': '#e67300',
  'green': '#009a00',
}

interface Props {
  item: ListItem;
  active: boolean;
  removeItem: (id: string) => void;
  setActive: (id: string) => void;
}

export const ItemRow = SortableElement((props: Props) => {
  const removeItem = (): void => {
    props.removeItem(props.item.id);
  }

  const toggleActive = (): void => {
    props.setActive(props.item.id);
  }

  return (
    <div className="row" onClick={toggleActive} style={{ border: `thick solid ${itemColors[props.item.color]}` }}>
      <div>
        <img src={`http://media.blizzard.com/d3/icons/items/small/${props.item.icon}.png`} alt="Item image" />
        <label>{props.item.name}</label>
        <div onClick={removeItem}>&times;</div>
      </div>
      {props.active &&
        <div>
          <div className="flavor">{props.item.flavorText}</div>
        </div>
      }
    </div>
  );
});
