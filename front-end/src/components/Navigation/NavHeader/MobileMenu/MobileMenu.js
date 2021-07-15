import NavItemMobile from '../NavItemMobile/NavItemMobile';
import theme from '../../../Theme/theme';
import styled from 'styled-components';
import Logo from '../../../../assets/svgs/logo.svg';
import { Link } from 'react-router-dom';
import AuthenticationButton from '../../../Auth/AuthenticationButton/AuthenticationButton';
import { useAuth0 } from '@auth0/auth0-react';

const StyledNav = styled.nav`
	background: ${theme.color.background.secondary};
	position: fixed;
	top: 0;
	left: 0;
	width: 50vw;
	height: 100vh;
	z-index: 100;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 8%;
`;

const ButtonWrapper = styled.div`
	margin-top: 20px;
`;

const StyledLogoImg = styled.img`
	margin-bottom: 16px;
`;

const MobileMenu = ({ toggleMobileMenu }) => {
	const { isAuthenticated } = useAuth0();
	return (
		<StyledNav>
			<Link to="/" onClick={toggleMobileMenu}>
				<StyledLogoImg src={Logo} alt="Logo" />
			</Link>
			<NavItemMobile link="/" toggle={toggleMobileMenu} exact={true}>
				Home
			</NavItemMobile>
			{isAuthenticated ? (
				<NavItemMobile link="/dashboard" toggle={toggleMobileMenu} exact={true}>
					Dashboard
				</NavItemMobile>
			) : null}
			<ButtonWrapper>
				<AuthenticationButton />
			</ButtonWrapper>
		</StyledNav>
	);
};

export default MobileMenu;
