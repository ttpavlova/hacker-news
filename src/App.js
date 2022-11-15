import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import News from './components/News';
import StoryPage from './components/StoryPage';
import { Layout, Affix } from 'antd';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Affix offsetTop={0}>
          <Header className="header">
            <div>Hacker News Clone</div>
          </Header>
        </Affix>
        <Content className="content">

          <Switch>
            <Route exact path="/">
              <News />
            </Route>
            <Route
              path="/news/:id"
              render={({ match }) => (
                <StoryPage id={match.params.id} />
              )}
            ></Route>
          </Switch>

        </Content>
        <Footer className="footer">
          <div>Original website: <a href="https://news.ycombinator.com/news" target="_blank">Hacker News</a></div>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
