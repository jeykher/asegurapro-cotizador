import { Grid } from "@mui/material"
import CardPlan from "../../../../components/CotizarPage/CardPlans/CardPlans"
import AccordionPlanDetails from "./AccordionPlanDetails"
import "./cardPlanDetails.css"

const CardPlanDetail = ({jsonPlan}) => {
    return (
        <Grid container className="container-grid-details"> 
            <Grid item xs={12} sm={3}>
                    <CardPlan 
                        plan_id={jsonPlan.plan_id}
                        sumaaseg={jsonPlan.sumaaseg}
                        descplanprod={jsonPlan.descplanprod}
                        prima={jsonPlan.prima}
                        fraccionamiento={jsonPlan.fraccionamiento}
                        codmoneda={jsonPlan.codmoneda}
                        indsumaaseg={jsonPlan.indsumaaseg}
                        indmodsum={jsonPlan.indmodsum}
                    />
            </Grid>
            <Grid item xs={12} sm={8}>
                <AccordionPlanDetails jsonPlan={jsonPlan}/>
            </Grid>
        </Grid>
    )
}

export default CardPlanDetail
