import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../material-dashboard-pro-react/components/CustomButtons/Button.js';
import Icon from '@material-ui/core/Icon';
import ComparePDFDocument from '../PDF/ComparePDFDocument';
import { BlobProvider } from '@react-pdf/renderer';
import Axios from 'axios';
import useBudgetPlans from '../PDF/useBudgetPlans';
import { DataServicesContext } from '../../context/servicesContext/servicesContext';




export default function FormMailPDF(props) {
  const userSessionInfo = JSON.parse(sessionStorage.getItem('userSessionInfo'));
  const { register, handleSubmit } = useForm();
  const { handleClose, objPDF } = props;
  const { infoClient } = objPDF;
  const budgetPlans = useBudgetPlans(objPDF);
  const [visiblePDF, setVisiblePDF] = useState(false);
  const [sent, setSent] = useState(false);
  const [blobP, setBlobP] = useState();
  const [transformedPlans, setTransformedPlans] = useState(null);
  let blobPDF = null;

  const { sendMail, sendMailHide } = useContext(DataServicesContext);
var j = 0;
  const handleVisiblePDF = (value) => {
    setVisiblePDF(value);
  };

  const validateInputs = () => {
    let simpleInputs = document.getElementsByClassName('info');
    for (let i = 0; i < simpleInputs.length; i++) {
      if (!simpleInputs[i].value) {
        simpleInputs[i].className += ' invalid';
      }
    }
  };

const sendHideMail = async (blob) => {
  const dataForm = new FormData();
    
  const data = {
    Correo_destinatario: "ventas@asegurapro.com"
    // Correo_copia: userSessionInfo.email
  }    
  const subject = `Cotización: ${infoClient[0].BUDGET_ID}`;
  
  if(userSessionInfo!=null) {
    
    const textBody = `Se notifica que se acaba de generar una cotización con el numero ${infoClient[0].BUDGET_ID} 
Datos de cliente
Email: ${userSessionInfo.email} 
Nombre: ${userSessionInfo.nombre} 
Teléfono: ${userSessionInfo.telefono} `;
    
    if(blob!=null){
    dataForm.append('pdfFile', blob, 'Cotizacion.pdf');
    dataForm.append(
      'email_info',
      JSON.stringify({ ...data, subject: subject, text: textBody })
    );

        console.log("Entro al ultimo if.");
        setSent(true)
        await sendMailHide(dataForm,sent,false);   

    }
  }
}

  const onSubmit = async (data) => {
    validateInputs();
    const dataForm = new FormData();
    const subject = `Cotización: ${infoClient[0].BUDGET_ID}`;
    const textBody = `Tenemos el agrado de enviarle su cotización con el número: ${infoClient[0].BUDGET_ID}`;
    dataForm.append('pdfFile', blobPDF, 'Cotizacion.pdf');
    dataForm.append(
      'email_info',
      JSON.stringify({ ...data, subject: subject, text: textBody })
    );
   await sendMail(dataForm);
    handleClose();
  };

  useEffect(() => {
    budgetPlans.length > 0 && handleVisiblePDF(true);
    budgetPlans.length > 0 && setTransformedPlans(budgetPlans);
 
  }, [budgetPlans]);
 
  return (
    <>
      {visiblePDF && transformedPlans && (
        <BlobProvider
          document={
            <ComparePDFDocument
              objPDF={objPDF}
              mobiliariosHogar={objPDF.mobiliariosHogar}
              edificacionesHogar={objPDF.edificacionesHogar}
               budgetPlans={transformedPlans} 
            />
          }
        >
          {({ blob, url, loading, error }) => {
            if (loading) {
              return <span>cargando...</span>;
            } else {
              blobPDF=blob
              setBlobP(blob);
              if(props.hide && !sent){
                sendHideMail(blob)
              }
              return (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      {...register('Correo_destinatario')}
                      className="info"
                      required
                      placeholder="Destinatario"
                      type="email"
                    />
                    <input
                      {...register('Correo_copia')}
                      placeholder="Copia"
                      type="email"
                    />
                    <input
                      {...register('Correo_copia_oculta')}
                      placeholder="Copia Oculta"
                      type="email"
                    />
                    <Button
                      color="primary"
                      type="submit"
                      onClick={validateInputs}
                    >
                      Enviar correo
                    </Button>
                  </form>
                </>
              );
            }
          }}
        </BlobProvider>
      )}
    </>
  );
}
