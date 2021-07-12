import React, { useState } from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import theme from "../Theme/theme";
import Card from "../Card/Card";

const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: 0, delay: i * 100, bgColor: theme.color.background.secondary, lWidth: '50%', rWidth: '50%'});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000, bgColor: theme.color.background.secondary, lWidth: '50%', rWidth: '50%'});

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const Deck = ({data}) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are picked

  const [props, set] = useSprings(data.num_choices, (i) => ({
    ...to(i),
    from: from(i),
  })); 

  const sendChoice = (payload) =>{
    fetch('https://testflipick.free.beeceptor.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'text',
            },
            body: payload,
          })
          .catch((error) => {
            console.error('Error:', error);
          });
  };

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
        if (index !== i) return; 
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const scale = down ? 1.1 : 1; // Active cards lift up a bit 
        let rot; // How much the card tilts, flicking it harder makes it rotate faster
        let bgColor; // change card overlay color
        let lWidth;
        let rWidth;
        if (x > 0) {
          bgColor = theme.color.primary
          rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); 
          lWidth = '0%';
          rWidth = '100%';
          // if (isGone) sendChoice('right');
        } else if (x < 0) {
          bgColor = theme.color.accent
          rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); 
          lWidth = '100%';
          rWidth = '0%';
          // if (isGone) sendChoice('left');
        } else {
          bgColor = theme.color.background.secondary
          rot = 0
          lWidth = '50%';
          rWidth = '50%';
        }
        return {
          x,
          rot,
          bgColor,
          lWidth,
          rWidth,
          scale,
          delay: undefined,
          config: { friction: 100, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === data.num_choices){
        // end of quiz
      }
    }
  );
  
  return props.map(({ x, y, rot, scale, bgColor, lWidth, rWidth }, i) => (
    <Card 
      key = {i}
      i = {i}
      x = {x}
      y = {y}
      data = {data}
      bind = {bind}
      trans = {trans}
      rot = {rot}
      scale = {scale}
      bgColor = {bgColor}
      lWidth = {lWidth}
      rWidth = {rWidth}
    />
  ));
};



export default Deck;
