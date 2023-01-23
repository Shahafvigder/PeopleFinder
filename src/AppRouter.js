import React from "react";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorites } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import nationsReducer from "redux/reducers/nationsReducer";
import favoritesReducers from "redux/reducers/favoritesReducers";
import pageNumberReducer from "redux/reducers/pageNumberReducer";

const store = configureStore({
  reducer:{
    nations : nationsReducer,
    favoritesUsers : favoritesReducers,
    pageNum : pageNumberReducer 
  }
})

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default AppRouter;
