import React from 'react';
import ClientForm from './ClientForm';

const EditClient = ({ client, editClient }) => {
  const handleSubmit = (updatedClient) => {
    editClient(updatedClient);
  };

  return (
    <div>
      <h2>Editar Cliente</h2>
      <ClientForm clientData={client} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditClient;