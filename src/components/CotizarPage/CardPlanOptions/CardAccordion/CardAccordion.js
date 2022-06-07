import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CoberturasOpcionales from './CoberturasOpcionales';
import "./coberturas.css"

export default function CardAccordion() {

    const [cobertsChildren, setCobertsChildren] = useState([])

    const hideCoberts = (coberts) =>{
        setCobertsChildren(coberts)
    }

    return (
        <div className={cobertsChildren.length===0 ?" hide-coberts-container":" "}>
            <Accordion sx={{ width: '100%'}} className="accordion-container">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#FC2D22 !important" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{
                        color: '#FC2D22 !important',
                        fontSize: '0.6rem !important',
                        fontWeight: '700 !important',
                        lineHeight: '1.57 !important',
                        marginLeft:"15px !important"
                    }}>COBERTURAS OPCIONALES</Typography>
                </AccordionSummary>
                <CoberturasOpcionales hideCoberts={hideCoberts}/>
            </Accordion>
        </div>
    );
}
