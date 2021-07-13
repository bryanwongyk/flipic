import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";

const QuizInfo = () => {
	const [quizInfo, getQuizInfo] = useState({});

	useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz/60ec04f3284909517f15152b')
          .then(response => response.json())
          .then(data => {
			getQuizInfo(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
	}, []);

	console.log(quizInfo)

	return (
		<Quiz info={quizInfo}/>
	);
};

export default QuizInfo;