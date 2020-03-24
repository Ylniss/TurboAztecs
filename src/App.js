import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import MainMenu from './components/menu/MainMenu';
import ConnectMenu from './components/menu/ConnectMenu';
import LobbyMenu from './components/menu/LobbyMenu';

export default function App() {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/">
          <MainMenu />
        </Route>
        <Route path='/connect'>
          <ConnectMenu />
        </Route>
        <Route path='/lobby'>
          <LobbyMenu />
        </Route>
      </Switch>  
    </MemoryRouter>
  );
}