import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bp from '../../../Theme/breakpoints';
import AuthenticationButton from '../../../Auth/AuthenticationButton/AuthenticationButton';

const MenuNav = styled.nav`
	font-weight: bold;
	display: none;

	@media ${bp.sm} {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	margin-right: 60px;
`;

const Menu = () => {
	return (
		<MenuNav>
			<StyledLink to="/">Home</StyledLink>
			<StyledLink to="/demo">Demo</StyledLink>
			<AuthenticationButton>Get Started</AuthenticationButton>
		</MenuNav>
	);
};

export default Menu;
