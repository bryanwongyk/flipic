
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
`

const StyledResultItem = styled.div`
    margin-bottom: 1em;
    display: flex;
`

const StyledResultIcon = styled.p`
    width: 10vw;
    font-size: 1.5em;
    margin-right: 3vw;
`

const StyledResultContent = styled.div`
    display: flex;
    flex-direction:column;
    text-align: left;
    width: 80vw;
`

const StyledResultName = styled.p`
    font-size: 1.2em;
    color: ${theme.color.background.secondary};
    font-weight: bold;
`

const StyledResultNum = styled.p`
    font-size: 1.2em;
    color: ${theme.color.background.secondary};
    font-weight: bold;
    margin-left: 1em;
`


// fetch result and show result after 1.5s loading time
const QuizResult = ({quizId, didBefore}) => {
    const [result, getQuizResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com//api/quiz-results/' + quizId)
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				getQuizResult(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, [quizId]);

    setTimeout(() => setShowResult(true), 1500);

    if (result !== null & showResult) {
        let total = 0;
        result.data.map((item) => {
            total += item.numSuccess;
        });

        return (
            <>
                <StyledResultWrapper>
                    <StyledResultHeader>Results</StyledResultHeader>
                    {result.data.map((item, i)=>{
                        const percentage = item.numSuccess / total
                        return(
                            <StyledResultItem key={i}>
                                <StyledResultIcon>{item.icon}</StyledResultIcon>
                                <StyledResultContent>
                                    <StyledResultName>{item.name}</StyledResultName>
                                    <div style={{display: 'flex', marginTop: '1em'}}> 
                                        <ResultBar percentage={percentage} index={i}></ResultBar>
                                        <StyledResultNum index={i}>{item.numSuccess}</StyledResultNum>
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
                        {didBefore? <></> : <StyledPara>Thank you for taking the quiz!</StyledPara>}
                        <StyledPara>Loading quiz results...</StyledPara>
                    </StyledLoader>
                </>
            );
        };	
};

export default QuizResult;
