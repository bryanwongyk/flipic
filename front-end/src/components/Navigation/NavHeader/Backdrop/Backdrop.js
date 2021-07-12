import styled from 'styled-components';

const StyledBackdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 10;

	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(6px);
`;

const Backdrop = ({ clickHandler, children }) => {
	return <StyledBackdrop onClick={clickHandler}>{children}</StyledBackdrop>;
};

export default Backdrop;
