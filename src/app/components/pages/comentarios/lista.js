import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import ReactToPrint from "react-to-print";


const thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal"
};





class ComponentToPrint extends React.Component {

    state = {
        lista: []
    };


    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get("https://app-bucetas.herokuapp.com/api/comentario", {
            headers: {
                'token': token
            }
        })
            .then(response => {
                this.setState({ lista: response.data.comentarioAll });
                console.log(response.data.comentarioAll)
            })
    }

    render() {
        return (
            <table className="table table-bordered table-striped table-hover table-sm">
                <thead>

                    <tr>
                        <th ></th>
                        <th ></th>
                        <th >
                            <h6 className="text-center">Servicio de Transporte Escolar E Institucional</h6>
                            <h6 className="text-center">Universidad Técnica del Norte</h6>
                            <h6 className="text-center">Lista de Comentarios</h6>
                        </th>
                        <th ></th>
                    </tr>
                    <tr>
                        <th >#</th>
                        <th >Cedula Estudiante</th>
                        <th >Descripcion</th>
                        <th >Grado de Sadisfaccion</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.lista.map(lista => {
                        return (
                            <tr>
                                <td>{lista.id_comentario}</td>
                                <td>{lista.cedula_estudiante}</td>
                                <td>{lista.descripcion}</td>
                                <td>{lista.gradosatisfacion}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        );
    }
}




class Comentario extends React.Component {

    render() {
        return (

            <div >
                <h3 className="text-center">Comentarios</h3>
                <hr className="my-3" />
                <ReactToPrint
                    trigger={() => <button className="btn btn-info">Descagar en PDF</button>}
                    content={() => this.componentRef}
                />
                <br /><br />

                <ComponentToPrint ref={(el) => (this.componentRef = el)} />
            </div>

        );

    }
}

export default Comentario;