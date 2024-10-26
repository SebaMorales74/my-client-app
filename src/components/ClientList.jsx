import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/ClientList.css';

const ClientList = ({ clients, onDelete }) => {

  const handleDelete = (id) => {
    onDelete(id);
  }

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.rut}</td>
              <td>{client.nombre}</td>
              <td>{client.apellido}</td>
              <td>{client.correo}</td>
              <td>{client.status === 1 ? 'Habilitado' : 'Deshabilitado'}</td>
              <td>
                <Link to={`/edit-client/${client.id}`}>Editar</Link>
                <button onClick={() => handleDelete(client.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
