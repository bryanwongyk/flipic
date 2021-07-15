import StyledDeck from '../../Deck/StyledDeck';
import styled from 'styled-components';
import theme from '../../Theme/theme';
import React, { useState } from 'react';
import ProgressBar from '../../Bar/ProgressBar';
import TutorialOverlay from '../../TutorialOverlay/TutorialOverlay';
import InformationButton from '../../Button/InformationButton/InformationButton';
import bp from '../../Theme/breakpoints';

const StyledSurveyHeader = styled.h3`
	padding: 0.5em 1em 0em 1em;
	text-align: center;
	color: ${theme.color.background.secondary};
	font-size: 2.5em;
	line-height: 1.2em;

	@media ${bp.xs} {
		max-width: 80%;
		text-align: center;
		margin: 0 auto;
	}
`;

const StyledQuestion = styled.p`
	font-size: 1.2em;
	padding-top: 1.2em;
	line-height: 1.2em;
	text-align: center;
	color: ${theme.color.background.secondary};
`;

const InformationBtnWrapper = styled.div`
	position: absolute;
	left: 85%;
	z-index: 5;
`;

const Quiz = ({ quizInfo, frontPair, backPair, setFront, setBack, setDone }) => {
	const [progress, updateProgress] = useState(0);
	const [tutorialShown, updateTutorialShown] = useState(false);

	const handleCloseTutorial = () => {
		updateTutorialShown(false);
	};

	const handleOpenTutorial = () => {
		updateTutorialShown(true);
	};

	return (
		<>
			{tutorialShown ? <TutorialOverlay handleClose={handleCloseTutorial} /> : null}
			<InformationBtnWrapper>
				<InformationButton onClick={handleOpenTutorial} />
			</InformationBtnWrapper>
			<StyledSurveyHeader>{quizInfo.data.name}</StyledSurveyHeader>
			{/* <StyledQuestion>{data.questions[0].question}</StyledQuestion> */}
			<StyledDeck 
				num_choices={5} 
				quizId={quizInfo.data._id}
				frontPair={frontPair}
				backPair={backPair}
				updateProgress={updateProgress}
				setFront={setFront} 
				setBack={setBack}
				setDone={setDone} />
			<ProgressBar progress={progress} />
		</>
	);
};

export default Quiz;
