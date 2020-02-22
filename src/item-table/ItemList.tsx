import * as React from 'react';
import { ItemRow } from './ItemRow';
import { ListItem } from '../App';
import { SortableContainer } from 'react-sortable-hoc';

import './item-table.scss';

interface Props {
  items: Array<ListItem> | null;
  removeItem: (id: string) => void;
}

export const ItemList = SortableContainer((props: Props) => {
  return (
    <div className="table">
      {props.items && props.items.map((item, i) => (
        <ItemRow index={i} key={item.id} item={item} removeItem={props.removeItem} />
      ))}
    </div>
  );
});
