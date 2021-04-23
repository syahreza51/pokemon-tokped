import React, { useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import styled from '@emotion/styled'

export const GET_POKEMONS = gql`
        query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
                results {
                    url
                    name
                    image
                }
            }
        }
    `;

export function PokemonList() {
    const Button = styled.button`
        padding: 10px;
        background-color: turquoise;
        font-size: 12px;
        border-radius: 4px;
        color: black;
        font-weight: bold;
        &:hover {
            color: white;
        }`
    
    const [gqlVariables, setGqlVariables] = useState({
        limit: 10,
        offset: 1,
    });
    
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: gqlVariables,
      });
    
      if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
    
    return (
    <div>
        <h3>Pokemons Total {data.pokemons.count} </h3>
        <table className="table table-striped table-pokemondetail">
            <tbody>
            {
                data.pokemons.results.map((data, index)  =>
                {
                    let split = data.url.split("/");
                    let id = split[split.length - 2];
                    return (
                    <tr key={index}>
                        <td className="middle" width="20"><a className="td_id">{id-1}</a></td>
                        <td className="middle" width="40"><img height="45" src={data.image} /></td>
                        <td className="middle" >{data.name}</td>
                        <td className="middle" width="40">
                            <Link to={`/pokemon-detail/${data.name}`}>
                                <Button
                                    type="button"
                                >
                                    <i className="fa fa-arrow-left"></i>
                                    Catch
                                </Button>
                            </Link>
                        </td>
                    </tr> )
                })
            }
            </tbody>
        </table>
        <div className="form-group row">
            <div className="col-lg-6">
                <button
                    type="button"
                    onClick={()=>{
                        if(data.pokemons.results.length < data.pokemons.count)
                            setGqlVariables({
                                limit: gqlVariables.limit + 10,
                                // offset: gqlVariables.offset + 10
                            });
                        }}
                    className="btn btn-light"
                >
                    <i className="fa fa-arrow-left"></i>
                    Load More
                </button>
            </div>
        </div>
    </div>
    );

}