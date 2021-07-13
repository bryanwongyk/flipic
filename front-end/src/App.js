import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage/LandingPage';
import Quiz from './components/pages/Quiz/Quiz';
import CreatorDashboard from './components/pages/CreatorDashboard/CreatorDashboard';
import Layout from './components/Navigation/Layout/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingPage from './components/pages/LoadingPage/LoadingPage';

function App() {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <LoadingPage />;
	}

	const routes = (
		<Switch>
			<Route path="/" exact component={LandingPage} />
			<Route path="/quiz" component={Quiz} />
			<Route path="/dashboard" component={CreatorDashboard} />
			<Redirect to="/" />
		</Switch>
	);

	return (
		<>
			<Layout>{routes}</Layout>
		</>
	);
}

export default App;
