import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Button/Primary/PrimaryButton.js';
import styled from 'styled-components';
import bp from '../../../Theme/breakpoints';

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
			<PrimaryButton>Get Started</PrimaryButton>
		</MenuNav>
	);
};

export default Menu;
