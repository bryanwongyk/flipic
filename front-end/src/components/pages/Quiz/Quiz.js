import StyledDeck from '../../Deck/StyledDeck';
import data from '../../../data/mockQuizData';
import styled from 'styled-components';
import theme from '../../Theme/theme';
import React, { useEffect, useState } from 'react';
import ProgressBar from '../../ProgressBar/ProgressBar';
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

const Quiz = ({ isDemo }) => {
	const [progress, updateProgress] = useState(0);
	const [tutorialShown, updateTutorialShown] = useState(true);

	const handleCloseTutorial = () => {
		updateTutorialShown(false);
	};

	const handleOpenTutorial = () => {
		updateTutorialShown(true);
	};

	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz/60ec04f3284909517f15152b')
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, []);

	return (
		<>
			{tutorialShown ? <TutorialOverlay handleClose={handleCloseTutorial} /> : null}
			<InformationBtnWrapper>
				<InformationButton onClick={handleOpenTutorial} />
			</InformationBtnWrapper>
			<StyledSurveyHeader>{data.topic}</StyledSurveyHeader>
			<StyledQuestion>{data.questions[0].question}</StyledQuestion>
			<StyledDeck data={data} updateProgress={updateProgress} />
			<ProgressBar progress={progress} />
		</>
	);
};

export default Quiz;
