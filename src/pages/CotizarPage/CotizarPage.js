import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import DirectionsCarSharpIcon from "@mui/icons-material/DirectionsCarSharp";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import PhoneSharpIcon from "@mui/icons-material/PhoneSharp";
import "./hide.css";
import PaperCotizarContainer from "../../components/tools/PaperCotizarContainer";
import FullContainer from "../../components/tools/FullContainer";
//tabs
import { useBackdrop } from "../../context/Backdrop";
import CompareFooter from "../../components/CotizarPage/CompareFooter/CompareFooter";

import { useCotizaPageContext } from "../../context/CotizaPageContext/CotizaPageContext";
import axiosInstance from "../../routes/axiosConfig";
import TabsPlanes from "./sections/TabsPlanes/TabsPlanes";
import CardDetailDetailController from "./sections/CardPlanDetail/CardDetailDetailController";
import CompareInterface from "./sections/CompareInterface/CompareInterface";
import ModalComparePlansPDF from "../../components/PDF/ModalComparePlansPDF";

import getAllAutoFractions from "../../utils/getAllAutoFractions";
import getAllAutoCoverages from "../../utils/getAllAutoCoverages";
import getAllHogarBuildings from "../../utils/getAllHogarBuildings";
import getAllHogarFurnitures from "../../utils/getAllHogarFurnitures";
import getAllHogarCoverages from "../../utils/getAllHogarCoverages";
import getAllViajeroCoverages from "../../utils/getAllViajeroCoverages";

import PlansSumEdit from "./PlansSumEdit";

const CotizarTitle = styled.h2`
  text-align: center;
  color: #3c4858;
  margin-top: 30px;
  min-height: 32px;
  font-weight: 700;
  margin-bottom: 25px;
  text-decoration: none;
  font-size: 2.6em;
  line-height: 1.5em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -0.1rem;
  font-family: "Open Sans", sans-serif;
`;

const GridInfoCotizacion = styled(Grid)`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const DetalleCotizacion = styled.span`
  letter-spacing: -0.8 px !important;
  -webkit-font-smoothing: antialiased;
  box-sizing: inherit;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  margin-top: 0px;
  text-align: left;
  color: #999;
  font-weight: 600;
`;

const TituloDescCotizacion = styled.h4`
  color: #3c4858;
  /* margin: 1.75rem 0 0.875rem !important; */
  margin-left: 4px;
  min-height: unset;
  /* text-align: left; */
  font-weight: 600;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 1.3em;
  line-height: 1.4em;
