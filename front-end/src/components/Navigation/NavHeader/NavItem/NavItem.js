import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../Theme/theme';

const StyledLi = styled.li`
	list-style: none;
`;

const StyledNavLink = styled(Link)`
	text-decoration: none;
	color: ${theme.color.text};
	margin-right: 60px;
	transition: all 0.2s ease;

	&:hover {
		opacity: 0.7;
	}
`;

const NavItem = ({ link, children }) => (
	<StyledLi>
		<StyledNavLink to={link} exact="true">
			{children}
		</StyledNavLink>
	</StyledLi>
);

export default NavItem;
