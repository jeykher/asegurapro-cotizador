import react, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './form.css';
import { DataServicesContext } from '../../context/servicesContext/servicesContext';
import { DataCotizarContext } from '../../context/cotizarContext/cotizarContext';
import { useParams } from 'react-router';


const FormAuto = () => {
  const { generateBudgetAuto, setBudgetAuto, budgetAuto } =
    useContext(DataCotizarContext);

  const {
    getYears,
    setYears,
    years,
    getMarks,
    setMarks,
    marks,
    getModels,
    setModels,
    models,
    getVersions,
    setVersions,
    versions,
    getProductionOffice,
    oficeProduction,
    setOficeProduction,
  } = useContext(DataServicesContext);
  const { itemIndex } = useParams();

  useEffect(() => {
    getYears();
    getProductionOffice();
  }, []);

  const [yearSelected, setYearSelected] = useState('');
  const [markSelected, setMarkSelected] = useState('');
  const [modelSelected, setModelSelected] = useState('');

  const { register, handleSubmit } = useForm();

  const validateInputs = () => {
    let simpleInputs = document.getElementsByClassName('info');
    for (let i = 0; i < simpleInputs.length; i++) {
      if (!simpleInputs[i].value) {
        simpleInputs[i].className += ' invalid';
      }
    }
  };

  const onSubmit = (data) => {
    validateInputs();
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
      '/auto/'+ itemIndex
    );
    
    const model = {
      year: data.year,
      mark: data.marca,
      modelAuto: data.modelo,
      version: data.version,
      office: "001001",
    };
    const budgetId = generateBudgetAuto(model);
  };

  const selectYear = (e) => {
    setYearSelected(e.target.value);
    getMarks(e.target.value);
  };

  const selectMark = (e) => {
    setMarkSelected(e.target.value);
    getModels(yearSelected, e.target.value);
  };

  const selectModel = (e) => {
    setModelSelected(e.target.value);
    getVersions(yearSelected, markSelected, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register('year')}
        className="info"
        onChange={selectYear}
        required
      >
        {years &&
          years.map((year, index) => {
            return (
              <option key={index} value={year.VALOR}>
                {year.DESCRIP}
              </option>
            );
          })}
      </select>
      <select
        {...register('marca')}
        className="info"
        onChange={selectMark}
        required
      >
        {marks &&
          marks.map((mark, index) => {
            return (
              <option key={index} value={mark.VALOR}>
                {mark.DESCRIP}
              </option>
            );
          })}
      </select>
      <select
        {...register('modelo')}
        className="info"
        onChange={selectModel}
        required
      >
        {models &&
          models.map((model, index) => {
            return (
              <option key={index} value={model.VALOR}>
                {model.DESCRIP}
              </option>
            );
          })}
      </select>
      <select {...register('version')} className="info" required>
        {versions &&
          versions.map((version, index) => {
            return (
              <option key={index} value={version.VALOR}>
                {version.DESCRIP}
              </option>
            );
          })}
      </select>
      <input
        {...register('nombre')}
        className="info"
        required
        placeholder="Tu nombre"
      />
      <input
        {...register('telefono')}
        className="info"
        required
        placeholder="Teléfono"
        type="number"
      />
      <input
        {...register('email')}
        className="info"
        required
        placeholder="E-mail"
        type="email"
      />
      {/* <select {...register('oficinaProduccion')} className="info" required>
        <option selected disabled value="">
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

export default FormAuto;
