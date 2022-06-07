import React, { useEffect, useState } from 'react';
import ComparePDFDocument from '../PDF/ComparePDFDocument';
import { PDFViewer } from '@react-pdf/renderer';
import useBudgetPlans from '../PDF/useBudgetPlans';

export default function ComparePDFViewer(props) {   
  const { objPDF } = props;     
  const budgetPlans = useBudgetPlans(objPDF);
  const [visiblePDF, setVisiblePDF] = useState(false);
  const [transformedPlans, setTransformedPlans] = useState(null);
  const handleVisiblePDF = (value) => {
    setVisiblePDF(value);
  };
  useEffect(() => {
    budgetPlans.length > 0 && handleVisiblePDF(true);
    budgetPlans.length > 0 && setTransformedPlans(budgetPlans);
  }, [budgetPlans]);
 // console.log(budgetPlans)
  return (
    <>
      {visiblePDF && transformedPlans && (
        <PDFViewer width="100%" height="650px"> 
          <ComparePDFDocument
           objPDF={objPDF}
           mobiliariosHogar={objPDF.mobiliariosHogar}
           edificacionesHogar={objPDF.edificacionesHogar}
            budgetPlans={transformedPlans} 
          />
        </PDFViewer>
      )}
    </>
  );
}
