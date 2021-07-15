import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bp from '../../../Theme/breakpoints';
import AuthenticationButton from '../../../Auth/AuthenticationButton/AuthenticationButton';
import { useAuth0 } from '@auth0/auth0-react';
import NavItem from '../NavItem/NavItem';

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

const Menu = () => {
	const { isAuthenticated } = useAuth0();
	return (
		<MenuNav>
			<NavItem to="/">Home</NavItem>
			{isAuthenticated ? <NavItem link="/dashboard">Dashboard</NavItem> : null}
			<AuthenticationButton>Get Started</AuthenticationButton>
		</MenuNav>
	);
};

export default Menu;