`;

const CotizarPage = () => {
  const [userSessionName, setUserSessionName] = useState("");
  const [userSessionEmail, setUserSessionEmail] = useState("");
  const [userSessionTelephone, setUserSessionTelephone] = useState("");

  const [userSessionEdadTitular, setUserSessionEdadTitular] = useState("");
  const [userSessionEdades, setUserSessionEdades] = useState("");
  const [userSessionFechaLlegada, setUserSessionFechaLlegada] = useState("");
  const [userSessionFechaSalida, setUserSessionEdadesFechaSalida] = useState("");
  const [userSessionPaisOrigen, setUserSessionPaisOrigen] = useState("");
  const [userSessionRegionDestino, setUserSessionRegionDestino] = useState("");

  const [planesAsegPro, setPlanesAsegProv] = useState([]);
  const [pdfObject, setPdfObject] = useState({});
  const [openModalPdf, setOpenModalPdf] = useState(false);
  const { setOpen } = useBackdrop();
  const {
    plan,
    planes,
    setPlanes,
    compareFooterVisible,
    plansCompareArray,
    setPlansCompareArray,
    verDetallePlanCotizacion,
    setShowDetail,
    showDetail,
    setBudgetCur,
    setBudgetInfo,
    budgetCur,
    budgetInfo,
    showComparation,
    fraccionamientosAutomovil,
    setFraccionamientosAutomovil,
    coberturasAutomovil,
    setCoberturasAutomovil,
    coberturasHogar,
    setCoberturasHogar,
    showEditSumDialog,
    setShowEditSumDialog,
    handleCloseSumEdit,
    edificacionesHogar,
    setEdificacionesHogar,
    mobiliariosHogar,
    setMobiliariosHogar,
    coberturasViajero,
    setCoberturasViajero,
    budgetViewBack,
    setBudgetViewBack,
    agesViajero,
    setAgesViajero,
  } = useCotizaPageContext();

  const { budgetId } = useParams();

  const userSessionInfo = JSON.parse(sessionStorage.getItem("userSessionInfo"));
  const userSessionViajero = JSON.parse(
    sessionStorage.getItem("userSessionViajero")
  );

  let arrayBudgetCur = [];
  arrayBudgetCur.push(budgetCur);

  let areaName = arrayBudgetCur[0].AREA_NAME;

  useEffect(() => {
    (async () => {
      const BaseUrl = process.env.REACT_APP_SERVICE_BASE_URL;
      setOpen(true);
      const { data } = await axiosInstance.post(
        BaseUrl + "dbo/budgets/get_budget_by_id",
        //const { data } = await axiosInstance.post('https://segurospiramide.com/asg-api/dbo/budgets/get_budget_by_id',
        {
          p_budget_id: budgetId,
        }
      );
      setPdfObject(data);

      const {
        p_cur_budget,
        p_budget_info,
        p_budget_plans: { plans },
      } = data;

      //Consulta de planes habilitados para Asegurapro
      const responsePlansAsegPro = await axiosInstance.post(
        "dbo/planes_asesor/buscarPlanesAsesor",
        {
          p_cod_prod: p_cur_budget[0].AREA_NAME,
          p_cod_asesor: "11262",
        }
      );
      setPlanesAsegProv(responsePlansAsegPro.data.c_cursor_planes_asesor);
      console.log(responsePlansAsegPro.data.c_cursor_planes_asesor)

      setUserSessionName(userSessionInfo?.nombre);
      setUserSessionEmail(userSessionInfo?.email);
      setUserSessionTelephone(userSessionInfo?.telefono);

      if (p_cur_budget[0].AREA_NAME == "VIAJE") {
        let fechaSalida = userSessionViajero?.fechaSalida
          .slice(0, 10)
          .split("-");
        let fechaSalida2 =
          fechaSalida[2] + "/" + fechaSalida[1] + "/" + fechaSalida[0];
        let fechaLlegada = userSessionViajero?.fechaLlegada
          .slice(0, 10)
          .split("-");
        let fechaLlegada2 =
          fechaLlegada[2] + "/" + fechaLlegada[1] + "/" + fechaLlegada[0];
        setUserSessionFechaLlegada(fechaLlegada2);
        setUserSessionEdadesFechaSalida(fechaSalida2);
        setUserSessionPaisOrigen(userSessionViajero?.paisOrigen);
        setUserSessionRegionDestino(userSessionViajero?.regionDestino);

        let valorEdades = userSessionViajero?.edades
        console.log(10,valorEdades)
     

        let allAges = '';
        if (valorEdades == undefined) {
            setUserSessionEdades(userSessionViajero?.edadTitular)
        }else{
         const arrayEdades =  userSessionViajero?.edades.replaceAll('-',',');
         const arrayEdades2 = arrayEdades.replaceAll(',_','');   
         const arrayEdades3 = arrayEdades2.replaceAll('_','');
         allAges = userSessionViajero?.edadTitular + ',' + arrayEdades3;
         setUserSessionEdades(allAges)
        }

      }
      //   setUserSessionEdades
      setBudgetCur(p_cur_budget[0]);
      setBudgetInfo(p_budget_info);

      // console.log(plans)
      // console.log(responsePlansAsegPro.data.c_cursor_planes_asesor)

      setOpen(false);
      setPlanes(plans);
      console.log(7,plans)
      switch (p_cur_budget[0].AREA_NAME) {
        case "AUTOMOVIL":
          /// console.log('entro a auto')
          const fractionsAutomovil = await getAllAutoFractions(plans);
          const coveragesAutomovil = await getAllAutoCoverages(plans);
          const coveragesAutomovilFiltered = coveragesAutomovil.filter(
            (coverageFiltered) => coverageFiltered.desccobert !== "Blindaje"
          );
          setFraccionamientosAutomovil(fractionsAutomovil);
          setCoberturasAutomovil(coveragesAutomovilFiltered);
          const planesActivos = [];
          for (var i = 0; i < plans.length; i++) {
            for (var j = 0;j < responsePlansAsegPro.data.c_cursor_planes_asesor.length;j++) {
              if (plans[i].revplan == responsePlansAsegPro.data.c_cursor_planes_asesor[j].REVPLAN) {
                planesActivos.push(plans[i]);
              }
            }
          }
          setPlanes(planesActivos);
          setBudgetViewBack("/auto");
          break;
        case "HOGAR":
          const planesActivos2 = [];
          for (var i = 0; i < plans.length; i++) {
            for (var j = 0;j < responsePlansAsegPro.data.c_cursor_planes_asesor.length;j++) {
              if (plans[i].codplan == responsePlansAsegPro.data.c_cursor_planes_asesor[j].CODPLAN) {
                planesActivos2.push(plans[i]);
              }
            }
          }
          setPlanes(planesActivos2);
          ///console.log("pase por aqui")
          const coveragesHogar = await getAllHogarCoverages(plans);
          const buildingsHogar = await getAllHogarBuildings(plans);
          const furnituresHogar = await getAllHogarFurnitures(plans);
          setCoberturasHogar(coveragesHogar);
          setEdificacionesHogar(buildingsHogar);
          setMobiliariosHogar(furnituresHogar);
          setBudgetViewBack("/hogar");
          break;
        case "VIAJE":
          const coveragesViajero = await getAllViajeroCoverages(plans);
          setCoberturasViajero(coveragesViajero);
          let all_ages_viajero = p_budget_info.p_all_ages.split(",");
          setAgesViajero(all_ages_viajero);
          setBudgetViewBack("/viajero");
          break;
        default:
          setPlanes(plans);
          break;
      }
      setTimeout(() => {
        setOpenModalPdf(true);
      }, 9000);
    })();
    window.scrollTo(0, 0);
  }, []);
  const {
    BUDGET_ID,
    BUDGET_DESCRIPTION,
    DATE_CREATION,
    EXPIRED_ON,
    APPLICANT_NAME,
    APPLICANT_EMAIL,
    APPLICANT_PHONE_NUMBER,
    AREA_NAME,
  } = budgetCur;
  const { descmarca, descmodelo, p_year, desversion } = budgetInfo;

  const closeModal = () => {
    ///console.log("llego")
  };

  const modalPDFAuto = areaName == "AUTOMOVIL" && (
    <ModalComparePlansPDF
      open={openModalPdf}
      handleClose={closeModal}
      infoClient={arrayBudgetCur}
      plans={planes}
      cobertsDescrip={coberturasAutomovil}
      payments={fraccionamientosAutomovil}
      type={areaName}
      agesDescrip={[]}
      budgetInfo={budgetInfo}
      typeModal={"MAIL"}
      hide={true}
      propertyDescrip={coberturasAutomovil}
      cobertsProperty={coberturasAutomovil}
      selectedPays={fraccionamientosAutomovil}
    />
  );
  const modalPDFViajero = areaName == "VIAJE" && (
    <ModalComparePlansPDF
      open={openModalPdf}
      handleClose={closeModal}
      infoClient={arrayBudgetCur}
      plans={planes}
      cobertsDescrip={coberturasViajero}
      payments={[]}
      type={areaName}
      agesDescrip={[]}
      budgetInfo={budgetInfo}
      typeModal={"MAIL"}
      hide={true}
      propertyDescrip={coberturasViajero}
      cobertsProperty={coberturasViajero}
      selectedPays={[]}
    />
  );
  const modalPDFHogar = areaName == "HOGAR" && (
    <ModalComparePlansPDF
      open={openModalPdf}
      handleClose={closeModal}
      infoClient={arrayBudgetCur}
      plans={planes}
      // cobertsDescrip={[]}
      cobertsDescrip={coberturasHogar}
      payments={[]}
      type={areaName}
      hide={true}
      agesDescrip={[]}
      budgetInfo={budgetInfo}
      typeModal={"MAIL"}
      propertyDescrip={[]}
      cobertsProperty={[]}
      selectedPays={[]}
      mobiliariosHogar={mobiliariosHogar}
      edificacionesHogar={edificacionesHogar}
    />
  );

  return (
    <>
      <PlansSumEdit
        plan={plan}
        setPlanes={setPlanes}
        openDialog={showEditSumDialog}
        handleCloseSumEdit={handleCloseSumEdit}
        budgetCur={budgetCur}
      />
      {budgetCur.AREA_NAME === "AUTOMOVIL" ? modalPDFAuto : null}
      {budgetCur.AREA_NAME === "HOGAR" ? modalPDFHogar : null}
      {budgetCur.AREA_NAME === "VIAJE" ? modalPDFViajero : null}
      <FullContainer>
        <PaperCotizarContainer
          style={{
            marginBottom: "1rem",
          }}
        >
          <Grid container sx={{ maxWidth: "95%" }}>
            <Grid item xs={12}>
              <CotizarTitle>{BUDGET_DESCRIPTION}</CotizarTitle>
            </Grid>
            <GridInfoCotizacion item xs={12} sm={12} md={4}>
              <div>
                <AppsSharpIcon sx={{ color: "#FC2D22", fontSize: 35 }} />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <TituloDescCotizacion>
                  Cotización Número: {BUDGET_ID}
                </TituloDescCotizacion>
                <DetalleCotizacion>
                  Fecha: {DATE_CREATION}
                  <br />
                  Vence: {EXPIRED_ON}
                </DetalleCotizacion>
              </div>
            </GridInfoCotizacion>
            {userSessionInfo && (
              <GridInfoCotizacion item xs={12} sm={12} md={4}>
                <div>
                  <PhoneSharpIcon sx={{ color: "#FC2D22", fontSize: 35 }} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <TituloDescCotizacion>
                    {APPLICANT_NAME != null
                      ? APPLICANT_NAME
                      : userSessionName != null
                      ? userSessionName
                      : null}
                  </TituloDescCotizacion>
                  <DetalleCotizacion>
                    {APPLICANT_EMAIL != null
                      ? APPLICANT_EMAIL
                      : userSessionEmail != null
                      ? userSessionEmail
                      : null}
                    <br />
                    {APPLICANT_PHONE_NUMBER != null
                      ? APPLICANT_PHONE_NUMBER
                      : userSessionTelephone != null
                      ? userSessionTelephone
                      : null}
                  </DetalleCotizacion>
                  <br />

                  {AREA_NAME == "VIAJE" ? (
                    <DetalleCotizacion>
                      Fecha Salida:
                      {userSessionFechaSalida != null
                        ? userSessionFechaSalida
                        : null}
                      <br />
                      Fecha Llegada:
                      {userSessionFechaLlegada != null
                        ? userSessionFechaLlegada
                        : null}
                        <br />
                        País Origen:
                      {userSessionPaisOrigen != null
                        ? userSessionPaisOrigen
                        : null}
                            <br />
                        Región Destino:
                    {userSessionRegionDestino != null
                        ? userSessionRegionDestino
                        : null}
                          <br />
                        Viajeros:
                    {userSessionEdades != null
                        ? userSessionEdades
                        : null}
                    </DetalleCotizacion>
                  ) : null}
                </div>
              </GridInfoCotizacion>
            )}

            {AREA_NAME == "AUTOMOVIL" ? (
              <GridInfoCotizacion item xs={12} sm={12} md={4}>
                <div>
                  <DirectionsCarSharpIcon
                    sx={{ color: "#FC2D22", fontSize: 35 }}
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <TituloDescCotizacion>
                    {descmarca} {descmodelo}
                  </TituloDescCotizacion>
                  <DetalleCotizacion>
                    {p_year} {desversion}
                  </DetalleCotizacion>
                </div>
              </GridInfoCotizacion>
            ) : null}
            <Grid
              item
              xs={12}
              sx={{
                marginTop: "20px",
              }}
            >
              {showDetail ? (
                <CardDetailDetailController />
              ) : showComparation ? (
                <CompareInterface />
              ) : (
                <TabsPlanes planes={planes} />
              )}
              {showComparation}
            </Grid>
          </Grid>
        </PaperCotizarContainer>
      </FullContainer>
      {compareFooterVisible ? <CompareFooter /> : null}
    </>
  );
};

export default CotizarPage;
