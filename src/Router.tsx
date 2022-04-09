import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
  toggleTheme: () => void;
  isDark: boolean;
}

function Router({ toggleTheme, isDark }: IRouterProps) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} toggleTheme={toggleTheme} />
        </Route>
        <Route path="/">
          <Coins toggleTheme={toggleTheme} isDark={isDark} />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default Router