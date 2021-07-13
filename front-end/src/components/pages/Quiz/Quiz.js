import StyledDeck from '../../Deck/StyledDeck';
import data from '../../../data/mockQuizData';
import styled from 'styled-components';
import theme from '../../Theme/theme';
import React, { useState } from "react";
import ProgressBar from '../../ProgressBar/ProgressBar';


const StyledSurveyHeader = styled.h3`
	padding: 0.5em 1em 0em 1em;
	text-align: center;
	color: ${theme.color.background.secondary};
	font-size: 2.5em;
	line-height: 1.2em;
`;

const StyledQuestion = styled.p`
	font-size: 1.2em;
	padding-top: 1.2em;
	line-height: 1.2em;
	text-align: center;
	color: ${theme.color.background.secondary};
`;

const Quiz = () => {
	const [progress, updateProgress] = useState(0);

	return (
		<>
			<StyledSurveyHeader>{data.topic}</StyledSurveyHeader>
			<StyledQuestion>{data.questions[0].question}</StyledQuestion>
			<StyledDeck data={data} updateProgress={updateProgress}/>
			<ProgressBar progress={progress}/>
		</>
	);
};

export default Quiz;
