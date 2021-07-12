import styled, { keyframes } from 'styled-components';
import theme from '../Theme/theme';

const ScrollDownAnimation = keyframes`
	from {
		opacity: 1;
		transform: translateY(0%);
	}
	50% {
		opacity: 1;
	}
	90% {
		opacity: 0.5;
	}
	100% {
		transform: translateY(60%);
		opacity: 0;
	}
`;

const ScrollDownOuter = styled.div`
	height: 100%;
	animation: ${ScrollDownAnimation} 1.5s ease-out infinite;
`;

const ScrollDownInner = styled.div`
	height: 5px;
	width: 2px;
	display: block;
	margin: 5px auto;
	background: white;
	position: relative;

	height: 4px;
	width: 4px;
	border: 2px solid ${theme.color.text.primary};
	border-radius: 8px;
`;

const ScrollDownCTA = () => {
	return (
		<ScrollDownOuter>
			<ScrollDownInner />
		</ScrollDownOuter>
	);
};

export default ScrollDownCTA;
