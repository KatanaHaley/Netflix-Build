import React from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen"
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const user = {
    name: 'sonny'
  };

  return (
    <div className="app">
      {/* <h1>Let's build Netflix!🚀</h1> */}
      <Router>
        {!user ? (
          <LoginScreen />
        ) : ( 
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
