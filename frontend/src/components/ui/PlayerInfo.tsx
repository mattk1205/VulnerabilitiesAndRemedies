import InfoBlock from "./InfoBlock.tsx";
import { Crosshair, HeartPulse } from "lucide-react";
import type { PlayerProfile } from "../../services/types.ts";
import {
  getErrorMessage, unequipWeapon
} from "../../services/helperFunctions.ts";

export default function PlayerInfo({
  profile,
  refetch,
}: {
  profile: PlayerProfile;
  refetch: () => Promise<void>;
}) {
  const weapon = profile.weapon;
  return (
    <div className="space-y-4 md:col-span-1">
      <InfoBlock
        icon={<HeartPulse className="text-rose-400" />}
        title="Health"
        className="border-rose-400/20"
      >
        <p className="text-2xl font-light">
          {profile.player?.health} /{" "}
          <span className="text-md text-slate-400">
            {profile.player?.maxHealth}
          </span>
        </p>
      </InfoBlock>

      <InfoBlock
        icon={<Crosshair className="text-indigo-400" />}
        title="Equipped"
        className="border-indigo-400/20"
      >
        {weapon && weapon?.id != "wp_bare_hands" ? (
          <div className="space-y-1">
            {weapon?.name}
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Damage</span> <span>{weapon?.damage}</span>
              </li>
              <li className="flex justify-between">
                <span>Crit. Chance</span>{" "}
                <span>{(weapon?.critChance * 100).toFixed(0)}%</span>
              </li>
              <li className="flex justify-between">
                <span>Durability</span>
                <span>
                  {weapon?.durability}/{weapon?.durability}
                </span>
              </li>
            </ul>
            <button
              className="w-auto"
              onClick={async () => {
                try {
                  //setLoading(true);
                  await unequipWeapon();
                  await refetch();
                } catch (e: unknown) {
                  getErrorMessage(e);
                }
              }}
            >
              UNEQUIP
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg text-slate-400">{weapon?.name}</p>
            <span className="text-xs text-indigo-400">
              {weapon?.description}
            </span>
          </div>
        )}
      </InfoBlock>
    </div>
  );
}
