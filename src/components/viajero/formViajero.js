import react, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import './form.css';
import InputStyle from '../tools/InputStyle';
import { DataServicesContext } from '../../context/servicesContext/servicesContext';
import { DataCotizarContext } from '../../context/cotizarContext/cotizarContext';
import ModalAlert from '../tools/alertModal';
import AgesFormat from '../../components/tools/AgesFormat';
import { useAlert } from '../../context/alertContext';

const FormViajero = () => {
  const {
    getOrigin,
    origins,
    setOrigins,
    getDestination,
    destinations,
    setDestinations,
    getProductionOffice,
    oficeProduction,
    setOficeProduction,
  } = useContext(DataServicesContext);
  const { itemIndex } = useParams();

  const { generateBudgetViaje } = useContext(DataCotizarContext);
  const { openAlert, setOpenAlert } = useAlert();

  const { register, handleSubmit } = useForm();
  const [edades, setEdades] = useState();

  const [valorEdades , setValorEdades ] = useState();
  const [fechaSalida , setFechaSalida ] = useState("");
  const [fechaActual , setFechaActual ] = useState("");
  const [edadesVacio,setEdadesVacio] = useState("")
  const [descriptOriginCountry, setDescriptOriginCountry] = useState("");
  const [destinationRegion, setDestinationRegion] = useState("");

  const validateInputs = () => {
   
    let simpleInputs = document.getElementsByClassName('info');
    let inputDates = document.getElementsByClassName('MuiOutlinedInput-input');
    for (let i = 0; i < simpleInputs.length; i++) {
      if (!simpleInputs[i].value) {
        simpleInputs[i].className += ' invalid';
      }
    }

    for (let i = 0; i < inputDates.length; i++) {
      if (!inputDates[i].value) {
        inputDates[i].className += ' invalid-dates';
      }
    }
  };

  const setMinDate = (e) =>{
    setFechaSalida(e.target.value)
  }
  const onSubmit = (data) => {
    validateInputs();


   // return;
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
      '/viajero/'+ itemIndex
    );
    const model = {

      fechaSalida:data.fechaSalida,
      fechaLlegada:data.fechaLlegada,
      paisOrigen:data.paisOrigen.split('$')[0],
      regionDestino:data.RegionDestino.split('$')[0],
      edadTitular:data.edadTitular,
      oficina : "001001",        
      listaOficina : "001001",
      // arrayEdades: edades      
  };    
  console.log(model)
    if(edades === undefined){
      setEdadesVacio('')
      model.arrayEdades = edadesVacio
    }else{
      model.arrayEdades = edades
    }  
    
 //console.log('ver valor de MODEL  ' + model)

    sessionStorage.setItem(
      'userSessionViajero',
      JSON.stringify({
        paisOrigen: descriptOriginCountry,
        regionDestino:destinationRegion,
        edadTitular: data.edadTitular,
        edades:edades,
        fechaSalida:data.fechaSalida,
        fechaLlegada:data.fechaLlegada
      })
    ); 

     //console.log(sessionStorage.getItem('userSessionViajero'))
    // return;

    generateBudgetViaje(model)
  };

  useEffect(() => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear()

    if (dd<10){
      dd="0"+dd
    }
    
    if (mm<10){
      mm="0"+mm
    }

    today = yyyy +"-"+mm+"-"+dd;
    setFechaActual(today)

    getOrigin();
    getDestination();
    getProductionOffice();
  }, []);

  const selectOriginCountry = (e) => {
    console.log('toco' + e.target.value.split('$')[1])
    setDescriptOriginCountry(e.target.value.split('$')[1]);
    // getVersions(yearSelected, markSelected, e.target.value);
  };

  const selectDestinationRegion = (e) =>{
    // console.log('toco' + e.target.value.split('$')[1])
    console.log('toco' + e.target.value.split('$')[1]);
    setDestinationRegion(e.target.value.split('$')[1]);
  }

  return (
    <>

      <ModalAlert />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputStyle>
          <select {...register('paisOrigen')} className="info" required
                     onChange={selectOriginCountry}

          >
            <option selected value="" disabled>
              Pais Origen
            </option>
            {origins &&
              origins.map((origin, index) => {
                return (
                  <option key={index} value={origin.VALOR + '$' + origin.DESCRIPCION }>
                    {origin.DESCRIPCION}
                  </option>
                );
              })}
          </select>

          <select {...register('RegionDestino')} className="info" required
           onChange={selectDestinationRegion}
          >
            <option selected value="" disabled>
              Region Destino
            </option>
            {destinations &&
              destinations.map((destination, index) => {
                return (
                  <option key={index} value={destination.VALOR + '$' +  destination.DESCRIPCION}>
                    {destination.DESCRIPCION}
                  </option>
                );
              })}
          </select>
        </InputStyle>

        <InputStyle>
          <label for="Salida">Salida:</label>
          <input
            {...register('fechaSalida')}
            type="date"
            className="info"
            onChange={setMinDate}
            min= {fechaActual}
            required
          />

          <label for="Llegada">Llegada:</label>
          <input
            {...register('fechaLlegada')}
            type="date"
            required
            min={fechaSalida}
            className="info"
          />
        </InputStyle>

    

        <input
          {...register('edadTitular')}
          required
          className="info"
          placeholder="Edad Titular"
          type="number"
        />
        <AgesFormat setEdades={setEdades} />
        <input
          {...register('nombre')}
          required
          placeholder="Tu nombre"
          className="info"
        />
        <input
          {...register('telefono')}
          required
          type="number"
          placeholder="Teléfono"
          className="info"
        />
        <input
          {...register('email')}
          required
          type="email"
          placeholder="E-mail"
          className="info"
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
    </>
  );
};

export default FormViajero;
