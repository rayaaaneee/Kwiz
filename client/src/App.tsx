import Router from './router/router';
import Contexts from './components/contexts';

const App = (): JSX.Element => {
  return (
    <Contexts>
      <Router/>
    </Contexts>
  );
}

export default App;
