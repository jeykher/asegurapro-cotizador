import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

import { useCotizaPageContext } from '../../../../context/CotizaPageContext/CotizaPageContext';
import AmountFormat from '../../../tools/AmountFormat';

const TituloPlan = styled.h6`
  font-size: 0.7rem;
  display: -webkit-box;
  overflow: hidden;
  margin-top: 0px !important;
  min-height: 38px;
  margin-bottom: 0px !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #fc2d22;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: normal;
`;

const BotonComprar = styled(Button)`
  border-radius: 30px !important;
  box-shadow: 0 2px 2px 0 rgb(255 152 0 / 14%),
    0 3px 1px -2px rgb(255 152 0 / 20%), 0 1px 5px 0 rgb(255 152 0 / 12%);
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0.3125rem 1px;
  padding: 12px 30px;
  position: relative;
  font-size: 12px;
  min-width: auto;
  min-height: auto;
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  line-height: 1.42857143;
  white-space: nowrap;
  will-change: box-shadow, transform;
  touch-action: manipulation;
  letter-spacing: 0;
  text-transform: uppercase;
  vertical-align: middle;
  background-color: #fc2d22 !important;
`;

const Moneda = styled.span`
  font-weight: 500;
  line-height: 1;
  color: #777;
  font-size: 1rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const Precio = styled.span`
  font-size: 1.28em;
  color: #3c4858;
  font-weight: 700;
  text-decoration: none;
`;

const CardCompareFooter = ({ plan_id, descplanprod, codmoneda, sumaaseg,indsumaaseg }) => {
  const { deleteItemOnPlanCompare } = useCotizaPageContext();
  return (
    <>
      <Paper
        elevation={24}
        sx={{
          width: '261px',
          height: '90%',
          opacity: '1',
          transform: 'translate3d(0px, 0px, 0px)',
          padding: '0 24px',
          boxShadow: "1px 3px 9px 1px rgb(185 185 185 / 90%);",
          margin: '0 0.4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 0',
          position: 'relative',
          border: "solid 1px #e9e9e9",
          minHeight: '115px'
        }}
      >
        <TituloPlan>
          <b>{descplanprod}</b>
        </TituloPlan>
      {indsumaaseg == 'S' && (
          <div>
          <TituloPlan>ASEGURADO POR:</TituloPlan>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '-20px',
            }}
            className="container-price"
          >
            <Moneda>{codmoneda == 'DL' ? '$' : null}</Moneda>
            <Precio><AmountFormat value={sumaaseg}/></Precio>
          </div>
        </div>
      )}
        <CancelIcon
          sx={{
            position: 'absolute',
            top: '2px',
            right: '5px',
            color: '#616161',
            cursor: 'pointer',
            width: "0.8em !important",
            height: "0.8em !important",
          }}
          onClick={() => deleteItemOnPlanCompare(plan_id)}
        />
      </Paper>
    </>
  );
};

export default CardCompareFooter;
