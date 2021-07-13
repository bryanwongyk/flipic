import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PrimaryButton from '../../Button/Primary/PrimaryButton';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	return <PrimaryButton onClick={() => loginWithRedirect()}>Get Started</PrimaryButton>;
};

export default LoginButton;
