import React from 'react';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import AdminPanelCore from './modules/admin_panel/AdminPanelCore'
import ShopCore from './modules/shop/ShopCore'
import UserProfileCore from './modules/user_profile/UserProfileCore'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ShopCore} />
          <Route exact path="/Admin" component={AdminPanelCore} />
          <Route exact path="/User" component={UserProfileCore} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
