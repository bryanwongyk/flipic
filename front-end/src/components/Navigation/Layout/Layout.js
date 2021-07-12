import NavHeader from '../NavHeader/NavHeader';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import theme from '../../Theme/theme';

const StyledLayout = styled.div`
	width: 100%;
	min-height: 100vh;
`;

const StyledMain = styled.main`
	background: ${theme.color.background.primary};
`;

const Layout = ({ children }) => {
	return (
		<>
			<StyledLayout>
				<NavHeader />
				<StyledMain>{children}</StyledMain>
				<Footer />
			</StyledLayout>
		</>
	);
};

export default Layout;
