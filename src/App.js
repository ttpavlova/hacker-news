import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import News from './components/News';
import Story from './components/Story';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/news">
            <News />
          </Route>
          <Route path="/news/:id">
            <Story />
          </Route>
          <Route path="/">
            <News />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
