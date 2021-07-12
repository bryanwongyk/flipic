import Logo from '../../../assets/svgs/logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu/Menu';
import MobileMenu from './MobileMenu/MobileMenu';
import Hamburger from './MobileMenu/Hamburger';
import Backdrop from './Backdrop/Backdrop';
import styled from 'styled-components';
import theme from '../../Theme/theme';

const NavHeaderDiv = styled.div`
	height: ${theme.height.navBarMobile};
	background: ${theme.color.background.primary};
	z-index: 100;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const LogoImg = styled.img`
	width: 120px;
`;

const NavHeader = () => {
	const [mobileMenuShown, setMobileMenuShown] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuShown(prevState => !prevState);
	};

	return (
		<NavHeaderDiv>
			<Link to="/">
				<LogoImg src={Logo} alt="Logo" />
			</Link>
			<Menu />
			<Hamburger toggleMobileMenu={toggleMobileMenu} />
			{mobileMenuShown ? (
				<div>
					<Backdrop clickHandler={toggleMobileMenu} />
					<MobileMenu toggleMobileMenu={toggleMobileMenu} />
				</div>
			) : null}
		</NavHeaderDiv>
	);
};

export default NavHeader;
