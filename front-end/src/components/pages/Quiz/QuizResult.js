import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../Theme/theme';
// import bp from '../../Theme/breakpoints';
import Footer from '../../Navigation/Footer/Footer';
import ResultBar from '../../Bar/ResultBar';
import Loader from '../../Loader/Loader';

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

const StyledResultWrapper = styled.div`
	height: 80vh;
	width: 100vw;
	padding: 1em;
	text-align: center;
	overflow: auto;
`;

const StyledResultHeader = styled.h1`
	margin-bottom: 1em;
`;

const StyledResultItem = styled.div`
	margin-bottom: 1em;
	display: flex;
`;

const StyledResultIcon = styled.p`
	width: 10vw;
	font-size: 1.5em;
	margin-right: 3vw;
`;

const StyledResultContent = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 80vw;
`;

const StyledResultName = styled.p`
	font-size: 1.2em;
	color: ${theme.color.background.secondary};
	font-weight: bold;
`;

// const StyledResultNum = styled.p`
//     font-size: 1.2em;
//     color: ${theme.color.background.secondary};
//     font-weight: bold;
//     margin-left: 1em;
// `

// fetch result and show result after 1.5s loading time
const QuizResult = ({ quizId, didBefore, userName }) => {
	const [result, getQuizResult] = useState(null);
	const [showResult, setShowResult] = useState(false);
    const [creator, setCreator] = useState(null);

	useEffect(() => {
		fetch('https://www.flipic.net/api/quiz-results/' + quizId)
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				getQuizResult(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, [quizId]);

	const [publicQuiz, setPublic] = useState(null);
	useEffect(() => {
		fetch('https://www.flipic.net/api/quiz/' + quizId)
			.then(response => response.json())
			.then(data => {
				const privacyType = data.data.privacyType;
				if (privacyType === 'Private') {
					setPublic(false);
                    setCreator(data.data.quizCreator);
				} else {
					setPublic(true);
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, []);

    // console.log(userName);

	setTimeout(() => setShowResult(true), 1500);

	if (publicQuiz !== null) {
		if (publicQuiz || userName === creator) {
			if ((result !== null) & showResult) {
				let total = 0;
				result.data.map(item => {
					total += item.numSuccess;
				});

				return (
					<>
						<StyledResultWrapper>
							<StyledResultHeader>Results</StyledResultHeader>
							{result.data.map((item, i) => {
                                let percentage = 0
                                if (total !== 0) {
                                    percentage = item.numSuccess / total;
                                } 
								return (
									<StyledResultItem key={i}>
										<StyledResultIcon>{item.emoji}</StyledResultIcon>
										<StyledResultContent>
											<StyledResultName>{item.item}</StyledResultName>
											<div style={{ display: 'flex', marginTop: '1em' }}>
												<ResultBar percentage={percentage} index={i}></ResultBar>
												{/* <StyledResultNum index={i}>{item.numSuccess}</StyledResultNum> */}
											</div>
										</StyledResultContent>
									</StyledResultItem>
								);
							})}
						</StyledResultWrapper>
						<Footer />
					</>
				);
			} else {
				return (
					<>
						<StyledLoader>
							<Loader />
							{didBefore ? <></> : <StyledPara>Thank you for taking the survey!</StyledPara>}
							<StyledPara>Loading survey results...</StyledPara>
						</StyledLoader>
					</>
				);
			}
		} else {
			return (
				<>
					<StyledLoader>
						{didBefore ? <></> : <StyledPara>Thank you for taking the survey!</StyledPara>}
						<StyledPara>The result is not public...</StyledPara>
					</StyledLoader>
				</>
			);
		}
	} else {
		return (
			<>
				<StyledLoader>
					<Loader />
					<StyledPara>Loading...</StyledPara>
				</StyledLoader>
			</>
		);
	}
};

export default QuizResult;
