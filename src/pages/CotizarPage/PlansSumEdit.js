import React, { useState, useEffect } from 'react'
// import { useDialog } from 'context/DialogContext' 
import { Button, Dialog, DialogActions } from "@material-ui/core"
import AmountFormat from '../../components/tools/AmountFormat'
import SliderEdit from './SliderEdit'
import Divider from "@material-ui/core/Divider";
import axiosInstance from '../../routes/axiosConfig';
import { useAlert } from '../../context/alertContext';
import { useBackdrop } from '../../context/Backdrop';

export default function PlansSumEdit({  openDialog, handleCloseSumEdit, plan ,budgetCur, setPlanes}) {
    // const dialog = useDialog()
    const {setOpen:setOperBD} = useBackdrop()
    const {openAlert, setOpenAlert,mensaje, setMensaje} = useAlert()
    const [open, setOpen] = useState(false)
    const [sumValue, setSumValue] = useState(null) 
    const [rateValue, setRateValue] = useState(null)
    const [showDisRate, setShowDisRate] = useState(false)
    const [sumEsp, setSumEsp] = useState(null)
    const [rateEsp, setRateEsp] = useState(null)
    const [customRanges, setCustomRanges] = useState([])
    const [showRanges, setShowRanges] = useState(false)
    const [showSumEsp, setShowSumEsp] = useState(false)
    const [showRateEsp, setShowRateEsp] = useState(false)
    const sumMin = plan.sumaasegmin
    const sumMax = plan.sumaasegmax
    const marks = [
        { value: sumMin, label: <AmountFormat name="sum_min" value={sumMin} /> },
        { value: sumMax, label: <AmountFormat name="sum_max" value={sumMax} /> }
    ];
    const rateMin = plan.tasamin
    const rateMax = plan.tasamax
    const marksRate = [
        { value: rateMin, label: <AmountFormat name="rate_min" value={rateMin} /> },
        { value: rateMax, label: <AmountFormat name="rate_max" value={rateMax} /> }
    ];

    const handleSumChange = (event, newValue) => {
        setSumValue(Math.ceil(newValue/100)*100);
    }

    const handleRateChange = (event, newValue) => {
        setRateValue(newValue);
    }

    const handleSliderSumEsp = (event, newValue) => {
        setSumEsp(newValue);
    }

    const handleSliderRateEsp = (event, newValue) => {
        setRateEsp(newValue);
    }

    function handleClose() {
        setOpen(false)
        handleCloseSumEdit()
    }

    async function getRanges() {
        setOperBD(true)
        const params = {
            p_budget_id: budgetCur.BUDGET_ID,
            p_plan_id: plan.plan_id
        }
        const response = await axiosInstance.post('/dbo/budgets/get_custom_ranges', params)
        setOperBD(false)
        const dataRange = response.data.p_conf_range
        setCustomRanges(dataRange)
        if (dataRange.length > 0 && dataRange[0].SUMAASEGMIN != null && dataRange[0].SUMAASEGMAX != null) {
            setShowRanges(true)
            setShowSumEsp(true)
        }
        if (dataRange.length > 0 && dataRange[0].TASAMIN != null && dataRange[0].TASAMAX != null) {
            setShowRanges(true)
            setShowRateEsp(true)
        }
    }

    useEffect(() => {
        if (openDialog) getRanges()
        setOpen(openDialog)
        setSumValue(plan.sumaaseg)
        setShowDisRate(plan.indtasa === 'S' && true)
        setRateValue(plan.desctasa)
        setSumEsp(plan.sumaaseg)
        setRateEsp(plan.tasa)
        // alert(JSON.stringify(budgetCur))
        // alert(JSON.stringify(plan))
    }, [openDialog, plan]) 

    async function handleChangePlan(e, cobert) {
        const params = {
            p_budget_id:budgetCur.BUDGET_ID,
            p_plan_id: plan.plan_id,
            p_sum: sumValue, 
            p_rate_dis: rateValue
        }
        if (budgetCur.AREA_NAME === 'AUTOMOVIL') {
            setOperBD(true)
            const response = await axiosInstance.post('/dbo/budgets/set_custom_plan', params)

            if (response.data.p_msg !== null) {
                // dialog({
                //     variant: "info",
                //     catchOnCancel: false, 
                //     title: "Alerta",
                //     description: response.data.p_msg
                // })
                setMensaje(response.data.p_msg)
                setOpenAlert(true)
            }
             //AQUI REFRESCAR PLANES
             const { data } = await axiosInstance.post('dbo/budgets/get_budget_by_id',
             //const { data } = await axiosInstance.post('https://segurospiramide.com/asg-api/dbo/budgets/get_budget_by_id',
                 {
                     p_budget_id: budgetCur.BUDGET_ID
                 }
             );
             const { p_cur_budget, p_budget_info, p_budget_plans: { plans } } = data;

             //Consulta de planes habilitados para Asegurapro
             const responsePlansAsegPro = await axiosInstance.post(
                  'dbo/planes_asesor/buscarPlanesAsesor',
                 {
                     "p_cod_prod": "AUTOMOVIL",
                     "p_cod_asesor": "11262"
                 }
             );
             const planesActivos = []
                 for (var i = 0; i < plans.length; i++) {
                     for (var j = 0; j < responsePlansAsegPro.data.c_cursor_planes_asesor.length; j++) {
                         if (plans[i].revplan == responsePlansAsegPro.data.c_cursor_planes_asesor[j].REVPLAN) {
                             planesActivos.push(plans[i])
                         }
                     }
                 }
                 setPlanes(planesActivos);
                 setOperBD(false)
        }
        // refresh()
        handleClose()
    }

    async function handleChangeEspecial() {
        const params = {
            p_budget_id: budgetCur.BUDGET_ID,
            p_plan_id: plan.plan_id,
            p_sum: sumEsp,
            p_rate: rateEsp
        }
        if (budgetCur.AREA_NAME === 'AUTOMOVIL') {
            const response = await axiosInstance.post('/dbo/budgets/set_custom_plan_especial', params)
            if (response.data.p_msg !== null) {
                // dialog({
                //     variant: "info",
                //     catchOnCancel: false,
                //     title: "Alerta",
                //     description: response.data.p_msg
                // })
                setMensaje(response.data.p_msg)
                setOpenAlert(true)
            }
        }
        // refresh()
        handleClose()
    }

    return (
        <Dialog open={open}>
            <SliderEdit
                title="Suma Asegurada"
                color="warning"
                min={sumMin}
                max={sumMax}
                marks={marks}
                value={sumValue}
                onChange={handleSumChange}
            />
            {showDisRate && <SliderEdit
                title="% Descuento de Tasa"
                color="warning"
                min={rateMin}
                max={rateMax}
                marks={marksRate}
                value={rateValue}
                onChange={handleRateChange}
                step={1}
            />}
            <DialogActions>
                <Button color="secondary" simple onClick={handleClose}>Cancelar</Button>
                <Button color="secondary" onClick={handleChangePlan}>Calcular</Button>
            </DialogActions>
            <Divider />
            {showSumEsp && <SliderEdit
                title="Suma Asegurada Especial"
                min={customRanges[0].SUMAASEGMIN}
                max={customRanges[0].SUMAASEGMAX}
                marks={[
                    { value: customRanges[0].SUMAASEGMIN, label: <AmountFormat name="sum_min_esp" value={customRanges[0].SUMAASEGMIN} /> },
                    { value: customRanges[0].SUMAASEGMAX, label: <AmountFormat name="sum_max_esp" value={customRanges[0].SUMAASEGMAX} /> }
                ]}
                value={sumEsp}
                onChange={handleSliderSumEsp}
            />}
            {showRateEsp && <SliderEdit
                title="Tasa Especial"
                min={customRanges[0].TASAMIN}
                max={customRanges[0].TASAMAX}
                marks={[
                    { value: customRanges[0].TASAMIN, label: <AmountFormat name="rate_min_esp" value={customRanges[0].TASAMIN} /> },
                    { value: customRanges[0].TASAMAX, label: <AmountFormat name="rate_max_esp" value={customRanges[0].TASAMAX} /> }
                ]}
                value={rateEsp}
                onChange={handleSliderRateEsp}
                step={0.1}
            />}
            {showRanges && <DialogActions>
                <Button color="secondary" simple onClick={handleClose}>Cancelar</Button>
                <Button color="secondary" onClick={handleChangeEspecial}>Calcular</Button>
            </DialogActions>}
        </Dialog>
    )
}
