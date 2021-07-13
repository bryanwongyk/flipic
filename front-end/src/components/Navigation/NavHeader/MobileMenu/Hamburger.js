import styled from 'styled-components';
import bp from '../../../Theme/breakpoints';

const HamburgerButton = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 32px;
	width: 32px;

	background-color: transparent;
	border: none;

	&:hover {
		cursor: pointer;
	}

	@media ${bp.sm} {
		display: none;
	}
`;

const HamburgerBar = styled.span`
	width: 32px;
	height: 3px;
	background-color: black;
`;

const Hamburger = ({ toggleMobileMenu }) => {
	return (
		<HamburgerButton onClick={toggleMobileMenu}>
			<HamburgerBar />
			<HamburgerBar />
			<HamburgerBar />
		</HamburgerButton>
	);
};

export default Hamburger;
