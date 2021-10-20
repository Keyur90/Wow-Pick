import { BrowserRouter as Router, Route } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

const basename = process.env.NODE_ENV === 'development' ? '' : '/wowpick';

const App = () => (
  <Router basename={basename}>
    <Route path="/">
      <MicroFrontend name="legacy" />
    </Route>
    <Route path="/picking">
      <MicroFrontend name="picking" />
    </Route>
  </Router>
);

export default App;
