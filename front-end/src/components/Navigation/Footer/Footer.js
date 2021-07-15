import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../Theme/theme';
import bp from '../../Theme/breakpoints';

const StyledFooter = styled.footer`
	align-items: center;
	text-align: center;
	background: ${theme.color.secondary};
	width: 100%;
	padding-top: 48px;
`;

const FooterWrapper = styled.div`
	max-width: 1560px;
	margin: 0 auto;
	@media ${bp.sm} {
		display: flex;
		padding: 0 48px;
		text-align: left;
	}
`;

const FooterDiv = styled.div`
	margin-right: 0;

	@media ${bp.sm} {
		margin-right: 60px;
	}
`;

const StyledBrandLink = styled(Link)`
	display: inline-block;
	text-decoration: none;
	color: ${theme.color.background.secondary};
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 24px;

	transition: all 0.2s ease;

	&:hover {
		color: lightgrey;
	}
`;

const StyledList = styled.ul`
	list-style: none;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${theme.color.background.secondary};
	padding-left: 0;
	padding-bottom: 16px;

	@media ${bp.sm} {
		align-items: flex-start;
	}
`;

const StyledListItem = styled.li`
	margin-bottom: 16px;
`;

const StyledAnchor = styled.a`
	text-decoration: none;
	color: ${theme.color.background.secondary};
	transition: all 0.2s ease;

	&:hover {
		color: lightgrey;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${theme.color.background.secondary};
	margin-bottom: 16px;

	transition: all 0.2s ease;

	&:hover {
		color: lightgrey;
	}
`;

const StyledPara = styled.p`
	margin: 16px 0;
	color: ${theme.color.background.secondary};
	font-weight: bold;

	@media ${bp.sm} {
		margin-top: 0px;
	}
`;

const LinksHeader = styled.h3`
	color: ${theme.color.background.secondary};
	margin-bottom: 24px;
	font-size: 2rem;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<FooterWrapper>
				<FooterDiv>
					<StyledBrandLink>Flipic</StyledBrandLink>
					<StyledPara>Created by</StyledPara>
					<StyledList>
						<StyledListItem>
							<StyledAnchor href="https://www.linkedin.com/in/alan-truong5/">Alan Truong</StyledAnchor>
						</StyledListItem>
						<StyledListItem>
							<StyledAnchor href="https://www.linkedin.com/in/bryanwongyk/">Bryan Wong</StyledAnchor>
						</StyledListItem>
						<StyledListItem>
							<StyledAnchor href="https://www.linkedin.com/in/grady-tucker-a86081183/">
								Grady Tucker
							</StyledAnchor>
						</StyledListItem>
						<StyledListItem>
							<StyledAnchor href="https://www.linkedin.com/in/malo-h-44253b113/">Malo Hamon</StyledAnchor>
						</StyledListItem>
						<StyledListItem>
							<StyledAnchor href="https://www.linkedin.com/in/locktonsam/">Sam Lockton</StyledAnchor>
						</StyledListItem>
						<StyledListItem>
							<StyledAnchor href="https://www.linkedin.com/in/si-cheng-40440bb7/">
								Si (Julia) Cheng
							</StyledAnchor>
						</StyledListItem>
					</StyledList>
				</FooterDiv>
				<FooterDiv>
					<LinksHeader>Links</LinksHeader>
					<StyledList>
						<StyledLink to="/">Home</StyledLink>
					</StyledList>
				</FooterDiv>
			</FooterWrapper>
		</StyledFooter>
	);
};

export default Footer;
