import * as React from 'react';
import { ItemList } from './item-table/ItemList';
import { AuthForm } from './auth-form/AuthForm';
import { D3Api, ItemTypeIndex, Item } from './api/blizzardApi';
import { ItemForm } from './item-form/ItemForm';
import { authenticate } from './auth-form/AuthForm';
import arrayMove from 'array-move';

import './app.scss';

export interface ListItem extends Item {
  selected: boolean;
}

const fetchItemTypeIndex = async (setter: (value: ItemTypeIndex) => void): Promise<void> => {
  const itemTypeIndex = await D3Api.fetchItemTypeIndex();
  setter(itemTypeIndex);
}

const loadFromLocalStorage = async (setter: (value: ItemTypeIndex) => void): Promise<void> => {
  await authenticate();
  fetchItemTypeIndex(setter);
}

export const App: React.FC = () => {
  const [items, setItems] = React.useState<ListItem[]>([]);
  const [itemTypeIndex, setItemTypeIndex] = React.useState<ItemTypeIndex | null>(null);

  React.useEffect(() => {
    if (localStorage.getItem('clientId') && localStorage.getItem('clientSecret')) {
      loadFromLocalStorage(setItemTypeIndex);
    }

    const possibleItems = localStorage.getItem('items');
    if (possibleItems) {
      setItems(JSON.parse(possibleItems));
    }
  }, []);

  const fetchItemTypeIndexFromAuthForm = (): void => {
    fetchItemTypeIndex(setItemTypeIndex);
  }

  const removeItem = (id: string): void => {
    const newItems = items.filter((item) => item.id !== id);
    localStorage.setItem('items', JSON.stringify(newItems));
    setItems(newItems);
  }

  const reorderItems = (reorderProps: { oldIndex: number; newIndex: number }): void => {
    const reorderedItems = arrayMove(items, reorderProps.oldIndex, reorderProps.newIndex)
    localStorage.setItem('items', JSON.stringify(reorderedItems));
    setItems(reorderedItems);
  }

  const handleItemSelected = async (itemSlugAndId: string): Promise<void> => {
    if (!items.some((item) => itemSlugAndId.endsWith(item.id))) {
      const item = await D3Api.fetchItem(itemSlugAndId);

      const listItem = {
        id: itemSlugAndId,
        name: item.name,
        selected: false,
        color: item.color,
        icon: item.icon,
        slug: item.slug
      }

      const newItems = [...items, listItem];

      localStorage.setItem('items', JSON.stringify(newItems));
      setItems(newItems);
    }
  }

  return (
    <section className="app">
      {!itemTypeIndex && <AuthForm fetchData={fetchItemTypeIndexFromAuthForm} />}
      {itemTypeIndex && <ItemForm itemTypeIndex={itemTypeIndex} onItemSelected={handleItemSelected} />}
      <br />
      <ItemList
        items={items}
        removeItem={removeItem}
        lockAxis="y"
        pressDelay={200}
        helperClass="sort-active"
        onSortEnd={reorderItems}
        useWindowAsScrollContainer
      />
    </section>
  )
};
