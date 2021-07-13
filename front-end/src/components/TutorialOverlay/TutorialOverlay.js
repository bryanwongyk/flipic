import Backdrop from '../Navigation/NavHeader/Backdrop/Backdrop';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';
import styled from 'styled-components';
import ExitButton from '../Button/Exit/ExitButton';

import Tutorial1Img from '../../assets/svgs/tutorial-1.svg';
import Tutorial2Img from '../../assets/svgs/tutorial-2.svg';
import Tutorial3Img from '../../assets/svgs/tutorial-3.svg';

import theme from '../Theme/theme';
import bp from '../Theme/breakpoints';

const StyledSlider = styled(Slider)`
	z-index: 1000;
`;

const SliderDiv = styled.div`
	height: 100%;
	width: 100%;
	display: flex !important;
	flex-direction: column-reverse !important;
	justify-content: center !important;
	align-items: center !important;

	button {
		display: block !important;
		position: absolute !important;
		left: 90% !important;
		top: 50% !important;
	}
`;

const TutorialHeader = styled.h1`
	text-align: center;
	margin-bottom: 16px;
	color: ${theme.color.text.primary};
`;

const TutorialLayerDiv = styled.div`
	position: fixed;
	z-index: 1000;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const TutorialImage = styled.img`
	width: 220px;
	max-height: 370px;
	margin-bottom: 48px;
`;

const TutorialSlideHeading = styled.h3`
	color: ${theme.color.background.secondary};
	text-align: center;
	margin-bottom: 16px;
	@media ${bp.sm} {
		font-size: 2rem;
	}
`;

const TutorialSlidePara = styled.p`
	color: ${theme.color.background.secondary};
	font-weight: bold;
	text-align: center;
	margin-bottom: 48px;
	width: 80%;
	@media ${bp.sm} {
		font-size: 1.3rem;
	}
`;

const ExitButtonWrapper = styled.div`
	z-index: 2000;
	position: absolute;
	left: 85%;
	top: 2%;
	@media ${bp.sm} {
		left: 90%;
	}
`;

const TutorialContentWrapper = styled.div`
	height: 90vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const TutorialTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 24px; */
`;

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

const TutorialOverlay = ({ handleClose }) => {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		// centerMode: true,
		// prevArrow: <prevArrow />,
	};
	return (
		<>
			<BackdropWrapper>
				<Backdrop />
			</BackdropWrapper>
			<TutorialLayerDiv>
				<ExitButtonWrapper>
					<ExitButton onClick={handleClose} />
				</ExitButtonWrapper>
				<TutorialContentWrapper>
					<TutorialHeader>How to use</TutorialHeader>
					<StyledSlider {...settings}>
						<SliderDiv>
							<TutorialImage src={Tutorial1Img} alt="Example card with options" />
							<TutorialTextWrapper>
								<TutorialSlideHeading>Options will be given</TutorialSlideHeading>
								<TutorialSlidePara>in response to the prompts at the top</TutorialSlidePara>
							</TutorialTextWrapper>
						</SliderDiv>
						<SliderDiv>
							<TutorialImage src={Tutorial2Img} alt="Example stack with options" />
							<TutorialTextWrapper>
								<TutorialSlideHeading>Swipe left or right</TutorialSlideHeading>
								<TutorialSlidePara>
									based on your preference between the options in response to the prompt
								</TutorialSlidePara>
							</TutorialTextWrapper>
						</SliderDiv>
						<SliderDiv>
							<TutorialImage
								src={Tutorial3Img}
								alt="Example progress bar"
								style={{ marginTop: '87px' }}
							/>
							<TutorialTextWrapper>
								<TutorialSlideHeading>Check your progress</TutorialSlideHeading>
								<TutorialSlidePara>
									the progress bar will track how many cards you have left
								</TutorialSlidePara>
							</TutorialTextWrapper>
						</SliderDiv>
					</StyledSlider>
				</TutorialContentWrapper>
			</TutorialLayerDiv>
		</>
	);
};

export default TutorialOverlay;
