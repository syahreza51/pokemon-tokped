import React, {useEffect, useState} from "react";
import { Modal,Button } from 'react-bootstrap';

export function MyPokemon() 
{
    const [state, setState] = useState({
        modalReleaseShow: false,
        imgRelease: "",
    });
    const [dataList, setDataList] = useState();
    
    const fetchMyPokemon = () => {
        let data = localStorage.getItem("get_mypokemon_list");
        let mylist = data === null ? [] : JSON.parse(data);
        setDataList(mylist);
    }

    useEffect(() => {
        fetchMyPokemon();
    },[]);
    
    const handleReleaseShow = (event, id) => {
        setState({
            ...state,
            modalReleaseShow: true, 
            imgRelease: event.target.attributes['data-image'].value,
            idRelease: id
        });
    }
    
    const handleReleaseHide = () => {
        setState({
            ...state,
            modalReleaseShow: false, 
        });
    }

    const releaseMyPokemon = () => {
        let local = localStorage.getItem("get_mypokemon_list");
        let mylist = local === null ? [] : JSON.parse(local);
        let remove = -1;
        mylist.map((dt,i) => {
            if(dt.nickname === state.idRelease)
                remove = i;
        });

        mylist.splice(remove,1);
        localStorage.setItem("get_mypokemon_list", JSON.stringify(mylist));

        setState({
            ...state,
            modalReleaseShow: false,
            imgRelease: "",
            idRelease: -1 
        });
        fetchMyPokemon();
    }
    
    return (
        <div>
            <h3>I have {dataList && dataList.length} Pokemon</h3>
            <div className="row">
                <table className="table table-striped table-pokemondetail">
                    <tbody>
                        { dataList && dataList.map((data, index) => (
                            <tr key={index}>
                                <td className="middle" width="40"><img height="45" src={data.image} /></td>
                                <td className="middle" >
                                <div className="name-label-list">{data.name}</div>
                                <div className="nickname-label-list">{data.nickname}</div>
                                </td>
                                <td width="90" >
                                <button className="btn-release-list btn btn-danger" data-image={data.image} data-id={data.id} 
                                    onClick={(e) => {
                                        handleReleaseShow(e, data.nickname)
                                    }} 
                                >
                                    RELEASE
                                </button>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
            </div>
            {state.modalReleaseShow ? (
                <Modal show={state.modalReleaseShow}  animation={false}>
                    <Modal.Header>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className="img-catch-preview" src={state.imgRelease}  width="30%" />
                        <p>You will lose your pokemon!!!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => (handleReleaseHide())}>Cancel</Button>
                        <Button variant="danger" onClick={() => (releaseMyPokemon())}>Release</Button>
                    </Modal.Footer>
                </Modal>
            ): null}
        </div>
    );
}