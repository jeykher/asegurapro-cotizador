import { useCotizaPageContext } from "../../../../context/CotizaPageContext/CotizaPageContext";
import CardPlanDetail from "./CardPlanDetail"

const CardDetailDetailController = () => {
 
    const { plan } = useCotizaPageContext();
    return (
        <div>
            <CardPlanDetail jsonPlan={plan} />
        </div>
    ) 
}

export default CardDetailDetailController
