import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import Loader from '../../Loader/Loader';
import styled from 'styled-components';
import theme from '../../Theme/theme';
import GetStartedOverlay from '../../getStartedOverlay/GetStartedOverlay';
import QuizResult from './QuizResult';
// import LoadingPage from '../LoadingPage/LoadingPage';

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

const setCookie = (cname, cvalue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const QuizStageContoller = props => {
	// Get initial quiz info and first two pairs of cards
	const quizId = props.quizId;
	const [quizInfo, getQuizInfo] = useState(null);
	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz/' + quizId)
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				getQuizInfo(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, [quizId]);

	const [frontPair, setFront] = useState(null);
	const [backPair, setBack] = useState(null);
	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-matchup/' + quizId)
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				setFront(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, [quizId]);

	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-matchup/' + quizId)
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				setBack(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, [quizId]);


	// control the when to show the welcome page and the result page 
	const [welcomed, setWelcomed] = useState(false);
	const handleWelcomed = () => {
		setWelcomed(true);
	};
	const [quizDone, setDone] = useState(false);
	
	// if quizDone then set client-side cookie and show result, otherwise show next page
	// if welcomed then do no show the welcome page, otherwise show welcome page
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
					{welcomed ? null : (
						<GetStartedOverlay handleWelcomed={handleWelcomed} author={quizInfo.data.quizCreator} />
					)}
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
				// <LoadingPage />
			);
		}
	} else {
		const cname = 'flipic_' +  quizInfo.data._id;
		const value = true;
		const exdays = 30;
		setCookie(cname, value, exdays);
		return <QuizResult quizId={quizId} didBefore={false} />;
	}
};

export default QuizStageContoller;
