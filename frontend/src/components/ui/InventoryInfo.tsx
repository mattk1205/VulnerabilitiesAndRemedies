import type { ItemView, PlayerProfile } from "../../services/types.ts";
import {
  consumeItem,
  removeItem,
  returnItemType,
  equipWeapon, getErrorMessage,
} from "../../services/helperFunctions.ts";
import { useState } from "react";

function InventoryTooltip({ item, show }: { item: ItemView; show: boolean }) {
  if (!show) return null;
  return (
    <div
      className="absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{
        background: "rgba(0,0,0,0.9)",
        border: "1px solid rgba(0,255,157,0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="text-center">
        <div className="text-gray-300">{item.description}</div>
        <div className="text-gray-300">
          {item.name}: x{item.quantity}
        </div>
        {item.isKnown && (
          <div className="mt-1 text-amber-500">Unknown item type</div>
        )}
      </div>
      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black" />
    </div>
  );
}

export default function InventoryInfo({
  profile,
  expand = false,
  refetch,
}: {
  profile: PlayerProfile;
  expand?: boolean;
  refetch: () => Promise<void>;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  if (profile?.inventory?.totalUnits && profile?.inventory?.totalUnits <= 0) {
    return <p className="mt-4 text-slate-400">No items in inventory.</p>;
  }

  if (!expand) {
    return (
        <ul className="mt-4 space-y-2">
          {profile.inventory?.items.map((item: ItemView) => (
              <li
                  key={item.id}
                  className="flex justify-between rounded-md bg-black/20 p-2 px-3"
              >
                <span>{item.name}</span>
                <span className="font-mono text-slate-400">x{item.quantity}</span>
              </li>
          ))}
        </ul>
    );
  }

  //no weapon, item is weapon, => E R
  // yes weapon, item is weapon => R
  // health not full, item is potion => U R
  // health is full, item is potion => R
  return (
      <ul className="mt-4 space-y-2">
        {profile.inventory?.items.map((item: ItemView) => (
            <li
                key={item.id}
                className="flex items-center p-2 rounded-md bg-black/20"
            >
        <span
            onMouseEnter={() => setHoverId(item.id)}
            onMouseLeave={() => setHoverId(null)}
            className="flex-1 text-left px-2"
        >
          {item.name}
        </span>
              <span className="flex-1/3 text-center font-mono text-slate-400">
          x{item.quantity}
        </span>
              <span className="flex justify-end">
          {(() => {
            const itemType = returnItemType(item.id);
            const noWeapon = profile.weapon?.id == "wp_bare_hands";
            const healthNotFull = profile.player?.health !== profile.player?.maxHealth;

            // No weapon, item is weapon => EQUIP
            if (noWeapon && itemType === "weapon") {
              return (
                  <button
                      className="w-22"
                      onClick={async () => {
                        try {
                          await equipWeapon(item.id);
                          await refetch();
                        } catch (e: unknown) {
                          getErrorMessage(e);
                        }
                      }}
                  >
                    EQUIP
                  </button>

              );
            }

            // Health not full, item is potion => USE
            if (healthNotFull && itemType === "potion") {
              return (
                  <button
                      className="w-22"
                      onClick={async () => {
                        try {
                          await consumeItem(item.id);
                          await refetch();
                        } catch (e: unknown) {
                          getErrorMessage(e);
                        }
                      }}
                  >
                    USE
                  </button>
              );
            }

             return <span className="w-22"></span>;
          })()}

                <button
                    onClick={async () => {
                      try {
                        await removeItem(item.id);
                        await refetch();
                      } catch (e: unknown) {
                        getErrorMessage(e);
                      }
                    }}
                    className="mx-4"
                >
            REMOVE
          </button>
        </span>

              <div className="absolute left-1/2 place-self-end">
                <InventoryTooltip item={item} show={hoverId === item.id}/>
              </div>
            </li>
        ))}
      </ul>
  );
}