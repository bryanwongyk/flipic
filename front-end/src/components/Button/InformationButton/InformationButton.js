import styled from 'styled-components';
import theme from '../../Theme/theme';

const StyledButton = styled.button`
	background-color: transparent;
	color: ${theme.color.background.secondary};
	font-weight: bold;
	border: 1px solid white;
	border-radius: 50px;
	padding: 8px 12px;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
	transition: all 0.2s ease;

	&:hover {
		cursor: pointer;
		background-color: lightblue;
		color: ${theme.color.text.primary};
	}
`;

const InformationButton = ({ style, onClick }) => {
	return (
		<>
			<StyledButton style={style} onClick={onClick}>
				?
			</StyledButton>
		</>
	);
};
export default InformationButton;
