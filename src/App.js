import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Main from './components/menu/Main';
import Connect from './components/menu/Connect';
import Lobby from './components/menu/Lobby';

function App() {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path='/connect'>
          <Connect />
        </Route>
        <Route path='/lobby'>
          <Lobby />
        </Route>
      </Switch>  
    </MemoryRouter>
  );
}

export default App;
