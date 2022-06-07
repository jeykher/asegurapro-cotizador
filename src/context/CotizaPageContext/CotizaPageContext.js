import { createContext, useContext, useState} from "react";
import { useHistory } from 'react-router-dom';
import axiosInstance from "../../routes/axiosConfig";
import { useBackdrop } from "../Backdrop";

const CotizaPageContext = createContext();

export const useCotizaPageContext = () => useContext(CotizaPageContext);

export const CotizaPageContextProvider = ({children}) => {
    const history = useHistory();
    const [budgetCur, setBudgetCur] = useState({});
    const [budgetInfo, setBudgetInfo] = useState({});
    const [planes, setPlanes] = useState([]);
    const [plan, setPlan] = useState({});
    const [compareFooterVisible, setCompareFooterVisible] = useState(false);
    const [plansCompareArray, setPlansCompareArray] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [showComparation, setShowComparation] = useState(false);
    const { setOpen } = useBackdrop()
    const [fraccionamientosAutomovil, setFraccionamientosAutomovil] = useState([]);
    const [coberturasAutomovil, setCoberturasAutomovil] = useState([]);
    const [coberturasHogar, setCoberturasHogar] = useState([]);
    const [modalPDF, setModalPDF] = useState(false);
    const [typeModalPDF, setTypeModalPDF] = useState('');
    const [showEditSumDialog, setShowEditSumDialog] = useState(false)
    const [coberturasViajero, setCoberturasViajero] = useState([]);
    const [edificacionesHogar, setEdificacionesHogar] = useState([]);
    const [mobiliariosHogar, setMobiliariosHogar] = useState([]);
    const [agesViajero, setAgesViajero] = useState([]);
    const [budgetViewBack, setBudgetViewBack] = useState('/');
    
    
    function handleCloseSumEdit() {
      setShowEditSumDialog(false)
    }
    const cleanAll = () => {
        setBudgetCur({});
        setBudgetInfo({});
        setPlanes([]);
        setPlan({});
        setCompareFooterVisible(false);
        setPlansCompareArray([]);
        setShowDetail(false);
        setShowComparation(false);
        setFraccionamientosAutomovil([]);
        setCoberturasAutomovil([]);
        setCoberturasHogar([]);
        setCoberturasViajero([]);
        setEdificacionesHogar([]);
        setMobiliariosHogar([]);
        setModalPDF(false);
        setTypeModalPDF('');
        setBudgetViewBack('/');
        sessionStorage.clear();
    };

    const openModalPDF = () => {
        //console.log(pdfObject);
        setModalPDF(true);
    };
    const closeModalPDF = () => {
        setModalPDF(false);
    };
    const printPDF = () => {
        openModalPDF();
        setTypeModalPDF('PRINT');
    };
    const sendPDF = () => {
        openModalPDF();
        setTypeModalPDF('MAIL');
    };

    const comeBackToFirstInterface = () => {
        let budgetViewBefore = sessionStorage.getItem('budgetView') || budgetViewBack;
        history.push(`/asegurapro/cotizador${budgetViewBefore}`);
    };

    const addPlanToCompare = (plan_id) => {
        setCompareFooterVisible(true);
        let existPlanInCompareArray = plansCompareArray.find(plane => plane.plan_id === plan_id);
        if (existPlanInCompareArray == undefined || null) {
            let newPlanCompare = planes.filter(plan => plan.plan_id === plan_id);
            setPlansCompareArray([
                ...plansCompareArray,
                newPlanCompare[0]
            ]);
        }
    };

    const deleteItemOnPlanCompare = (plan_id) => {
        let plansCompareFiltered = plansCompareArray.filter(plan => plan.plan_id !== plan_id);
        setPlansCompareArray(plansCompareFiltered);
        if (plansCompareFiltered <= 0) {
            setCompareFooterVisible(false);
            setShowComparation(false);
            setCompareFooterVisible(false);
        }
    }; 

    const verDetallePlanCotizacion = (plan_id) => {
        setShowDetail(true);
        setPlan(planes.filter(plan => plan.plan_id === plan_id)[0]);
        cleanPlansToCompare();
    };
    const customSumAsegPlan = (plan_id) => {
        setPlan(planes.filter(plan => plan.plan_id === plan_id)[0]);
    };

    const verInterfazComparar = () => {
        setShowComparation(true);
        setCompareFooterVisible(false);
    };

    const cleanPlansToCompare = () => {
        setCompareFooterVisible(false);
        setPlansCompareArray([]);
    };

    const comeBackCompareToMain = () => {
        setShowComparation(false);
        setCompareFooterVisible(true);
    };
    const changeSum = async (parameters, value) => {
        const params = {
            p_budget_id: budgetCur.BUDGET_ID,//info[0].BUDGET_ID,
            p_type_plan: 0,// typePlan,
            p_codcobert: parameters.id,
            p_sum: value
        }
        setOpen(true)
        await axiosInstance.post('/dbo/budgets/set_cobert_optional_sum', params)
        
        const {data:{p_budget_plans:{plans}}} = await axiosInstance.post('/dbo/budgets/get_budget_by_id', { p_budget_id: budgetCur.BUDGET_ID })

        if (budgetCur.AREA_NAME == "AUTOMOVIL") {
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
            setOpen(false) 
            return;
        }
        setPlanes(plans)
        setOpen(false)
    }

    async function handleSelectCobertOpt(e, cobert) {
        const params = {
            p_budget_id: budgetCur.BUDGET_ID,
            p_type_plan: 0,
            p_codcobert: cobert.id,
            p_value: e.target.checked ? 'S' : 'N'
        }
        setOpen(true)
        await axiosInstance.post('/dbo/budgets/set_cobert_vehicle_optional', params)
        const {data:{p_budget_plans:{plans}}} = await axiosInstance.post('/dbo/budgets/get_budget_by_id', { p_budget_id: budgetCur.BUDGET_ID })

        if (budgetCur.AREA_NAME == "AUTOMOVIL") {
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
            setOpen(false) 
            return;
        }
        setPlanes(plans)
        setOpen(false)
    }

    return (
        <CotizaPageContext.Provider value={{
            planes,
            setPlanes,
            compareFooterVisible,
            setCompareFooterVisible,
            plansCompareArray,
            setPlansCompareArray,
            verDetallePlanCotizacion,
            showDetail, 
            setShowDetail,
            plan,
            addPlanToCompare,
            cleanPlansToCompare,
            budgetCur,
            budgetInfo,
            setBudgetCur,
            setBudgetInfo,
            showComparation,
            setShowComparation,
            verInterfazComparar,
            deleteItemOnPlanCompare,
            comeBackCompareToMain,
            handleSelectCobertOpt,
            changeSum,
            fraccionamientosAutomovil,
            setFraccionamientosAutomovil,
            coberturasAutomovil,
            setCoberturasAutomovil,
            coberturasHogar,
            setCoberturasHogar,
            modalPDF,
            setModalPDF,
            typeModalPDF,
            setTypeModalPDF,
            openModalPDF,
            closeModalPDF,
            printPDF,
            sendPDF,
            showEditSumDialog, 
            setShowEditSumDialog,
            handleCloseSumEdit,
            customSumAsegPlan,
            edificacionesHogar, 
            setEdificacionesHogar, 
            mobiliariosHogar, 
            setMobiliariosHogar,
            coberturasViajero, 
            setCoberturasViajero,
            comeBackToFirstInterface,
            budgetViewBack, 
            setBudgetViewBack,
            cleanAll,
            agesViajero, 
            setAgesViajero
        }}>
            {children}
        </CotizaPageContext.Provider>
    )
}