import { Route, Switch, Redirect } from 'react-router-dom';
import  LandingPage  from './components/pages/LandingPage/LandingPage';
import  Quiz  from './components/pages/Quiz/Quiz';
import  CreatorDashboard  from './components/pages/CreatorDashboard/CreatorDashboard';
import Layout from './components/Navigation/Layout/Layout';

function App() {
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
