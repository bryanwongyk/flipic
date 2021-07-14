
import styled from 'styled-components';
import theme from '../../Theme/theme';
import ProgressBar from '../../Bar/ProgressBar';
// import bp from '../../Theme/breakpoints';
import Footer from '../../Navigation/Footer/Footer';
import ResultBar from '../../Bar/ResultBar';

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

const QuizResult = ({result}) => {
	let total = 0;
    result.data.map((item) => {
        total += item.numSuccess;
    });
    console.log(total);

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
};

export default QuizResult;
