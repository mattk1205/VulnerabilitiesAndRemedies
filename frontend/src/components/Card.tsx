import { type Card as CardType } from '../services/types.ts';

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
}

export default function Card ({ card, onClick } : CardProps) {
  return (
    <div
      onClick={() => onClick?.(card)}
      className="w-48 h-64 bg-white rounded-lg shadow-lg
                 hover:-translate-y-4 hover:scale-105
                 transition-all duration-200 cursor-pointer
                 border-2 border-gray-300 p-2 flex flex-col"
    >
      <div className="text-xs font-bold truncate border border-red-500 text-black">
        {card.name || 'NO NAME'}
      </div>

      <div className="text-xs text-gray-600 my-1 border border-green-500">
        Complexity: {card.complexity}
      </div>

      <div className="text-xs text-blue-500 flex-1 overflow-hidden border border-blue-500">
        {card.description || 'NO DESCRIPTION'}
      </div>

      <div className="text-xs mt-auto text-purple-500 font-semibold border border-purple-500">
        {card.effect || 'NO EFFECT'}
      </div>
    </div>
  );
};