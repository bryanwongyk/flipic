import styled from 'styled-components';
import theme from '../../Theme/theme';

const StyledNavHeader = styled.div`
	width: 100vw;
	height: ${theme.height.navBarMobile};
	background: ${theme.color.background.primary};
	z-index: 100;
`

const NavHeader = () => {
	return (
		<StyledNavHeader>
			<h1>Flipic</h1>
		</StyledNavHeader>
	);
};

export default NavHeader;
