import React from 'react';
import {useParams, Link} from 'react-router-dom'

const ClienteDetails = ({clients}) => {

    const {id} = useParams(); 
    const client = clients.find(client => client.id === parseInt(id));

    if(!client){
        return <p>Cliente no encontrado</p>
    }

    return (
        <div>
            <h2>Detalles del Cliente</h2>
            <p><strong>Id:</strong>{client.id}</p>
            <p><strong></strong>{client.rut}</p>
            <p><strong></strong>{client.nombre}</p>
            <p><strong></strong>{client.apellido}</p>
            <p><strong></strong>{client.correo}</p>
            <p><strong></strong>{client.direccion}</p>
            <p><strong></strong>{client.telefono}</p>
            <p><strong></strong>{client.status === 1 ? 'Habilitado' : 'Deshabilitado'}</p>
            <Link to="/client-list">Volver a la lista de clientes</Link>
        </div>
    );
};
export default ClienteDetails;