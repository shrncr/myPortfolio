import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const SwipeableCard = ({ children, onSwipe, index, offset, gone }) => {
  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
  }));

  const bind = useDrag(({ down, movement: [mx, my], velocity, direction: [dx] }) => {
    if (!down && velocity > 0.5) {
      const swipeDirection = dx > 0 ? "right" : "left";
      const flyX = dx > 0 ? window.innerWidth : -window.innerWidth;
      const flyY = my > 0 ? window.innerHeight : -window.innerHeight;

      api.start({
        x: flyX,
        y: flyY,
        rotate: dx > 0 ? 20 : -20,
        scale: 1.1,
        config: { tension: 300, friction: 20 },
      });

      onSwipe(swipeDirection, index);
      return;
    }

    if (!gone) {
      api.start({
        x: mx + offset.x,
        y: my + offset.y,
        rotate: mx / 50,
        scale: down ? 1.05 : 1,
      });
    }
  });

  return (
    <animated.div
      {...bind()}
      className="absolute flex flex-col items-center justify-between w-64 h-96 p-6 rounded-xl shadow-2xl transition-all
                 bg-white/60 backdrop-blur-md border border-gray-300"
      style={{
        x,
        y,
        rotate,
        scale,
        touchAction: "none",
      }}
    >
      {/* Card Content */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{children.title}</h2> {/* Using `title` from `children` props */}
        <p className="text-sm text-gray-600">{children.description}</p> {/* Using `description` from `children` props */}
      </div>

      {/* Card Footer (Button/Link) */}
      <div className="w-full flex justify-center">
        <a
          href={children.link} /* Using `link` from children prop */
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Learn More
        </a>
      </div>
    </animated.div>
  );
};

export default SwipeableCard;
