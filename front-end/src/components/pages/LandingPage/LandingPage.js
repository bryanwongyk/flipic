import styled from 'styled-components';
import theme from '../../Theme/theme';
import ScrollDownCta from '../../ScrollDownCTA/ScrollDownCTA';
import CardStack from '../../../assets/svgs/card-stack.svg';
import PrimaryButton from '../../Button/Primary/PrimaryButton';
import About from '../../../assets/svgs/about.svg';
import Create from '../../../assets/svgs/create.svg';
import Share from '../../../assets/svgs/share.svg';
import Survey from '../../../assets/svgs/survey.svg';
import ViewResults from '../../../assets/svgs/view-results.svg';
import bp from '../../Theme/breakpoints';

const PageWrapper = styled.div`
	padding: 0 48px 64px 48px;
	max-width: 1560px;
	margin: 0 auto;
`;

const HeroSection = styled.section`
	padding: 48px 0 60px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin: 0 auto;

	@media ${bp.sm} {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		max-width: 1280px;

		padding-top: 0px;
		text-align: left;
	}
`;

const HeroHeader = styled.h1`
	color: ${theme.color.accent};
`;

const HeroSubHeader = styled.h2`
	margin-top: 24px;
	color: ${theme.color.text};
`;

const HeroImg = styled.img`
	margin-top: 24px;
	width: 80%;
	max-width: 556px;
	@media ${bp.sm} {
		margin-left: 24px;
	}
`;

const ScrollCTADiv = styled.div`
	display: none;
	@media ${bp.sm} {
		margin-top: 64px;
		display: flex;
		align-items: center;
	}
`;

const ScrollCTAPara = styled.p`
	margin-left: 16px;
`;

const AboutSection = styled.section`
	display: flex;
	justify-content: center;
`;

const GlassmorphicWrapper = styled.div`
	background: rgb(255, 255, 255);
	background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.2) 100%);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 15px;
	padding: 48px 24px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HowSectionHeader = styled.h3`
	color: ${theme.color.accent};
	margin-bottom: 16px;
	text-align: center;
`;

const AboutSectionHeader = styled.h3`
	color: ${theme.color.accent};
	margin-bottom: 16px;
	text-align: center;

	@media ${bp.sm} {
		text-align: left;
	}
`;

const CTASectionHeader = styled.h3`
	color: ${theme.color.accent};
	margin-bottom: 16px;
	text-align: center;
`;

const AboutImg = styled.img`
	width: 100%;
	margin-bottom: 24px;

	@media ${bp.sm} {
		max-width: 400px;
	}
`;

const AboutPara = styled.p`
	max-width: 400px;
	text-align: center;
	@media ${bp.sm} {
		text-align: left;
	}
`;

const AboutWrapper = styled.div`
	@media ${bp.sm} {
		width: 90%;
		display: flex;
		justify-content: space-around;
	}
`;

const AboutTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media ${bp.sm} {
		align-items: flex-start;
	}
`;

const HowSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 60px;

	@media ${bp.sm} {
		margin-bottom: 60px;
	}
`;

const HowDiv = styled.div`
	width: 100%;
`;

const HowList = styled.ol`
	list-style-type: none;
	padding: 0;
	color: ${theme.color.text};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media ${bp.sm} {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 48px;
	}
`;

const HowItem = styled.li`
	width: 100%;
	height: 100%;
	background-color: ${theme.color.tertiary};
	border: 3px solid white;
	border-radius: 15px;
	padding: 24px 12px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 48px;

	&:nth-child(2),
	&:nth-child(4) {
		flex-direction: column-reverse;
	}

	div img &:nth-child(2) {
		width: 90%;
	}

	@media ${bp.sm} {
		margin-bottom: 0;
	}
`;

const HowImgWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HowTextWrapper = styled.div`
	margin-left: 16px;
`;

const HowHeading = styled.h3`
	margin-bottom: 8px;
