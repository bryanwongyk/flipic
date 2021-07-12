import styled, { keyframes } from 'styled-components';
import theme from '../Theme/theme';
import bp from '../Theme/breakpoints';

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

const ScrollBorder = styled.div`
	display: none;
	height: 42px;
	width: 24px;
	border-radius: 14px;
	transform: none;
	border: 2px solid ${theme.color.text.primary};
	top: 170px;

	@media ${bp.sm} {
		display: block;
	}
`;

const ScrollWheelWrapper = styled.div`
	height: 75%;
	animation: ${ScrollDownAnimation} 1.5s ease-out infinite;
`;

const ScrollWheel = styled.div`
	height: 5px;
	width: 2px;
	display: block;
	margin: 5px auto;
	background: white;
	position: relative;

	height: 10px;
	border: 0.5px solid ${theme.color.text.primary};
	border-radius: 8px;
`;

const ScrollDownCTA = () => {
	return (
		<ScrollBorder>
			<ScrollWheelWrapper>
				<ScrollWheel />
			</ScrollWheelWrapper>
		</ScrollBorder>
	);
};

export default ScrollDownCTA;
