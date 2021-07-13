import styled from 'styled-components';
import theme from '../../Theme/theme';

const StyledButton = styled.button`
	background-color: ${theme.color.accent};
	color: ${theme.color.background.secondary};
	font-weight: bold;
	border: none;
	border-radius: 50px;
	padding: 8px 10px;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
	transition: all 0.2s ease;

	&:hover {
		cursor: pointer;
		background-color: ${theme.color.accentHover};
	}
`;

const PrimaryButton = ({ children, style, onClick }) => {
	return (
		<>
			<StyledButton style={style} onClick={onClick}>
				{children}
			</StyledButton>
		</>
	);
};
export default PrimaryButton;
