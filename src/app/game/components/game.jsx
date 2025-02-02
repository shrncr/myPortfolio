import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import LaunchIcon from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';
import Pile from "./pile";
import SwipeableCard from "./swipeableCard";

// Game Component
const Game = () => {
  const [cards, setCards] = useState([
    { title: "CritterChat", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "PinTheBay", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "NightlyReel", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Sudoku Solver", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Program Profiler", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Sephora Chrome Extension", desc: "la la la", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "The ButcherShop", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Linked List Sorter", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Cache MME Emulator", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Ziv Encoder", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "TREES!", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Pattern Matching", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Glazer Children's Museum", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Process Tracing", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Semaphores!", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Simon Game", desc: "I will put a desc soon", source: "https://github.com/", isDeployed: false, deployedLink: "https://www.nightlyreel.com/" },
    { title: "Fancy Calculator (With Infix and Postfix)", desc: "Meow meow emow meowmewoemowme meowmeowm meow meow", source: "https://github.com/", isDeployed: true, deployedLink: "https://www.nightlyreel.com/" }
  ]);
  
  const [gone, setGone] = useState([]);
  const [piles, setPiles] = useState({ Good: [], Bad: [] });

  const handleSwipe = (direction, index) => {
    setGone((prevGone) => [...prevGone, index]);
  };

  const handleDropCard = (pileLabel, cardIndex) => {
    console.log(`Card ${cardIndex} dropped into pile: ${pileLabel}`);

    // Update piles state to stack cards
    setPiles((prevPiles) => ({
      ...prevPiles,
      [pileLabel]: [...prevPiles[pileLabel], cardIndex] // Add card to pile
    }));
    setGone((prev) => [...prev, cardIndex]); // Remove card from main stack
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-200">
      <div className="flex justify-around p-6">
        <Pile
          label="This is a super cool and innovative project"
          pile="Good"
          cards={piles.Good} // Pass the pile cards
          onCardDropped={handleDropCard}
        />
        <Pile
          label="Not a fan"
          pile="Bad"
          cards={piles.Bad} // Pass the pile cards
          onCardDropped={handleDropCard}
        />
      </div>

      {cards.map((card, index) => {
        const isGone = gone.includes(index);
        if (isGone) return null; // Don't render swiped cards

        return (
          <SwipeableCard
            key={index}
            index={index}
            onSwipe={handleSwipe}
            gone={isGone}
            offset={{ x: 0, y: index * 10 }}
          >
            {{
              title: card.title,
              description: card.desc,
              link: card.isDeployed ? card.deployedLink : card.source
            }}
          </SwipeableCard>
        );
      })}
    </div>
  );
};

export default Game;
