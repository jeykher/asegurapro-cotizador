import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components'
import { TableCoberturas, TableEdificacion, TableMetodosPago, TableMobiliario } from './TableDetail';
import { useCotizaPageContext } from '../../../../context/CotizaPageContext/CotizaPageContext';
import "./cardPlanDetails.css"


const TituloAcordion = styled.span`
    font-weight: 700;
    font-size: 0.9em;
    color: #3C4858;
`

export default function AccordionPlanDetails({ jsonPlan }) {

    const { budgetCur } = useCotizaPageContext()
    return (
        <div className="container-accordion-plan-details">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <TituloAcordion>Metodos de pago</TituloAcordion>
                </AccordionSummary>
                <AccordionDetails>
                    <TableMetodosPago jsonPlan={jsonPlan} />
                </AccordionDetails>
            </Accordion>
            {
                budgetCur.AREA_NAME == "HOGAR" && (
                    <>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <TituloAcordion>Edificacion</TituloAcordion>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableEdificacion jsonPlan={jsonPlan} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <TituloAcordion>Mobiliario</TituloAcordion>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableMobiliario jsonPlan={jsonPlan} />
                            </AccordionDetails>
                        </Accordion>
                    </>
                )
            }


            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    className="panel-accordion-grid"
                >
                    <TituloAcordion>Coberturas</TituloAcordion>
                </AccordionSummary>
                <AccordionDetails>
                    <TableCoberturas coberturas={jsonPlan.coberturas} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
