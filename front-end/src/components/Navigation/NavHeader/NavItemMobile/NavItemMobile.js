import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../Theme/theme';

const StyledLi = styled.li`
	list-style: none;
	width: 100%;
	background-color: ${theme.color.background.secondary};

	&:hover {
		background-color: lightgrey;
	}
`;

const StyledNavLink = styled(Link)`
	margin: 10px 0;
	box-sizing: border-box;
	display: block;
	width: 100%;
	color: ${theme.color.text};
	text-decoration: none;
	text-align: center;
	font-style: normal;
	font-weight: 500;
	font-size: 1.4em;
	line-height: 2.5em;
`;

const NavItemMobile = ({ link, toggle, children }) => (
	<StyledLi>
		<StyledNavLink to={link} exact="true" onClick={() => (toggle ? toggle : null)}>
			{children}
		</StyledNavLink>
	</StyledLi>
);

export default NavItemMobile;
