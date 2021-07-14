import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
// import quizInfo from '../../../data/mockQuizData';
import matchUp from '../../../data/mockMatchUp';

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

	// const [frontPair, setFront] = useState(null);
	// const [backPair, setBack] = useState(null);

	const [frontPair, setFront] = useState(matchUp[0]);
	const [backPair, setBack] = useState(matchUp[1]);

	if (quizInfo !== null && frontPair !== null && backPair !== null) {
		console.log(quizInfo);
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
