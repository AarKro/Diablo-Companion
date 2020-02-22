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
  removeItem: (id: string) => void;
}

export const ItemRow = SortableElement((props: Props) => {
  const removeItem = (): void => {
    props.removeItem(props.item.id);
  }

  return (
    <div className="row" style={{ backgroundColor: itemColors[props.item.color] }}>
      <img src={`http://media.blizzard.com/d3/icons/items/small/${props.item.icon}.png`} alt="Item image" />
      <label>{props.item.name}</label>
      <div onClick={removeItem}>&times;</div>
    </div>
  );
});