`;

const CreateImg = styled.img`
	width: 90%;
`;

const ShareImg = styled.img`
	width: 90%;
	margin-top: 16px;
`;

const SurveyImg = styled.img`
	width: 70%;
	margin-bottom: 16px;
`;

const ActionImg = styled.img`
	width: 90%;
	margin-top: 16px;
	@media ${bp.sm} {
		margin-bottom: 16px;
	}
`;

const CTAButton = styled(PrimaryButton)`
	font-size: 1rem;
	padding-left: 16px;
	padding-right: 16px;

	@media ${bp.sm} {
		font-size: 1.5rem;
	}
`;

const LandingPage = () => {
	return (
		<PageWrapper>
			<HeroSection>
				<div>
					<HeroHeader>Introducing Flipic</HeroHeader>
					<HeroSubHeader>
						A fun approach to collecting data <br />
						for data-driven decision-making
					</HeroSubHeader>
					<ScrollCTADiv>
						<ScrollDownCta />
						<ScrollCTAPara>scroll down</ScrollCTAPara>
					</ScrollCTADiv>
				</div>
				<HeroImg src={CardStack} alt="Stack of cards" />
			</HeroSection>
			<AboutSection>
				<GlassmorphicWrapper>
					<AboutWrapper>
						<AboutImg src={About} alt="About" />
						<AboutTextWrapper>
							<AboutSectionHeader>Decision-making for everyone.</AboutSectionHeader>
							<AboutPara>
								With Flipic, you can easily create <b>professional, fun and insightful surveys.</b>
								<br /> <br />
								The tool automatically groups survey options into cards, which users can swipe to make
								their decisions. This means that users only need to choose between two options at a
								time, leading to Flipics being <b>easier and more enjoyable to answer.</b>
								<br /> <br />
								Our algorithms do all the hard work for you to rank the results. You can{' '}
								<b>focus on doing what matters.</b>
							</AboutPara>
						</AboutTextWrapper>
					</AboutWrapper>
				</GlassmorphicWrapper>
			</AboutSection>
			<HowSection>
				<HowSectionHeader>How to use Flipic</HowSectionHeader>
				<HowDiv>
					<HowList>
						<HowItem>
							<HowImgWrapper>
								<CreateImg src={Create} />
							</HowImgWrapper>
							<HowTextWrapper>
								<HowHeading>1. Create</HowHeading>
								<p>
									No prior knowledge is needed, just log-in and follow the instructions to get started
								</p>
							</HowTextWrapper>
						</HowItem>
						<HowItem>
							<HowImgWrapper>
								<ShareImg src={Share} />
							</HowImgWrapper>
							<HowTextWrapper>
								<HowHeading>2. Share</HowHeading>
								<p>Instantly share your survey with your audience</p>
							</HowTextWrapper>
						</HowItem>
						<HowItem>
							<HowImgWrapper>
								<SurveyImg src={Survey} />
							</HowImgWrapper>
							<HowTextWrapper>
								<HowHeading>3. Survey</HowHeading>
								<p>Gather meaningful data</p>
							</HowTextWrapper>
						</HowItem>
						<HowItem>
							<HowImgWrapper>
								<ActionImg src={ViewResults} />
							</HowImgWrapper>
							<HowTextWrapper>
								<HowHeading>4. Take action</HowHeading>
								<p>View and analyse your results so you can inform your next decision</p>
							</HowTextWrapper>
						</HowItem>
					</HowList>
				</HowDiv>
			</HowSection>
			<GlassmorphicWrapper>
				<CTASectionHeader>Have a decision to make?</CTASectionHeader>
				<CTAButton style={{ fontSize: '1.5rem', paddingLeft: '16px', paddingRight: '16px' }}>
					Get Started
				</CTAButton>
			</GlassmorphicWrapper>
		</PageWrapper>
	);
};

export default LandingPage;
