export interface PlayerProfile {
  player: Player | null;
  inventory: InventoryView | null;
  weapon: Weapon | null;
}

export interface Level {
  number: number;
  description: string;
  available: boolean;
  enemies: {
    [enemyName: string]: number;
  };
  type: string;
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  damage: number;
  critChance: number;
  durability: number;
}

export type ItemId = string;
export interface Inventory {
  capacity: number;
  items: Record<ItemId, number>;
}

export interface InventoryView {
  capacity: number;
  totalUnits: number;
  spaceLeft: number;
  items: Array<ItemView>;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  meta?: Record<string, string | number>;
}

export interface ItemView {
  id: string;
  name: string;
  description: string;
  quantity: number;
  isKnown: boolean;
}

export interface Player {
  id: number;
  name: string;
  inventory: Inventory;
  health: number;
  maxHealth: number;
  baseDamage: number;
  equippedWeaponId?: string;
}
