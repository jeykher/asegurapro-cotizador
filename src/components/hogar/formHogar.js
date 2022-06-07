import react, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import './form.css';
import { DataServicesContext } from '../../context/servicesContext/servicesContext';
import { DataCotizarContext } from '../../context/cotizarContext/cotizarContext';

const FormHogar = () => {
  const { getProductionOffice, oficeProduction, setOficeProduction } =
    useContext(DataServicesContext);
  const { generateBudgetHogar } = useContext(DataCotizarContext);
  const { register, handleSubmit } = useForm();
  const { itemIndex } = useParams();
  const validateInputs = () => {
    let simpleInputs = document.getElementsByClassName('info');
    for (let i = 0; i < simpleInputs.length; i++) {
      if (!simpleInputs[i].value) {
        simpleInputs[i].className += ' invalid';
      }
    }
  };

  const onSubmit = async (data) => {
    validateInputs();
    let office = "001001";
    sessionStorage.setItem(
      'userSessionInfo',
      JSON.stringify({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
      })
    );
    sessionStorage.setItem(
      'budgetView',
      '/hogar/'+ itemIndex
    );
    const p_budget_id = await generateBudgetHogar(office);
  };

  useEffect(() => {
    getProductionOffice();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('nombre')}
        required
        className="info"
        placeholder="Tu nombre"
      />
      <input
        {...register('telefono')}
        required
        className="info"
        placeholder="Teléfono"
        type="number"
      />
      <input
        {...register('email')}
        required
        className="info"
        placeholder="E-mail"
        type="email"
      />
      {/* <select {...register('oficinaProduccion')} required className="info">
        <option selected value="" disabled>
          Oficina de Producción
        </option>
        {oficeProduction &&
          oficeProduction.map((oficeProductions, index) => {
            return (
              <option key={index} value={oficeProductions.CODOFI}>
                {oficeProductions.NAMEOFI}
              </option>
            );
          })}
      </select> */}
      <button type="submit" onClick={validateInputs}>
        COTIZAR
      </button>
    </form>
  );
};

export default FormHogar;
