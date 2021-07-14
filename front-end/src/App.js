import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage/LandingPage';
// import Quiz from './components/pages/Quiz/Quiz';
import QuizContoller from './components/pages/Quiz/QuizContoller';
import CreatorDashboard from './components/pages/CreatorDashboard/CreatorDashboard';
import Layout from './components/Navigation/Layout/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingPage from './components/pages/LoadingPage/LoadingPage';

import useUserMetadata from './hooks/useUserMetadata';

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { accessToken } = useUserMetadata();

	if (isLoading) {
		return <LoadingPage />;
	}

	const routes = (
		<Switch>
			<Route path="/" exact component={LandingPage} />
			<Route path="/quiz/:quizId" render={(props) => <QuizContoller quizId={props}/>} />
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
