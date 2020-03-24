import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Main from './components/menu/MainMenu';
import Connect from './components/menu/ConnectMenu';
import Lobby from './components/menu/LobbyMenu';

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
