import styled from 'styled-components';
import theme from '../Theme/theme';

const StyledBarWrapper = styled.div`
    box-sizing: content-box;
    height: 1.5em; 
    position: fixed;
    bottom: 2em;
    left: 2.5%;
    width: 92%;
    background: ${theme.color.primary};
    border-radius: 25px;

    & > span {
        width: ${props => props.progress * 100 + "%"};
        display: block;
        height: 100%;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background: ${theme.color.secondary};
        box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
            inset 0 -2px 6px rgba(0, 0, 0, 0.4);
        position: relative;
        overflow: hidden;
        transition: width 1s;
    }
`

const ProgressBar = ({progress}) => {
	return (
		<StyledBarWrapper progress={progress}>
            <span></span>
        </StyledBarWrapper>
	);
};

export default ProgressBar;
