import { animated, to as interpolate } from "react-spring";
import styled from "styled-components";
import theme from "../Theme/theme";
import HalfCard from "./HalfCard";

const StyledCard = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
`

const Card = (props) => {
    const x = props.x
    const y = props.y

    if (props.i == props.frontIndex) {
        console.log(props.i);
        // console.log(props.frontPair);
        return (
            <animated.div key={props.i} style={{ x, y }}>
                <animated.div {...props.bind(props.i)} style={{ transform: interpolate([props.rot, props.scale], props.trans) , backgroundColor: props.bgColor}}>
                    <StyledCard>
                        <animated.div style={{width: props.lWidth}} >
                            <HalfCard pos={-1} data={props.frontPair.matchup[0]} show={props.lShow}/>
                        </animated.div>
                        <animated.div style={{width: props.rWidth}} >
                            <HalfCard pos={1}  data={props.frontPair.matchup[1]} show={props.rShow}/>
                        </animated.div>
                    </StyledCard>
                </animated.div>
            </animated.div>
        );
    }else if (props.i == props.backIndex) {
        // console.log(props.i);
        // console.log(props.backPair);
        return (
            <animated.div key={props.i} style={{ x, y }}>
                <animated.div {...props.bind(props.i)} style={{ transform: interpolate([props.rot, props.scale], props.trans) , backgroundColor: props.bgColor}}>
                    <StyledCard>
                        <animated.div style={{width: props.lWidth}} >
                            <HalfCard pos={-1} data={props.backPair.matchup[0]} show={props.lShow}/>
                        </animated.div>
                        <animated.div style={{width: props.rWidth}} >
                            <HalfCard pos={1} data={props.backPair.matchup[1]} show={props.rShow}/>
                        </animated.div>
                    </StyledCard>
                </animated.div>
            </animated.div>
        );
    }else{
        return (
            <animated.div key={props.i} style={{ x, y }}>
                <animated.div {...props.bind(props.i)} style={{ transform: interpolate([props.rot, props.scale], props.trans) , backgroundColor: props.bgColor}}>
                    <StyledCard>
                        <animated.div style={{width: props.lWidth}} >
                            <HalfCard pos={-1} data={null} show={props.lShow}/>
                        </animated.div>
                        <animated.div style={{width: props.rWidth}} >
                            <HalfCard pos={1} data={null} show={props.rShow}/>
                        </animated.div>
                    </StyledCard>
                </animated.div>
            </animated.div>
        );
    }

	
};

export default Card;