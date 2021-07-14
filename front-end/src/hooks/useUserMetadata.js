import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useUserMetadata = () => {
	const { user, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	useEffect(() => {
		const getUserMetadata = async () => {
			const domain = 'dev-bwkc1q2n.us.auth0.com';

			try {
				const accessToken = await getAccessTokenSilently({
					audience: `https://${domain}/api/v2/`,
					scope: 'read:current_user',
				});
				setAccessToken(accessToken);

				const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

				const metadataResponse = await fetch(userDetailsByIdUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const { user_metadata } = await metadataResponse.json();
				console.log('GETTING USER METADATA');
				setUserMetadata(user_metadata);
			} catch (e) {
				console.log(e.message);
			}
		};

		getUserMetadata();
	}, []);
	return { userMetadata, accessToken, user };
};

export default useUserMetadata;
