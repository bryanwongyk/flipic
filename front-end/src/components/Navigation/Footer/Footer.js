import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../Theme/theme';

const StyledFooter = styled.div`
	align-items: center;
	text-align: center;
	background: ${theme.color.secondary};
	width: 100%;
	padding-top: 48px;
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
	font-weight: bold;
	padding-left: 0;
	padding-bottom: 16px;
`;

const StyledListItem = styled.li`
	margin-bottom: 16px;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${theme.color.background.secondary};
	margin-bottom: 16px;
`;

const StyledPara = styled.p`
	margin: 16px 0;
	color: ${theme.color.background.secondary};
	font-weight: bold;
`;

const LinksHeader = styled.h3`
	color: ${theme.color.background.secondary};
	margin-bottom: 24px;
	font-size: 2rem;
`;

const Footer = () => {
	return (
		<StyledFooter>
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
			<LinksHeader>Links</LinksHeader>
			<StyledList>
				<StyledLink to="/">Home</StyledLink>
				<StyledLink to="/demo">Demo</StyledLink>
				<StyledLink>Login</StyledLink>
			</StyledList>
		</StyledFooter>
	);
};

export default Footer;
