import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import News from './components/News';
import StoryPage from './components/StoryPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <News />
        </Route>
        <Route
          path="/news/:id"
          render={({ match }) => (
          <StoryPage id={match.params.id} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
