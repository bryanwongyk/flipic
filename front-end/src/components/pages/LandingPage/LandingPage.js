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

const PageWrapper = styled.div`
	padding-bottom: 64px;
`;

const HeroSection = styled.section`
	padding: 48px 0 60px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
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
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SectionHeader = styled.h3`
	color: ${theme.color.accent};
	margin-bottom: 16px;
`;

const AboutImg = styled.img`
	width: 280px;
`;

const HowSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 60px;
`;

const HowList = styled.ol`
	list-style-type: none;
	color: ${theme.color.text};
`;

const HowItem = styled.li`
	width: 90%;
	background-color: ${theme.color.tertiary};
	border: 3px solid white;
	border-radius: 15px;
	padding: 24px 12px;
	display: flex;
	flex-direction: column;
	margin-bottom: 48px;

	&:nth-child(2) {
		flex-direction: column-reverse;
	}

	div img &:nth-child(2) {
		width: 90%;
	}
`;

const HowImgWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HowHeading = styled.h3`
	padding-left: 8px;
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
	transform: translate(60px, 0px);
`;

const ActionImg = styled.img`
	width: 90%;
	margin-top: 16px;
`;

const ActionDiv = styled.div`
	transform: translateX(140px);
	width: 60%;
`;

const LandingPage = () => {
	return (
		<PageWrapper>
			<HeroSection>
				<HeroHeader>Introducing Flipic</HeroHeader>
				<HeroSubHeader>A fun approach to collecting data for data-driven decision-making</HeroSubHeader>
				<HeroImg src={CardStack} alt="Stack of cards" />
				<ScrollDownCta />
			</HeroSection>
			<AboutSection>
				<GlassmorphicWrapper>
					<AboutImg src={About} alt="About" />
					<SectionHeader>Decision-making for everyone.</SectionHeader>
					<p>
						With Flipic, you can easily create professional, fun and insightful surveys. The tool
						automatically groups survey options into cards, which users can swipe to make their decisions.
						This means that users only need to choose between two options at a time, leading to Flipics
						being easier and more enjoyable to answer. Our algorithms do all the hard work for you to rank
						the results. You can focus on doing what matters.
					</p>
				</GlassmorphicWrapper>
			</AboutSection>
			<HowSection>
				<SectionHeader>How to use Flipic</SectionHeader>
				<div>
					<HowList>
						<HowItem>
							<HowImgWrapper>
								<CreateImg src={Create} />
							</HowImgWrapper>
							<div>
								<HowHeading>1. Create</HowHeading>
								<p>
									No prior knowledge is needed, just log-in and follow the instructions to get started
								</p>
							</div>
						</HowItem>
						<HowItem>
							<HowImgWrapper>
								<ShareImg src={Share} />
							</HowImgWrapper>
							<div>
								<HowHeading>2. Share</HowHeading>
								<p>Instantly share your survey with your audience</p>
							</div>
						</HowItem>
						<HowItem>
							<HowImgWrapper>
								<SurveyImg src={Survey} />
							</HowImgWrapper>
							<div>
								<HowHeading>3. Survey</HowHeading>
								<p>Gather meaningful data</p>
							</div>
						</HowItem>
						<HowItem>
							<HowImgWrapper>
								<ActionImg src={ViewResults} />
							</HowImgWrapper>
							<ActionDiv>
								<HowHeading>4. Take action</HowHeading>
								<p>View and analyse your results so you can inform your next decision</p>
							</ActionDiv>
						</HowItem>
					</HowList>
				</div>
				<GlassmorphicWrapper>
					<SectionHeader>Have a decision to make?</SectionHeader>
					<PrimaryButton style={{ fontSize: '1.5rem' }}>Get Started</PrimaryButton>
				</GlassmorphicWrapper>
			</HowSection>
		</PageWrapper>
	);
};

export default LandingPage;
