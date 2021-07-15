import Backdrop from '../Navigation/NavHeader/Backdrop/Backdrop';
import styled from 'styled-components';
import PrimaryButton from '../Button/Primary/PrimaryButton';
import theme from '../Theme/theme';
import bp from '../Theme/breakpoints';
import { fontSize } from '@material-ui/system';


const BackdropWrapper = styled.div`
	background: rgb(89, 174, 166);
	background: linear-gradient(90deg, rgba(89, 174, 166, 0.5) 0%, rgba(178, 217, 183, 0.1) 100%);
	width: 100vw;
	height: 100vh;
	z-index: 9;
	position: fixed;
	top: 0;
	left: 0;
`;

const GetStartedLayer = styled.div`
	position: fixed;
	z-index: 1000;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const GetStartedContentWrapper = styled.div`
	height: 90vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const GetStartedHeader = styled.p`
    margin: 0 3vw 0 3vw;
    word-break: break-all;
	text-align: center;
	color: ${theme.color.background.secondary};
    font-weight: bold;
    font-size: 2em;
`;



const GetStartedOverlay = ({ handleWelcomed, author }) => {
	return (
		<>
			<BackdropWrapper>
				<Backdrop />
			</BackdropWrapper>
			<GetStartedLayer>
				<GetStartedContentWrapper>
					<GetStartedHeader>{author + '\'s quiz'}</GetStartedHeader>
                    <PrimaryButton onClick={handleWelcomed} style={{margin: '2em auto 0 auto', fontSize: '1.2em', padding: '1em 2em'}}>Get Started</PrimaryButton>
				</GetStartedContentWrapper>     
			</GetStartedLayer>
		</>
	);
};

export default GetStartedOverlay;
