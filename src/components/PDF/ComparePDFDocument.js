import React from 'react';
import { Page, Font, View, Document } from '@react-pdf/renderer';
import HeaderPDF from '../PDF/HeaderPDF';
import CobertColumnPDF from '../PDF/CobertColumnPDF';
import PlanColumnPDF from '../PDF/PlanColumnPDF';
import styles from '../PDF/comparePDFStyles'; 
import ConditionsHumanCard from './ConditionsHumanCard';
import ConditionsVehicleCard from './ConditionsVehicleCard';
import AdvisorInfoPDF from './AdvisorInfoPDF';

Font.register({ family: 'Roboto Slab', src: "/asegurapro/cotizador/fonts/RobotoSlab-Bold.ttf" });
Font.register({
  family: 'Roboto',
  fonts: [{ src: "/asegurapro/cotizador/fonts/Roboto-Regular.ttf" }, { src: "/asegurapro/cotizador/fonts/Roboto-Bold.ttf", fontWeight: 700 }],
});

export default function ComparePDFDocument({ objPDF, budgetPlans,mobiliariosHogar,
  edificacionesHogar }) { 

  // const  = props;
  const {
    infoClient,
    cobertsDescrip,
    payments,
    type, 
    budgetInfo,
    propertyDescrip,
    cobertsProperty,
    // mobiliariosHogar,
    // edificacionesHogar
  } = objPDF;
  return (
    <>
      <Document>
        {budgetPlans.map((arrayPlan, index) => (
          <Page size="A4" style={styles.page} key={index + 40}>
            <HeaderPDF />
            <View style={styles.wrapper}>
              <CobertColumnPDF
                infoClient={infoClient} 
                cobertsDescription={cobertsDescrip}
                distinctPayments={payments}
                type={type}
                budgetInfo={budgetInfo}
                propertyDescrip={propertyDescrip}
                cobertsProperty={cobertsProperty} 
                mobiliariosHogar={mobiliariosHogar} 
                edificacionesHogar={edificacionesHogar} 
              />
              {/* {arrayPlan.map((plan, index) => ( */}
              {arrayPlan.map((plan, index) => {
                return(
                <View style={styles.wrapperPlan} key={index + 15}>
                  <PlanColumnPDF plan={plan} plans={objPDF} title={plan.title} type={type} key={index + 50} mobiliariosHogar={mobiliariosHogar} 
                edificacionesHogar={edificacionesHogar}  />
                </View>
              )})}

            </View>
            {budgetPlans.length - 1 === index && type === "PERSONAS" && (
              <ConditionsHumanCard infoClient={infoClient} />
            )}
            {budgetPlans.length - 1 === index && type === "AUTOMOVIL" && (
              <ConditionsVehicleCard />
            )}
            {budgetPlans.length - 1 === index && (
              <AdvisorInfoPDF budgetInfo={budgetInfo} />
            )}
          </Page>
        ))}
      </Document>
    </>
  );
}
