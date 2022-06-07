import React, { createContext, useState } from 'react';
import { axiosInstance } from '../../routes/axiosConfig';
import { useHistory } from 'react-router-dom';
import { useBackdrop } from '../Backdrop';
 import {useAlert} from '../alertContext';

export const DataCotizarContext = createContext();

export const CotizarContext = ({ children }) => {
  const BaseUrl = process.env.REACT_APP_SERVICE_BASE_URL;

  const [budgetAuto, setBudgetAuto] = useState([]);
  const [budgetHogar, setBudgetHogar] = useState([]);
  const [budgetViaje, setBudgetViaje] = useState([]);
  const history = useHistory();
  const { setOpen } = useBackdrop();
  const {setOpenAlert, setMensaje} = useAlert();

  const generateBudgetAuto = async (modelData) => {
    const model = {
      p_insurance_broker_code: '11262',
      p_json_info: `{\"p_year\":${modelData.year},\"p_mark\":\"${modelData.mark}\",\"p_model\":\"${modelData.modelAuto}\",\"p_version\":\"${modelData.version}\",\"p_broker_office\":\"001001\",\"p_office_list\":\"001001\",\"p_partner_code\":\"11262\"}`,
    };
    setOpen(true);

    setTimeout( async () => {
      const response = await axiosInstance.post(
        BaseUrl + 'dbo/budgets/generate_budget_vehicle_portal',
        model
      );
      const responsePlansAsegPro = await axiosInstance.post(
        BaseUrl + 'dbo/planes_asesor/buscarPlanesAsesor',
        {
          "p_cod_prod": "AUTOMOVIL",
          "p_cod_asesor": "11262"
        }
      );
      // console.log(JSON.stringify(response.data.p_budget_id));
      setOpen(false);
      history.push(`/asegurapro/cotizador/cotizar/${response.data.p_budget_id}`);
      return response;
    }, 2500);

  };

  const generateBudgetHogar = async (office) => {
    const model = {
      p_insurance_broker_code: '11262',
      p_json_info: `{"p_broker_office":"${office}","p_office_list":"${office}","p_partner_code":"11262"}`,
    };
    setOpen(true);
    setTimeout( async () => {
      const response = await axiosInstance.post(
        BaseUrl + '/dbo/budgets/generate_budget_home_portal',
        model
      );
      const { p_budget_id } = response.data;
      setOpen(false);
      history.push(`/asegurapro/cotizador/cotizar/${p_budget_id}`);
      return p_budget_id;
    }, 2500);
  };

  const generateBudgetViaje = async (modelData) => {
      try{
       
    const fechaSalida = modelData.fechaSalida.slice(0,10).split('-');
    const fechaSalida2 = fechaSalida[2] + '/' +fechaSalida[1] + '/' + fechaSalida[0];
    const fechaLlegada = modelData.fechaLlegada.slice(0,10).split('-');
    const fechaLlegada2 = fechaLlegada[2] + '/' +fechaLlegada[1] + '/' + fechaLlegada[0];   
     
    let allAges = '';
     if (modelData.arrayEdades === ''){
       allAges = modelData.edadTitular
      
     }else{
      const arrayEdades =  modelData.arrayEdades.replaceAll('-',',');
      const arrayEdades2 = arrayEdades.replaceAll(',_','');   
      const arrayEdades3 = arrayEdades2.replaceAll('_','');
       allAges = modelData.edadTitular + ',' + arrayEdades3;
     
     }
  
    const model = {
      p_insurance_broker_code: '11262',
      p_json_info:`{\"p_departure_date\":\"${fechaSalida2}\",\"p_arrive_date\":\"${fechaLlegada2}\",\"p_origin_country\":"${modelData.paisOrigen}\",\"p_destination_region\":\"${modelData.regionDestino}\",\"p_ages_titu\":\"${modelData.edadTitular}\",\"p_ages\":\"${modelData.arrayEdades}\",\"p_broker_office\":\"${modelData.oficina}\",\"p_office_list\":\"${modelData.listaOficina}\",\"p_partner_code\":\"11262\",\"p_all_ages\":\"${allAges}\"}`,
                  
    };
    setOpen(true);

    const response = await axiosInstance.post(BaseUrl + '/dbo/budgets/generate_budget_travel_portal',
    //const response = await axiosInstance.post('https://segurospiramide.com/asg-api/dbo/budgets/generate_budget_travel_portal',
      model
    );
    console.log(JSON.stringify(response));
    setOpen(false);
    history.push(`/asegurapro/cotizador/cotizar/${response.data.p_budget_id}`);
    return response;
  } catch (e) {
    console.log(e)
    if (e.response.status === 400){
     
      const error  = e.response.data.split(':')[1].replaceAll('ORA-06512', '');
      // console.log(error);
      // alert(error);
      setOpenAlert(true);
      setMensaje(error);
      setOpen(false);
    }else {
      alert('error cotizando')
    }
    
    
  }
  };

  return (
    <DataCotizarContext.Provider
      value={{
        generateBudgetAuto,
        budgetAuto,
        setBudgetAuto,
        generateBudgetHogar,
        budgetHogar,
        setBudgetHogar,
        generateBudgetViaje,
        budgetViaje,
        setBudgetViaje,
      }}
    >
      {children}
    </DataCotizarContext.Provider>
  );
};
