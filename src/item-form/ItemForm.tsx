import * as React from 'react';
import { ItemTypeIndex, D3Api } from '../api/blizzardApi';
import Select from 'react-select';

import './item-form.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  itemTypeIndex: ItemTypeIndex;
  onItemSelected: (value: string) => void;
}

export const ItemForm: React.FC<Props> = (props: Props) => {
  const [selectedType, setSelectedType] = React.useState<Option | null>(null);
  const [itemTypes, setItemTypes] = React.useState<Option[]>([]);
  const [items, setItems] = React.useState<Option[]>([]);

  React.useEffect(() => {
    const typeOptions = props.itemTypeIndex.map((type) => {
      let id = type.id.replace('_', '');
      id = id.replace(/([A-Z0-9])/g, ' $1');

      return { label: id, value: type.path }
    });

    setItemTypes(typeOptions);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTypeChange = async (selectedOption: any): Promise<void> => {
    setSelectedType(selectedOption);

    const itemType = await D3Api.fetchItemType(selectedOption.value);
    const itemOptions = itemType.map((item) => ({ label: item.name, value: `${item.slug}-${item.id}` }));
    setItems(itemOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItemSelected = (selectedOption: any): void => {
    props.onItemSelected(selectedOption.value);
  }

  return (
    <div className="item-form">
      <label>Item type</label>
      <Select
        value={selectedType}
        onChange={handleTypeChange}
        options={itemTypes}
      />
      <br />
      {(items && items.length > 0) &&
        <>
          <label>Item name</label>
          <Select
            onChange={handleItemSelected}
            options={items}
          />
        </>
      }
    </div>
  );
}
