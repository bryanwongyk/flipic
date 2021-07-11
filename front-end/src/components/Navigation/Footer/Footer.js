import styled from 'styled-components';
import theme from '../../Theme/theme';

const StyledFooter = styled.div`
	align-items: center;
	text-align: center;
	background: ${theme.color.secondary};
	position: fixed;
	bottom: 0px;
	width: 100%;
`

const Footer = () => {
	return (
		<StyledFooter>Footer goes here</StyledFooter>
	);
};

export default Footer;
