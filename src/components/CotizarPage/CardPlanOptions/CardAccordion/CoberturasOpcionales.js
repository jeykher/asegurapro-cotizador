import { Grid } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useCotizaPageContext } from '../../../../context/CotizaPageContext/CotizaPageContext';
import CheckBox from './Checkout';
import CreateIcon from '@material-ui/icons/Create'
import { Divider } from '@material-ui/core';
// import AmountFormatDisplay from 'components/Core/NumberFormat/AmountFormatDisplay'
import NumberFormat from 'react-number-format';
import BudgetCobertEditSum from './BudgetCobertEditSum';

const CoberturasOpcionales = (props) => {

    const { planes,handleSelectCobertOpt } = useCotizaPageContext()
    const { hideCoberts } = props
    const [cobertsOpt, setCobertsOpt] = useState([])
    const [cobOpt, setCobOpt] = useState([])
    const [showEditSumDialog, setShowEditSumDialog] = useState(false)
    const [dataEdit, setDataEdit] = useState(null)

    useEffect(() => {

        function getCobertOpt() {
            let copt = []
            const plansType = planes.filter((p) => p.tipo_plan === 0)
            for (const plan of plansType) {
                copt = [...copt, ...plan.coberturas.filter((cobert) => cobert.indcobertoblig === 'N')]
            }
            setCobOpt(copt)
            const titleCobert = distinctArray(copt, "codcobert", "desccobert")
            const cobertsAllOpt = setCobertsDetails(titleCobert, copt)
            cobertsAllOpt.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
            hideCoberts(cobertsAllOpt)
            setCobertsOpt(cobertsAllOpt)
        }
        getCobertOpt()
    }, [planes])


    function distinctArray(array, id, name) {
        const result = [];
        const map = new Map();
        for (const reg of array) {
            if (!map.has(reg[id])) {
                map.set(reg[id], true);
                result.push({
                    id: reg[id],
                    name: reg[name]
                });
            }
        }
        return result
    }
    function setCobertsDetails(codTitles, cobOptionals) {
        let cobDet = []
        for (const cob of codTitles) {
            const coberts = cobOptionals.filter((cobert) => cobert.codcobert === cob.id)
            const sums = coberts.sort((a, b) => (a.sumaasegmax > b.sumaasegmax ? 1 : a.sumaasegmax < b.sumaasegmax ? -1 : 0))[0]
            cobDet = [...cobDet, { ...cob, ...sums }]
        }
        return cobDet
    }
    function handleEditSum(cobert) {
        setDataEdit(null)
        setDataEdit({
            title: cobert.cobcomplementaria === 'S' ? cobert.cc_tipotarifa === 'SA' ? '% de Suma' : '% de Tasa' : 'Suma Asegurada',
            id: cobert.id,
            sumaaseg: cobert.cobcomplementaria === 'S' ? cobert.cc_valor : cobert.suma_aseg,
            sumaasegmin: cobert.cobcomplementaria === 'S' ? cobert.cc_valor_min : cobert.sumaasegmin,
            sumaasegmax: cobert.cobcomplementaria === 'S' ? cobert.cc_valor_max : cobert.sumaasegmax
        })
        setShowEditSumDialog(true)
    }
    function handleCloseSumEdit() {
        setShowEditSumDialog(false)
    }
    return (
        <>
            <AccordionDetails>
                {cobertsOpt.map((cobert,i) => (
                     <Fragment key={i}>
                     <Grid item xs={12} sm={12} md={12} lg={12}>
                         <CheckBox
                             checked={cobert.indincluida === 'S' ? true : false}
                             classLabel="labelSmall"
                             label={cobert.name}
                             name={`check_${cobert.id}`}
                             onChange={(e) => handleSelectCobertOpt(e, cobert)}
                         /> 
                     </Grid>
                     {cobert.indincluida === 'S' && <Grid style={{marginBottom:30}} item xs={12} sm={12} md={12} lg={12}>
                         {cobert.cobcomplementaria === 'S' ? cobert.cc_tipotarifa === 'SA' ? '% Suma: ' : '% Tasa: ' : 'Suma: '}
                         <AmountFormat name={`sumopt_${cobert.id}`} value={cobert.cobcomplementaria === 'S' ? cobert.cc_valor : cobert.suma_aseg} />
                         <CreateIcon color='secondary' fontSize="small" style={{cursor:'pointer',marginLeft:'10px',color:'#FC2D22 !important' }} onClick={() => handleEditSum(cobert)} />
                         <Divider />
                     </Grid>}
                 </Fragment>
                ))}
                 {dataEdit && <BudgetCobertEditSum
                // objBudget={objBudget}
                typePlan={0}//{typePlan}
                data={dataEdit}
                step={1}
                openDialog={showEditSumDialog}
                handleCloseSumEdit={handleCloseSumEdit}
            />}

            </AccordionDetails>
        </>
    )
}

function AmountFormat(props) {
    const { onChange, value, ...rest } = props
    return (
        <NumberFormat
            {...rest}
            id={rest.name}
            value={value}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale
            displayType={"text"}
            isNumericString
        />
    )
}

export default CoberturasOpcionales
