import { useEffect, useState } from "react";
import type { Card as CardType} from "../services/types";
import {fetchRandomRemedy, fetchRandomHack, getErrorMessage, isCounter} from "../services/helperFunctions.ts";
import Hand from "./Hand.tsx";
import PixelHacker from "./PixelHacker.tsx";
import PixelPlayer from "./PixelPlayer.tsx";

export default function Battlefield() {
  const [remedyCards, setRemedyCards] = useState<CardType[]>();
  const [hackCards, setHackCards] = useState<CardType[]>();
  const [currentHack, setCurrentHack] = useState<CardType | null>(null);
  const [currentRemedy, setCurrentRemedy] = useState<CardType | null>(null);

  useEffect(() => {
    document.body.classList.add('combat-bg-page');
    (async () => {
      try {
        setRemedyCards(await fetchRandomRemedy());
        setHackCards(await fetchRandomHack());
      }
      catch (e) {
        getErrorMessage(e);
      }
    })();

    return () => {
      document.body.classList.remove('combat-bg-page');
    };
  }, []);

    useEffect(() => {
        if (hackCards) {
            setCurrentHack(hackCards[0]);
        }
    }, [hackCards]);

  const handleCardClick = async (card: CardType) => {
    console.log("Played card:", card + "\n Against: ", currentHack);
    setCurrentRemedy(card);
    if (currentHack && currentRemedy) {
      if (await isCounter(currentHack.id, currentRemedy.id)) {
          console.log("Player counters " + currentHack.id + " with " + currentRemedy.id);
          //attack logic
      }
      else {
          console.log("Player's counter fails " + currentHack.id + " with " + currentRemedy.id);
          //enemy attack results in player damage
      }
    }
  };

  return (
    <div className="grid grid-cols-[auto_300px_auto] p-16 items-center w-full h-screen">
      <div className="col-span-1 flex gap-2 items-end justify-center">
        <Hand cards={remedyCards} onCardClick={handleCardClick} />
      </div>
      <div className="col-span-2 mr-24 w-auto h-full bg-gray-700 rounded-full shadow-lg shadow-gray-500/100 animate-title-pulse">
          <div className="mt-36 flex items-center justify-center">
              <PixelHacker/>
              <PixelHacker/>
          </div>
      </div>
      <div className="">CENTER LEFT</div>
      <div className="">CENTER CENTER</div>
      <div className="">CENTER RIGHT</div>
      <div className="ml-24 w-auto h-full bg-gray-700 rounded-full shadow-lg shadow-gray-500/100 animate-title-pulse">
          <div className="mt-36 gap-16 flex items-center justify-center">
              <PixelPlayer/>
          </div>
      </div>
      <div className="col-span-2 flex gap-2 items-end justify-center">
        <Hand cards={hackCards} onCardClick={handleCardClick} />
      </div>
    </div>
  );
}
