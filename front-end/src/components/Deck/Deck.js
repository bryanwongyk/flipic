import React, { useState } from 'react';
import { useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import theme from '../Theme/theme';
import Card from '../Card/Card';

const to = i => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rot: 0,
	delay: i * 100,
	bgColor: theme.color.background.secondary,
	lWidth: '50%',
	rWidth: '50%',
  lShow: 'initial',
  rShow: 'initial',
});
const from = i => ({
	x: 0,
	rot: 0,
	scale: 1.5,
	y: -1000,
	bgColor: theme.color.background.secondary,
	lWidth: '50%',
	rWidth: '50%',
  lShow: 'initial',
  rShow: 'initial',
});

const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const Deck = ({ num_choices, frontPair, backPair, quizId, updateProgress, setFront, setBack }) => {
	const [gone] = useState(() => new Set()); // The set flags all the cards that are picked

	const [frontIndex, updateFrontIndex] = useState(num_choices - 1);
	const [backIndex, updateBackIndex] = useState(num_choices - 2);

	const [props, set] = useSprings(num_choices, i => ({
		...to(i),
		from: from(i),
	}));

	// console.log(frontPair.matchup[0].name);
	// console.log(frontPair.matchup[1].name);
	// console.log(frontIndex);
	// console.log(backIndex);

	const sendChoice = payload => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com/api/quiz-all', {

		method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})
			.then(response => response.json())
			.then(payload => {
				console.log('Success:', payload);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

  const getMatchUp = () => {
    fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-matchup/60ec04f3284909517f15152b')
          .then(response => response.json())
          .then(data => {
        // console.log(data);
            setBack(data)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
  }

	// Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
	const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
		const trigger = velocity > 0.2;

		let dir;
		if (xDir > 0) {
			dir = 1;
		} else if (xDir < 0) {
			dir = -1;
		} else {
			dir = 0;
		}

		if (!down && trigger) gone.add(index);

		// Changing spring-data for the current spring
		set(i => {
			if (index !== i) return;
			const isGone = gone.has(index);
			const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
			const scale = down ? 1.1 : 1; // Active cards lift up a bit
			let rot; // How much the card tilts, flicking it harder makes it rotate faster
			let bgColor; // change card background color
			let lWidth; // change the width of the left half card
			let rWidth; // change the width of the right half card
      let lShow; // change the display of the left half card
      let rShow; // change the display of the right half card
			let payload;

			// animate swiping based on the gesture
			if (x > 0) {
				bgColor = theme.color.primary;
				rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
				lWidth = '0%';
				rWidth = '100%';
        lShow = 'none';
        rShow = 'initial';
				payload = {
					quizId: quizId,
					itemId: frontPair.matchup[1].id,
				};
				// if (!down && isGone) sendChoice(payload);
			} else if (x < 0) {
				bgColor = theme.color.accent;
				rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
				lWidth = '100%';
				rWidth = '0%';
        lShow = 'initial';
        rShow = 'none';
				payload = {
					quizId: quizId,
					itemId: frontPair.matchup[0].id,
				};
				// if (!down && isGone) sendChoice(payload);
			} else {
				bgColor = theme.color.background.secondary;
				rot = 0;
				lWidth = '50%';
				rWidth = '50%';
        lShow = 'initial';
        rShow = 'initial';
			}

			updateProgress(gone.size / num_choices);
			if (!down && isGone) {
				updateFrontIndex(frontIndex - 1);
				updateBackIndex(backIndex - 1);
        setFront(backPair);
        getMatchUp();
			}

			return {
				x,
				rot,
				bgColor,
				lWidth,
				rWidth,
        lShow,
        rShow,
				scale,
				delay: undefined,
				config: { friction: 100, tension: down ? 800 : isGone ? 200 : 500 },
			};
		});

		if (!down && gone.size === num_choices) {
			// end of quiz
		}
	});

	return props.map(({ x, y, rot, scale, bgColor, lWidth, rWidth, lShow, rShow }, i) => (
		<>
			<Card
				key={i}
				i={i}
				x={x}
				y={y}
				bind={bind}
				trans={trans}
				rot={rot}
				scale={scale}
				bgColor={bgColor}
				lWidth={lWidth}
				rWidth={rWidth}
        lShow={lShow}
        rShow={rShow}
				frontIndex={frontIndex}
				backIndex={backIndex}
				frontPair={frontPair}
				backPair={backPair}
			/>
		</>
	));
};

export default Deck;
