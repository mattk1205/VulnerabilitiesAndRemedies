import Card from './Card';
import type { Card as CardType } from "../services/types";

interface HandProps {
  cards: CardType[] | undefined;
  onCardClick?: (card: CardType) => void;
}

export default function Hand({cards, onCardClick}: HandProps) {
  return (
      <div className="flex -space-x-4 justify-center">
        {cards && cards.map((card: CardType) => (
            <Card key={card.id} card={card} onClick={onCardClick} />
        ))}
      </div>
  )
}