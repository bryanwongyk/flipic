import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import quizInfo from '../../../data/mockQuizData';
import matchUp from '../../../data/mockMatchUp';

const QuizInfo = () => {
	// const [quizInfo, getQuizInfo] = useState(null);

	// useEffect(() => {
	// 	fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz/60ec04f3284909517f15152b')
	//       .then(response => response.json())
	//       .then(data => {
	// 		getQuizInfo(data);
	//       })
	//       .catch((error) => {
	//         console.error('Error:', error);
	//       });
	// }, []);
	
	// useEffect(() => {
	// 	fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-matchup/60ec04f3284909517f15152b')
	//       .then(response => response.json())
	//       .then(data => {
	// 		// console.log(data);
	// 		setFront(data);
	// 		setBack(data)
	//       })
	//       .catch((error) => {
	//         console.error('Error:', error);
	//       });
	// }, []);

	// const [frontPair, setFront] = useState(null);
	// const [backPair, setBack] = useState(null);

	const [frontPair, setFront] = useState(matchUp[0]);
	const [backPair, setBack] = useState(matchUp[1]);

	// console.log(quizInfo);
	
	if (quizInfo !== null && frontPair !== null && backPair !== null) {
		console.log(frontPair);
		console.log(backPair);
		return <Quiz 
			quizInfo={quizInfo} 
			frontPair={frontPair} 
			backPair={backPair} 
			setFront={setFront} 
			setBack={setBack} />;
	}else{
		return <div>rendering</div>
	}

};

export default QuizInfo;
