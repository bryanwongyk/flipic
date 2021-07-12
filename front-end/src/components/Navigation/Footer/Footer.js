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
	margin-right: 60px;
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
						<StyledListItem>Alan Truong</StyledListItem>
						<StyledListItem>Bryan Wong</StyledListItem>
						<StyledListItem>Grady Tucker</StyledListItem>
						<StyledListItem>Malo Hamon</StyledListItem>
						<StyledListItem>Sam Lockton</StyledListItem>
						<StyledListItem>Si (Julia) Cheng</StyledListItem>
					</StyledList>
				</FooterDiv>
				<FooterDiv>
					<LinksHeader>Links</LinksHeader>
					<StyledList>
						<StyledLink to="/">Home</StyledLink>
						<StyledLink to="/demo">Demo</StyledLink>
						<StyledLink>Login</StyledLink>
					</StyledList>
				</FooterDiv>
			</FooterWrapper>
		</StyledFooter>
	);
};

export default Footer;
