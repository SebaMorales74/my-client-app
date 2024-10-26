import React, { useState } from 'react';
import '../styles/ClientForm.css';

const ClientForm = ({ onSubmit, clientData }) => {

  const [state, setState] = useState('none');
  const [errors, setErrors] = useState({});

  const [client, setClient] = useState(clientData || {
    rut: '',
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    telefono: '',
    status: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'rut':
        if (!value) error = 'RUT es requerido';
        else if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(value)) error = 'RUT no es válido, debe de ser en formato 11.111.111-1';
        break;
      case 'nombre':
        if (!value) error = 'Nombre es requerido';
        else if (!/^[A-Za-z\s]+$/.test(value)) error = 'Nombre solo debe contener letras y espacios';
        break;
      case 'apellido':
        if (!value) error = 'Apellido es requerido';
        else if (!/^[A-Za-z\s]+$/.test(value)) error = 'Apellido solo debe contener letras y espacios';
        break;
      case 'correo':
        if (!value) error = 'Correo es requerido';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Correo no es válido';
        break;
      case 'direccion':
        if (!value) error = 'Dirección es requerida';
        else if (!/^[A-Za-z0-9\s,.-]+$/.test(value)) error = 'Dirección contiene caracteres no válidos';
        break;
      case 'telefono':
        if (!value) error = 'Teléfono es requerido';
        else if (!/^\d{9,15}$/.test(value)) error = 'Teléfono debe ser numérico y tener entre 9 y 15 dígitos';
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    Object.keys(client).forEach((key) => {
      validateField(key, client[key]);
      if (errors[key]) formErrors[key] = errors[key];
    });

    if (Object.keys(formErrors).length === 0) {
      setState('loading');
      try {
        onSubmit(client);
        setState('success');
      } catch (error) {
        console.error(error);
        setState('error');
        setTimeout(function () {
          setState('none');
          window.location.reload();
        }, 100);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const removeToast = () => {
    setState('none');
    window.location.reload();
  };

  const HandleStatus = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="tag loading">
            <span>Cargando...</span>
            <svg onClick={removeToast} width={20} height={20} className='icon' data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="tag success">
            <span>Guardado con éxito</span>
            <svg onClick={removeToast} width={20} height={20} className='icon' data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="tag error">
            <span>Error al guardar</span>
            <svg onClick={removeToast} width={20} height={20} className='icon' data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HandleStatus />
      <input type="text" autoComplete='off' required name="rut" placeholder="RUT" value={client.rut} onChange={handleChange} pattern="\d{1,2}\.\d{3}\.\d{3}-[\dkK]" />
      {errors.rut && <span className="tag error">{errors.rut}</span>}
      <input type="text" autoComplete='off' required name="nombre" placeholder="Nombre" value={client.nombre} onChange={handleChange} pattern="[A-Za-z\s]+" />
      {errors.nombre && <span className="tag error">{errors.nombre}</span>}
      <input type="text" autoComplete='off' required name="apellido" placeholder="Apellido" value={client.apellido} onChange={handleChange} pattern="[A-Za-z\s]+" />
      {errors.apellido && <span className="tag error">{errors.apellido}</span>}
      <input type="email" autoComplete='off' required name="correo" placeholder="Correo" value={client.correo} onChange={handleChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
      {errors.correo && <span className="tag error">{errors.correo}</span>}
      <input type="text" autoComplete='off' required name="direccion" placeholder="Dirección" value={client.direccion} onChange={handleChange} pattern="[A-Za-z0-9\s,.-]+" />
      {errors.direccion && <span className="tag error">{errors.direccion}</span>}
      <input type="tel" autoComplete='off' required name="telefono" placeholder="Teléfono" value={client.telefono} onChange={handleChange} pattern="\d{9,15}" />
      {errors.telefono && <span className="tag error">{errors.telefono}</span>}
      <select name="status" autoComplete='off' required value={client.status} onChange={handleChange}>
        <option value={1}>Habilitado</option>
        <option value={0}>Deshabilitado</option>
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ClientForm;
