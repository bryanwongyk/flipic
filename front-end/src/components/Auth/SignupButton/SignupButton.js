import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PrimaryButton from '../../Button/Primary/PrimaryButton';

const SignupButton = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<PrimaryButton
			onClick={() =>
				loginWithRedirect({
					screen_hint: 'signup',
				})
			}
		>
			Sign Up
		</PrimaryButton>
	);
};

export default SignupButton;
