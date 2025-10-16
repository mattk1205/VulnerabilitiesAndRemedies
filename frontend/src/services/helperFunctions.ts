import type {
  Inventory,
  InventoryView,
  Player,
  PlayerProfile,
  Weapon,
  Card,
} from "./types.ts";

export function returnItemType(itemId: string): string {
  if (itemId != null) {
    if (itemId.includes("wp_")) return "weapon";
    if (itemId.includes("pn_")) return "potion";
  }
  return "none";
}

export const currentSize = (inv: Inventory) =>
  Object.values(inv.items).reduce((a, b) => a + b, 0);

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function removeItem(
  itemId: string,
) {
  clearCaches();
  const response = await fetch(
    `http://localhost:8080/api/inventory/items/${itemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to remove item: ${response.status}`);
  }
}

export async function consumeItem(itemId: string) {
  clearCaches();
  const response = await fetch(
    `http://localhost:8080/api/player/use/${itemId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to use item: ${response.status}`);
  }
  await removeItem(itemId);
}

export async function equipWeapon(weaponId: string) {
  clearCaches();
  const weaponResponse = await fetch(
    `http://localhost:8080/api/player/equip/${weaponId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );
  if (!weaponResponse.ok) {
    throw new Error(`HTTP error! status: ${weaponResponse.status}`);
  }
}
export async function unequipWeapon() {
  clearCaches();
  const weaponResponse = await fetch(
    `http://localhost:8080/api/player/unequip`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );
  if (!weaponResponse.ok) {
    throw new Error(`HTTP error! status: ${weaponResponse.status}`);
  }
}

export async function createPlayer(name: string) {
  clearCaches();
  const playerResponse = await fetch(
    "http://localhost:8080/api/player/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.trim() }),
    },
  );
  if (!playerResponse.ok) {
    throw new Error(`HTTP error! status: ${playerResponse.status}`);
  }
  cachedPlayer = await playerResponse.json();
}

let cachedPlayer: Player | null = null;
let equippedWeaponCache: Weapon | null = null;
let inventoryCache: InventoryView | null = null;

export async function getPlayer(): Promise<Player | null> {
  console.log("Player cache:", cachedPlayer);
  if (!cachedPlayer) {
    const playerResponse = await fetch("http://localhost:8080/api/player");
    if (!playerResponse.ok) {
      if (playerResponse.status === 404) return null; //no player found
      throw new Error(`HTTP error! status: ${playerResponse.status}`);
    }
    cachedPlayer = await playerResponse.json();
  }
  return cachedPlayer;
}

export async function getInventory(): Promise<InventoryView | null> {
  console.log("Inv cache:", inventoryCache);
  if (!inventoryCache) {
    const inventoryResponse = await fetch(
      "http://localhost:8080/api/inventory",
    );
    if (!inventoryResponse.ok) {
      if (inventoryResponse.status === 404) return null; //no inv found
      throw new Error(`HTTP error! status: ${inventoryResponse.status}`);
    }
    inventoryCache = await inventoryResponse.json();
  }
  return inventoryCache;
}

export async function getEquippedWeapon(): Promise<Weapon | null> {
  console.log("Weapon cache", equippedWeaponCache);
  if (!equippedWeaponCache) {
    const weaponResponse = await fetch(
      "http://localhost:8080/api/player/weapon",
    );
    if (!weaponResponse.ok) {
      if (weaponResponse.status === 404) return null;
      throw new Error(`HTTP error! status: ${weaponResponse.status}`);
    }
    equippedWeaponCache = await weaponResponse.json();
  }
  return equippedWeaponCache;
}

let profileCache: PlayerProfile | null = null;
export async function getProfile(
  { startMenu }: { startMenu?: boolean } = { startMenu: false },
): Promise<PlayerProfile | null> {
  if (!profileCache) {
    const profileResponse = await fetch(
      "http://localhost:8080/api/player/profile",
    );
    if (!profileResponse.ok && !startMenu) {
      if (profileResponse.status === 404) return null;
      throw new Error(`HTTP error! status: ${profileResponse.status}`);
    }
    const res = await profileResponse.json();
    console.log(res);
    profileCache = {
      player: res.player,
      weapon: res.weaponView,
      inventory: res.inventoryView,
    };
    console.log(profileCache);
  }
  return profileCache;
}

export function clearCaches() {
  cachedPlayer = null;
  equippedWeaponCache = null;
  inventoryCache = null;
  profileCache = null;
}

export async function initializeCards() {
  const response = await fetch(
    `http://localhost:8080/api/cards/initialize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to use item: ${response.status}`);
  }
  return await response.json();
}

export async function fetchRandomRemedy() : Promise<Card[]> {
  const response = await fetch(
    `http://localhost:8080/api/cards/random/remediation`);
  if (!response.ok) {
    throw new Error(`Failed to use item: ${response.status}`);
  }
  const res = await response.json();
  //console.log(JSON.stringify(res, null, 2));
  return res;
}

export async function fetchRandomHack() : Promise<Card[]> {
  const response = await fetch(
    `http://localhost:8080/api/cards/random/hack`);
  if (!response.ok) {
    throw new Error(`Failed to use item: ${response.status}`);
  }
  const res = await response.json();
  //console.log(JSON.stringify(res, null, 2));
  return res;
}

export async function isCounter(hackId: string, remedyId: string) : Promise<boolean> {
  const response = await fetch(
      `http://localhost:8080/api/cards//can-counter/${hackId}/${remedyId}`,
  )
  if (!response.ok) {
    throw new Error(`Failed get response on can-counter: ${response.status}`);
  }
  const res = await response.json();
  return res;
}