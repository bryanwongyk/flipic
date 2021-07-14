import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import Loader from '../../Loader/Loader';
import styled from 'styled-components';
import theme from '../../Theme/theme';
import GetStartedOverlay from '../../getStartedOverlay/GetStartedOverlay';
import QuizResult from './QuizResult';
// import mockQuizData from '../../../data/mockQuizData';
// import result from '../../../data/mockQuizResult';

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

const quizResultWrapper = styled.div`
	display: flex;
`;

const QuizContoller = (props) => {
	const quizId = props.quizId.match.params.quizId;
	const [quizInfo, getQuizInfo] = useState(null);
	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz/' + quizId)
	      .then(response => response.json())
	      .then(data => {
			console.log(data);
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
			// console.log(data);
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
			// console.log(data);
			setBack(data);
	      })
	      .catch((error) => {
	        console.error('Error:', error);
	      });
	}, []);

	const [welcomed, setWelcomed] = useState(false);
	const handleWelcomed = () => {
		setWelcomed(true);
	}

	const [quizDone, setDone] = useState(false);
	const [quizResult, getQuizResult] = useState(null);

	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-results/' + quizId)
	      .then(response => response.json())
	      .then(data => {
			// console.log(data);
			getQuizResult(data);
	      })
	      .catch((error) => {
	        console.error('Error:', error);
	      });
	}, [quizDone]);

	const [showResult, setShowResult] = useState(false);


	if (!quizDone) {
		if (quizInfo !== null && frontPair !== null && backPair !== null) {
			return (
				<>
					<Quiz 
						quizInfo={quizInfo} 
						frontPair={frontPair} 
						backPair={backPair} 
						setFront={setFront} 
						setBack={setBack} 
						setDone={setDone}
					/>
					{welcomed ? null : <GetStartedOverlay handleWelcomed={handleWelcomed} author={'quizMakerhasaverylongname'}/>}
				</>
			);
		} else {
			return (
				<>
					<StyledLoader>
						<Loader />
						<StyledPara>Loading...</StyledPara>
					</StyledLoader>
				</>
			);
			// console.log(result.data)
			// return (
			// 	<p>quiz done</p>
			// );
		};
	}else{
		setTimeout(() => setShowResult(true),1500);
		if (quizResult === null || !showResult){
			return (
				<>
					<StyledLoader>
						<Loader />
						<StyledPara>Thank you for taking the quiz!</StyledPara>
						<StyledPara>Loading quiz results...</StyledPara>
					</StyledLoader>
				</>
			);
		} else {
			if (quizResult.data !== null) {
				return <QuizResult result={quizResult}/>
			}
		}
	}
	
};

export default QuizContoller;
