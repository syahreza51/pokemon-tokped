import React from "react";
import ReactDOM from "react-dom";
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';


// The component AND the query need to be exported
import { GET_POKEMONS, PokemonList } from '../pages/PokemonList';

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        limit: 10,
        offset: 1,
      },
    },
    result: {
      data: {
        pokemons: { 
            count: '1', 
            next: 'Buck', 
            next: "https://pokeapi.co/api/v2/pokemon/?offset=3&limit=2",
            previous: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1",
            nextOffset: 3,
            prevOffset: 0,
            status: true,
            message: "",
            results: [
                {
                url: "https://pokeapi.co/api/v2/pokemon/2/",
                name: "ivysaur",
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                },
                {
                url: "https://pokeapi.co/api/v2/pokemon/3/",
                name: "venusaur",
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
                }
            ] 
        },
      },
    },
  },
];

it("runs the mocked query", () => {
    render(
      <MockedProvider mocks={mocks}>
        <PokemonList />
      </MockedProvider>
    )
  
    // Run assertions on <MyQueryComponent/>
  });