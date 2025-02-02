import SwipeableCard from "./swipeableCard";
const Pile = ({ label, pile, cards, onCardDropped }) => {
  return (
    <div className="relative w-64 h-96 p-4 bg-white rounded-lg shadow-lg flex flex-col justify-start items-center overflow-hidden">
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      <div className="w-full h-full flex justify-center items-start space-y-2">
        {cards.map((cardIndex, idx) => (
          <div
            key={cardIndex}
            className="relative w-full"
            style={{
              top: `${idx * 15}px`, // Stack cards with a 15px offset
            }}
          >
            <SwipeableCard
              cardIndex={cardIndex}
              onCardDropped={onCardDropped}
              pile={pile}
              gone={false}
            >
              {/* Custom styling for each card */}
            </SwipeableCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pile;
