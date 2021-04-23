import React from "react";
import ReactDOM from "react-dom";
import { MockedProvider } from '@apollo/react-testing';
import { render } from "./test-utils";


// The component AND the query need to be exported
import { DETAILS_POKEMONS, PokemonDetails } from '../pages/PokemonDetail';

const mocks = [
  {
    request: {
      query: DETAILS_POKEMONS,
      variables: {
        name: 'charmeleon'
      },
    },
    result: {
      data: {
        pokemon: {
          id: 132,
          name: "ditto",
          sprites: {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          },
          moves: [
            {
              move: {
                name: "transform"
              }
            }
          ],
          types: [
            {
              type: {
                name: "normal"
              }
            }
          ]
        },
      },
    },
  }
];

it("runs the mocked query", () => {
    render(
      <MockedProvider mocks={mocks}>
        <PokemonDetails />
      </MockedProvider>
    )
  
    // Run assertions on <MyQueryComponent/>
  });