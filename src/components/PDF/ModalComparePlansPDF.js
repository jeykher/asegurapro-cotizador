import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '../Backdrop/Backdrop';
import Fade from '@material-ui/core/Fade';
import GridContainer from '../material-dashboard-pro-react/components/Grid/GridContainer.js';
import GridItem from '../material-dashboard-pro-react/components/Grid/GridItem.js';
import ComparePDFViewer from '../PDF/ComparePDFViewer';
import FormMailPDF from '../PDF/FormMailPDF';
import Button from '../material-dashboard-pro-react/components/CustomButtons/Button.js';
import './modals.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    width: '50%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 2, 2),
  }, 
}));

export default function ModalComparePlansPDF(props) {  
  const {
    type,
    budgetInfo,
    infoClient,
    typeModal,
    plans,
    cobertsDescrip,
    payments,
    agesDescrip,
    propertyDescrip,
    cobertsProperty,
    selectedPays,
    mobiliariosHogar,
    edificacionesHogar
  } = props;
  const { open, handleClose, hide } = props;
  const classes = useStyles();
  const [objPDF, setObjPDF] = useState({});

  useEffect(() => {
    const formatedPayments = payments.map((payment) => {
      return {
        id: payment.maxgiro === undefined ?0: payment.maxgiro,
        name: payment.nomplan,
      };
    });

    let differentPayments = [
      {
        id: 0,
        name: 'Anual',
      },
      ...formatedPayments,

    ];
    setObjPDF(
      {
        plans: plans,
        infoClient: infoClient,
        cobertsDescrip: cobertsDescrip,
        payments: type == "AUTOMOVIL" ? formatedPayments: type == "VIAJE" ? differentPayments : type == "HOGAR" ? differentPayments : formatedPayments,
        type: type,
        agesDescrip: agesDescrip,
        budgetInfo: budgetInfo,
        propertyDescrip: propertyDescrip,
        cobertsProperty: cobertsProperty,
        selectedPays: selectedPays,
        mobiliariosHogar:mobiliariosHogar,
        edificacionesHogar:edificacionesHogar
      },
      [plans]
    );

    return () => setObjPDF({});
  }, [props]);
  const classHiden = hide===true? " container-hiden":"";
  return ( 
    <Fragment>
        <Modal
          className={classes.modal + classHiden}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <div className={classes.paper}>
              <GridContainer>
                <GridItem
                  xs={12} 
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ style: 'margin:0px;padding:0px;overflow:hidden' }}
                >
                  {typeModal === 'PRINT' && ( 
                    <>
                      <ComparePDFViewer objPDF={objPDF} />
                      <GridContainer justify="center">
                        <Button color="primary" onClick={handleClose}> 
                          Cerrar
                        </Button>
                      </GridContainer>
                    </>
                  )}
                  {typeModal === 'MAIL' && (
                    <>
                      <FormMailPDF handleClose={handleClose} objPDF={objPDF} hide={hide}/>
                      <GridContainer justify="center">
                        <Button color="primary" onClick={handleClose}>
                          Cerrar
                        </Button>
                      </GridContainer>
                    </>
                  )}
                </GridItem>
              </GridContainer>
            </div>
          </Fade>
        </Modal>
    </Fragment>
  );
}
