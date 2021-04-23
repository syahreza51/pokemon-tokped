import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MyPokemon } from '../src/component/pages/MyPokemon';
import { PokemonList } from '../src/component/pages/PokemonList';
import { Header } from '../src/component/layout/header'
import { PokemonDetails } from '../src/component/pages/PokemonDetail';

// import NoMatch from '../Page404';
import { default as ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './assets/css/bootstrap.min.css';
import './assets/css/App.css';

const { PUBLIC_URL } = process.env;

const apolloClient = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
});


ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <BrowserRouter basename={PUBLIC_URL}>
          <div>
            <Header />
            <div className='container content'>
              <Switch>
                <Route exact path={"/"} component={PokemonList} />
                <Route path={"/mypokemon"} component={MyPokemon} />
                <Route path={"/pokemon-detail/:id"} component={PokemonDetails} />
                {/* <Route  component={NoMatch}/> */}
              </Switch>
            </div>
          </div>
        </BrowserRouter>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
