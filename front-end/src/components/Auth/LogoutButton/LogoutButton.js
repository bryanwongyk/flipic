import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PrimaryButton from '../../Button/Primary/PrimaryButton';

const LogoutButton = () => {
	const { logout } = useAuth0();
	return (
		<PrimaryButton
			onClick={() =>
				logout({
					returnTo: window.location.origin,
				})
			}
		>
			Log Out
		</PrimaryButton>
	);
};

export default LogoutButton;
