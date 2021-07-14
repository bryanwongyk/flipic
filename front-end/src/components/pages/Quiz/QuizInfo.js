import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import Loader from '../../Loader/Loader';
import matchUp from '../../../data/mockMatchUp';
import styled from 'styled-components';
import theme from '../../Theme/theme';

const StyledPara = styled.p`
	margin-top: 24px;
	font-weight: bold;
	text-align: center;
`;

const StyledLoader = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: ${theme.color.background.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const QuizInfo = (props) => {
	const quizId = props.quizId.match.params.quizId;
	const [quizInfo, getQuizInfo] = useState(null);

	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz/' + quizId)
	      .then(response => response.json())
	      .then(data => {
			getQuizInfo(data);
	      })
	      .catch((error) => {
	        console.error('Error:', error);
	      });
	}, []);

	const [frontPair, setFront] = useState(null);
	const [backPair, setBack] = useState(null);
	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-matchup/' + quizId)
	      .then(response => response.json())
	      .then(data => {
			console.log(data);
			setFront(data);
	      })
	      .catch((error) => {
	        console.error('Error:', error);
	      });
	}, []);

	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-matchup/' + quizId)
	      .then(response => response.json())
	      .then(data => {
			console.log(data);
			setBack(data);
	      })
	      .catch((error) => {
	        console.error('Error:', error);
	      });
	}, []);

	const [welcomed, setWelcomed] = useState(true);

	if (welcomed) {
		if (quizInfo !== null && frontPair !== null && backPair !== null) {
			console.log(quizInfo);
			return <Quiz 
				quizInfo={quizInfo} 
				frontPair={frontPair} 
				backPair={backPair} 
				setFront={setFront} 
				setBack={setBack} />;
		}else{
			return (
				<StyledLoader>
					<Loader />
					<StyledPara>Loading...</StyledPara>
				</StyledLoader>
			);
		}
	}else{
		<div>welcome</div>
	}

	

};

export default QuizInfo;
