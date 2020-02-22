export type ItemTypeIndex = ItemTypeIndexEntry[];

export interface ItemTypeIndexEntry {
  id: string;
  name: string;
  path: string;
}

export type ItemTypes = ItemType[];

export interface ItemType {
  id: string;
  slug: string;
  name: string;
  icon: string;
  path: string;
}

export interface Item {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: 'white' | 'blue' | 'yellow' | 'orange' | 'green';
}

export const D3Api = {
  async fetchItemTypeIndex(): Promise<ItemTypeIndex> {
    const result = await fetch(`https://eu.api.blizzard.com/d3/data/item-type?locale=en_US&access_token=${localStorage.token}`);
    return result.json();
  },

  async fetchItemType(itemType: string): Promise<ItemTypes> {
    const type = itemType.split('/')[1];
    const result = await fetch(`https://eu.api.blizzard.com/d3/data/item-type/${type}?locale=en_US&access_token=${localStorage.token}`);
    return result.json();
  },

  async fetchItem(itemSlugAndId: string): Promise<Item> {
    const result = await fetch(`https://eu.api.blizzard.com/d3/data/item/${itemSlugAndId}?locale=en_US&access_token=${localStorage.token}`);
    return result.json();
  }
}
