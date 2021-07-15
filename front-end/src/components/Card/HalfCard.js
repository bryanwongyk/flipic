import styled from 'styled-components';
import theme from '../Theme/theme';
import { animated } from "react-spring";

const StyledHalfCard = styled.div`
    background-color: ${props => (props.pos === -1) ? theme.color.accent : theme.color.primary};
    height: 96%;
    border-radius: ${props => (props.pos === -1) ? '10px 0px 0px 10px' : '0px 10px 10px 0px'};
    margin: ${props => (props.pos === -1) ? '5px 2.5px 5px 5px' : '5px 5px 5px 2.5px'};
    display: flex;
    justify-content: center;
    align-items: center;
`

// const StyledCardItem = styled.div`
//     text-align: center;
//     display: ${props => console.log(props.pos)};
// `

const StyledCardItemEmoji = styled.p`
    font-size: 3em;
`
const StyledCardItemText = styled.p`
    font-size: 1.3em;
    font-weight: bold;
    color: ${theme.color.background.secondary};
    padding-top: 1em;
`

const HalfCard = (props) => {
    if (props.data != null) {
        return (
            <StyledHalfCard pos={props.pos}>
                <animated.div style={{textAlign: 'center', display: props.show}}>
                    <StyledCardItemEmoji> {props.data.emoji} </StyledCardItemEmoji>
                    <StyledCardItemText> {props.data.item} </StyledCardItemText>
                </animated.div>
            </StyledHalfCard>
        );
    }else{
        return (
            <StyledHalfCard pos={props.pos}>
            </StyledHalfCard>
        );
    }
	
};


export default HalfCard;