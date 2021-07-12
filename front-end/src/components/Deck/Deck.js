import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import theme from "../Theme/theme";


const cards = [
  "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
  "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: 0, delay: i * 100, bgColor: theme.color.background.secondary});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000, bgColor: theme.color.background.secondary});


const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const Deck = () => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are picked

  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); 

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;

      let dir;
      if (xDir > 0) {
        dir = 1
      } else if (xDir < 0) {
        dir = -1
      } else {
        dir = 0
      }

      if (!down && trigger) gone.add(index);

      // Changing spring-data for the current spring
      set((i) => {
        // console.log(i)
        // console.log(index)
        if (index !== i) return; 
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const scale = down ? 1.1 : 1; // Active cards lift up a bit 
        let rot; // How much the card tilts, flicking it harder makes it rotate faster
        let bgColor; // change card overlay color
        if (x > 0) {
          bgColor = theme.color.primary
          rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); 
        } else if (x < 0) {
          bgColor = theme.color.accent
          rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); 
        } else {
          bgColor = theme.color.background.secondary
          rot = 0
        }
        return {
          x,
          rot,
          bgColor,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale, bgColor }, i) => (
    <animated.div key={i} style={{ x, y }}>
      <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans) , backgroundColor: bgColor}} />
    </animated.div>
  ));
};



export default Deck;
