import Loader from '../../Loader/Loader';
import styled from 'styled-components';
import theme from '../../Theme/theme';

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: ${theme.color.background.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const StyledPara = styled.p`
	margin-top: 24px;
	font-weight: bold;
	text-align: center;
`;

const LoadingPage = () => {
	return (
		<StyledPage>
			<Loader />
			<StyledPara>Loading...</StyledPara>
		</StyledPage>
	);
};
export default LoadingPage;
