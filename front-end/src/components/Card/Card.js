import { animated, to as interpolate } from "react-spring";
import styled from "styled-components";
import theme from "../Theme/theme";

const StyledCard = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
`

const StyledHalfCard = styled.div`
    background-color: ${props => (props.pos == -1) ? theme.color.accent : theme.color.primary};
    height: 96%;
    border-radius: ${props => (props.pos == -1) ? '10px 0px 0px 10px' : '0px 10px 10px 0px'};
    margin: ${props => (props.pos == -1) ? '5px 2.5px 5px 5px' : '5px 5px 5px 2.5px'};
`

const Card = (props) => {
    const x = props.x
    const y = props.y
	return (
        <animated.div key={props.i} style={{ x, y }}>
            <animated.div {...props.bind(props.i)} style={{ transform: interpolate([props.rot, props.scale], props.trans) , backgroundColor: props.bgColor}}>
                <StyledCard>
                    <animated.div style={{width: props.lWidth}} >
                        <StyledHalfCard pos={-1}/>
                    </animated.div>
                    <animated.div style={{width: props.rWidth}} >
                        <StyledHalfCard pos={1}/>
                    </animated.div>
                </StyledCard>
            </animated.div>
        </animated.div>
	);
};

export default Card;