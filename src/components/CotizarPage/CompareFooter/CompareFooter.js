import react, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CardCompareFooter from './CardCompareFooter/CardCompareFooter';

import { useCotizaPageContext } from '../../../context/CotizaPageContext/CotizaPageContext';
import CustomCarousel from '../../CustomCarousel/CustomCarousel';
import './compare-footer.css';

const CompareFooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 2px 0 5px;
  border-top: 1px solid #bdbdbd;
  box-shadow: 0 -5px 10px rgb(177 176 176 / 10%);
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.43;
  background: #fff;
`;

const BotonComparar = styled(Button)`
  background-color: #ff9800 !important;
  border-radius: 30px !important;
  box-shadow: 0 2px 2px 0 rgb(255 152 0 / 14%),
    0 3px 1px -2px rgb(255 152 0 / 20%), 0 1px 5px 0 rgb(255 152 0 / 12%);
  color: #fff !important;
  border: none;
  cursor: pointer;
  margin: 0.3125rem 1px;
  padding: 12px 30px !important;
  position: relative;
  font-size: 12px !important;
  min-width: auto;
  min-height: auto;
  text-align: center !important;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600 !important;
  line-height: 1.42857143;
  white-space: nowrap;
  will-change: box-shadow, transform;
  touch-action: manipulation;
  letter-spacing: 0 !important;
  text-transform: uppercase;
  vertical-align: middle;
`;

const LeftContainerCompareFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const ButtonLimpiar = styled(Button)`
  color: #fc2d22 !important;
  border: none;
  box-shadow: none;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.7em !important;
  margin: 0 0.7rem;
  font-weight: bold;
`;

const CompareFooter = () => {
  const {
    setCompareFooterVisible,
    plansCompareArray,
    setPlansCompareArray,
    cleanPlansToCompare,
    verInterfazComparar,
  } = useCotizaPageContext();
  const totalPlansCompareArray = plansCompareArray.length;
  const [widthPage, setWidthPage] = useState();
  useEffect(() => {
    var panelIzquierda = document.getElementById('root');
    setWidthPage(panelIzquierda.clientWidth);
  }, []);

  return (
    <>
      <CompareFooterContainer>
        <Grid
          container
          sx={{
            height: '100%',
          }}
        >
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 1rem',
            }}
          >
            <CustomCarousel itemsToShow={widthPage > 1023 ? 4 : 1}>
              {plansCompareArray.map((planCompare) => {
                const { plan_id, descplanprod, codmoneda, sumaaseg,indsumaaseg } =
                  planCompare;
                return (
                  <CardCompareFooter
                    key={plan_id}
                    plan_id={plan_id}
                    descplanprod={descplanprod}
                    codmoneda={codmoneda}
                    sumaaseg={sumaaseg}
                    indsumaaseg={indsumaaseg}
                  />
                );
              })}
            </CustomCarousel>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
              }}
            >
              <LeftContainerCompareFooter>
                <BotonComparar onClick={verInterfazComparar}>
                  COMPARAR ({totalPlansCompareArray})
                </BotonComparar>
              </LeftContainerCompareFooter>
              <LeftContainerCompareFooter>
                <ButtonLimpiar onClick={cleanPlansToCompare}>
                  <DeleteRoundedIcon sx={{ color: "#FC2D22", fontSize: 24 }} />
                  <span
                    style={{
                      color: "#FC2D22",
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    LIMPIAR
                  </span>
                </ButtonLimpiar>
              </LeftContainerCompareFooter>
            </div>
          </Grid>
        </Grid>
      </CompareFooterContainer>
    </>
  );
};

export default CompareFooter;
