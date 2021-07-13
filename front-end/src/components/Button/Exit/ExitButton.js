import styled from 'styled-components';
import theme from '../../Theme/theme';

const StyledButton = styled.button`
	background-color: transparent;
	color: ${theme.color.background.secondary};
	font-size: 32px;
	border: none;
	border-radius: 50px;
	padding: 8px 10px;
	transition: all 0.2s ease;

	&:hover {
		cursor: pointer;
		color: ${theme.color.accent};
	}
`;

const ExitButton = ({ style, onClick }) => {
	return (
		<>
			<StyledButton style={style} onClick={onClick}>
				X
			</StyledButton>
		</>
	);
};
export default ExitButton;
