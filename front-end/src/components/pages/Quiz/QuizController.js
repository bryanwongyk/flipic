import React from 'react';
import QuizStageContoller from './QuizStageContoller';
import QuizResult from './QuizResult';


const getCookie = (cname) => {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return true;
		}
	}
	return false;
}


const QuizContoller = props => {
	const quizId = props.quizId.match.params.quizId;
	const cname = 'flipic_' +  quizId;
	let didBefore = getCookie(cname)

	if (didBefore) {
		return (
			<QuizResult quizId={quizId} didBefore={true} />
		);
	} else {
		return (
			<QuizStageContoller quizId={quizId}/>
		);
	}
}

export default QuizContoller;