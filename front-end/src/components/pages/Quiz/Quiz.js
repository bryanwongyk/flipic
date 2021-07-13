import StyledDeck from '../../Deck/StyledDeck';
import data from '../../../data/mockQuizData';
import styled from 'styled-components';
import theme from '../../Theme/theme';
import React, { useEffect, useState } from "react";
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

	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz/60ec04f3284909517f15152b')
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
	}, []);

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
