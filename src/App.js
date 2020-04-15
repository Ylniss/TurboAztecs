import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import MainMenu from './components/menu/MainMenu';
import ConnectMenu from './components/menu/ConnectMenu';
import LobbyMenu from './components/menu/lobby/LobbyMenu';
import { Table } from './components/game/table/Table';
import { GlobalProvider } from './context/GlobalState';

export default function App() {
  return (
    <GlobalProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path='/'>
            <MainMenu />
          </Route>
          <Route path='/connect'>
            <ConnectMenu />
          </Route>
          <Route path='/lobby'>
            <LobbyMenu />
          </Route>
          <Route path='/game'>
            <Table />
          </Route>
        </Switch>
      </MemoryRouter>
    </GlobalProvider>
  );
}
