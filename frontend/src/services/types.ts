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
  statusEffects?: StatusEffect[];

}
export interface Card {
  id: string;
  name: string;
  description: string;
  complexity: number;
  associations: string[];
  effect?: string;
}

export interface Enemy {
  id: number;
  name: string;
  inventory: Inventory;
  health: number;
  maxHealth: number;
  baseDamage: number;
  equippedWeaponId?: string;
  statusEffects?: StatusEffect[];
  imageUrl?: string;
  intent?: string; // what they're planning to do next
}

export interface StatusEffect {
  id: string;
  name: string;
  duration: number;
  type: 'buff' | 'debuff';
}