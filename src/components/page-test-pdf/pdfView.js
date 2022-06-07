import react, { useContext, useEffect, useState } from 'react';
import pdfObject from '../PDF/jsonPdf';
import ModalComparePlansPDF from '../PDF/ModalComparePlansPDF';
import './form.css';

const FormView = () => {
  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const printPdf = () => {
    openModal();
    setTypeModal('PRINT');
  };
  const sendPdf = () => {
    openModal();
    setTypeModal('MAIL');
  };

  return (
    <>
      <ModalComparePlansPDF
        open={modal}
        handleClose={closeModal}
        infoClient={pdfObject.p_cur_budget}
        plans={pdfObject.p_budget_plans.plans}
        cobertsDescrip={pdfObject.p_budget_plans.plans[0].coberturas}
        payments={[]}
        type={'AUTOMOVIL'}
        agesDescrip={[]}
        budgetInfo={pdfObject.p_budget_info}
        typeModal={typeModal}
        propertyDescrip={[]}
        cobertsProperty={[]}
        selectedPays={[]}
      />
      <button onClick={printPdf}>IMPRIMIR</button>
      <button onClick={sendPdf}>ENVIAR</button>
    </>
  );
};

export default FormView;
