import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useBackdrop } from '../Backdrop';

export const DataServicesContext = createContext();

export const ServicesContext = ({ children }) => {
  const BaseUrl = process.env.REACT_APP_SERVICE_BASE_URL;
  let contador = 0
  const [years, setYears] = useState([]);
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [oficeProduction, setOficeProduction] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const { setOpen } = useBackdrop();

  const getYears = async () => {
    const initialValueMark = {
      DESCRIP: 'Marca',
      VALOR: '',
    };
    const initialValueModel = {
      DESCRIP: 'Modelo',
      VALOR: '',
    };
    const initialValueVersion = {
      DESCRIP: 'Versión',
      VALOR: '',
    };
    const initialValueYear = {
      DESCRIP: 'Año',
      VALOR: '',
    };
    setMarks([initialValueMark]);
    setModels([initialValueModel]);
    setVersions([initialValueVersion]);
    setOpen(true);
    const response = await axios.post(BaseUrl + '/dbo/budgets/get_years');
    response.data.p_years.unshift(initialValueYear);
    setYears(response.data.p_years);
    setOpen(false);
    return response;
  };

  const getMarks = async (year) => {
    setOpen(true);
    setMarks([0]);
    setModels([0]);
    setVersions([0]);

    const model = {
      p_year: year,
    };
    const response = await axios.post(
      BaseUrl + '/dbo/budgets/get_marks',
      model
    );

    const initialValue = {
      DESCRIP: 'Marca',
      VALOR: '',
    };
    response.data.p_marks.unshift(initialValue);
    setMarks(response.data.p_marks);
    setOpen(false);
    return response;
  };

  const getModels = async (year, mark) => {
    setOpen(true);
    setModels([0]);
    setVersions([0]);
    const model = {
      p_year: year,
      p_mark: mark,
    };
    const response = await axios.post(
      BaseUrl + '/dbo/budgets/get_models',
      model
    );
    const initialValue = {
      DESCRIP: 'Modelo',
      VALOR: '',
    };
    response.data.p_models.unshift(initialValue);
    setModels(response.data.p_models);
    setOpen(false);
    return response;
  };

  const getVersions = async (year, mark, carModel) => {
    setOpen(true);
    setVersions([0]);
    const model = {
      p_year: year,
      p_mark: mark,
      p_model: carModel,
    };
    const response = await axios.post(
      BaseUrl + '/dbo/budgets/get_versions',
      model
    );
    const initialValue = {
      DESCRIP: 'Versión',
      VALOR: '',
    };
    response.data.p_versions.unshift(initialValue);
    setVersions(response.data.p_versions);
    setOpen(false);
    return response;
  };

  const getProductionOffice = async () => {
    const model = {
      p_insurance_broker_code: null,
      p_codinter: 11262,
    };
    const response = await axios.post(
      BaseUrl + 'dbo/insurance_broker/get_office_broker',
      model
    );
    setOficeProduction(response.data.p_cur_office);

    return response;
  };

  const getOrigin = async () => {
    const response = await axios.post(BaseUrl + 'dbo/budgets/get_origin');
    setOrigins(response.data.p_origin);
    return response;
  };

  const getDestination = async () => {
    const response = await axios.post(BaseUrl + 'dbo/budgets/get_destination');
    // console.log(JSON.stringify(response.data.p_destination))
    setDestinations(response.data.p_destination);
    return response;
  };

  const login = async () => {
   
    sessionStorage.removeItem('TOKEN');
    const model = {
      p_portal_username: 'PMICA0874',
      p_pwd: 'Miguel08*',
    };
    const response = await axios.post(BaseUrl + '/login', model);
    sessionStorage.setItem('TOKEN', response.data.token);
    return response;
  };

  const sendMailHide = async (dataForm,sent,hideBackdrop) => {
    if(!sent) {
      if(hideBackdrop) setOpen(true);
      const response = await axios.post(BaseUrl + 'send_mail', dataForm);
      if(hideBackdrop) setOpen(false);
      return response;
  }
  };

  const sendMail = async (dataForm,sent) => {
    if(!sent) {
      setOpen(true);
      const response = await axios.post(BaseUrl + 'send_mail', dataForm);
      console.log(response);
      setOpen(false);
      return response;
  }
  };

  return (
    <DataServicesContext.Provider
      value={{
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
        getOrigin,
        origins,
        setOrigins,
        getDestination,
        destinations,
        setDestinations,
        login,
        sendMail,
        sendMailHide
      }}
    >
      {children}
    </DataServicesContext.Provider>
  );
};
