import React, { useState } from "react";
import { Modal,Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import styled from '@emotion/styled'

export const DETAILS_POKEMONS = gql`
        query pokemon($name: String!) {
            pokemon(name: $name) {
                id
                name
                sprites {
                    front_default
                }
                moves {
                    move {
                    name
                    }
                }
                types {
                    type {
                    name
                    }
                }
            }
        }
    `;

export function PokemonDetails() 
{
    let params = useParams();
    const id = params.id;
    const Button = styled.button`
        padding: 10px;
        background-color: turquoise;
        font-size: 12px;
        width: 360px;
        border-radius: 4px;
        color: black;
        font-weight: bold;
        &:hover {
            color: white;
        }
    `
    const [state, setState] = useState({
        imgPreview: "",
        modalShow: false,
        modalNameShow: false,
        modalReleaseShow: false,
        isCatch: false,
        nickname: "",
        myData: {},
        isSame: false
    });
    
    
    const { loading, error, data } = useQuery(DETAILS_POKEMONS, {
        variables: {name: id && id},
    });
    if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

    const handleChange = (e) => {
        setState({
            ...state,
            nickname: e.target.value
        });
    }

    const handleShow = () => {
        setState({
            ...state,
            isCatch:Math.random() < 0.5,
            modalShow: false, 
            modalNameShow: true,
            nickname: id
        });
        
    }

    const saveMyPokemon = () => {
        let isSame = false;
        let local = localStorage.getItem("get_mypokemon_list");
        let mylist = local === null ? [] : JSON.parse(local);
        mylist.map((dt,i) => {
            if(dt.nickname === state.nickname){
                return isSame = true;
            }
        });
        if(isSame === false){
            let dataPokemon = {
                id: id,
                name: data.pokemon.name,
                nickname: state.nickname,
                image: data.pokemon.sprites.front_default
            };
    
            mylist = local === null ? [] : JSON.parse(local);
            let save = mylist.concat(dataPokemon);
        
            localStorage.setItem("get_mypokemon_list",JSON.stringify(save));
            setState({
                ...state,
                modalNameShow: false
            });
        }else{
            setState({
                ...state,
                isSame: true
            });
        }
    }

    return (
        <div>
            <h3>Pokemon Detail</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="col-md-12" style={{paddingLeft:"0",paddingRight:"0"}}>
                        <div className="box-img">
                        <img width="99%" src={ data.pokemon.sprites.front_default } />
                        </div>
                    </div>
                    <div style={{clear:"both"}}></div>
                    <div className="col-md-12 form-group"  style={{paddingLeft:"0",paddingRight:"0"}}>
                        <Button onClick={ () => { handleShow()}}>CATCH THIS POKEMON</Button>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="nickname-wrapper" style={{display:state.myData.nickname ? "block" : "none"}} >
                        <span className="nick-label">nickname</span>
                        <h3>{state.myData.nickname}</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="subtitle"><label>General Information</label></div>
                            <table className="table table-striped table-pokemondetail">
                                <tbody>
                                    <tr><th width="90">Name</th><td>{data.pokemon.name}</td></tr>
                                    <tr><th width="90">Type</th>
                                        <td>
                                        {
                                         data.pokemon.types.map((data) => {
                                            return (<span key={data.type.name} className="label label-info label-types">{data.type.name}</span>)
                                        })
                                        }
                                        </td></tr>
                                    <tr><th width="90">Weight</th><td>{data.pokemon.weight}</td></tr>
                                    <tr><th width="90">Height</th><td>{data.pokemon.height}</td></tr>
                                    <tr><th width="90">Base Exp</th><td>{data.pokemon.base_experience}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <div className="subtitle"><label>Moves</label></div>
                            <div className="table-move-wrapper">
                                <table className="table table-striped table-pokemondetail">
                                    <tbody>
                                            {
                                             data.pokemon.moves.map((data) => {
                                                return (<tr key={data.move.name} ><td>{data.move.name}</td></tr>)
                                            })
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal backdrop={"static"} keyboard={false} show={state.modalNameShow}  animation={false}>
                <Modal.Body>
                    <img className="img-catch-preview" src={data.pokemon.sprites.front_default}  width="30%" />
                    <div className="form-group form-nickname">
                        <label htmlFor="nickname">Give this pokemon name !</label>
                        <input type="text" onChange={ (e) => (handleChange(e))} value={state.nickname} className="form-control" placeholder="Enter Nickname" />
                        <span className="field-error" style={{display:state.nickname === "" ? "block" : "none"}}>nickname is required</span>
                        <span className="field-error" style={{display:state.isSame ? "block" : "none"}}>nickname is same</span>
                    </div>
                    <div className="form-group form-nickname">
                        <button  disabled={ state.nickname === "" ? true : false} onClick={() => (saveMyPokemon())}className="btn btn-success btn-nickname">Save</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
