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

const MobileMenuWrapper = styled.div`
	position: fixed;
	z-index: 2000;
`;

const NavHeader = () => {
	const [mobileMenuShown, setMobileMenuShown] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuShown(prevState => !prevState);
		console.log(mobileMenuShown);
	};

	return (
		<NavHeaderDiv>
			<Link to="/">
				<LogoImg src={Logo} alt="Logo" />
			</Link>
			<Menu />
			<Hamburger toggleMobileMenu={toggleMobileMenu} />
			{mobileMenuShown ? (
				<MobileMenuWrapper>
					<Backdrop clickHandler={toggleMobileMenu} />
					<MobileMenu toggleMobileMenu={toggleMobileMenu} />
				</MobileMenuWrapper>
			) : null}
		</NavHeaderDiv>
	);
};

export default NavHeader;
