import AmountFormat from '../components/tools/AmountFormat';
import CloseIcon from '@mui/icons-material/Close';

const generateFraccionamientosAutoByPlan = (plan, fraccionamientosAutomovil) => {
    let fraccionamientosAutoByPlan = [];
    let fraccionamientosAutomovilFiltered = fraccionamientosAutomovil.filter(fraccionFiltered => fraccionFiltered.nomplan !== "Anual");
    fraccionamientosAutoByPlan = [
        ...fraccionamientosAutoByPlan,
        {
            id: 0,
            plan: 'Anual',
            prima: <AmountFormat 
                value={plan.prima} 
                style={{
                    color: '#3C4858',
                    fontWeight: '700',
                    fontSize: '1rem'
                }}
            />
        }
    ];
    fraccionamientosAutomovilFiltered.map((fraccion, i) => {
        if(plan.fraccionamiento.length <= 0) {
            fraccionamientosAutoByPlan = [
                ...fraccionamientosAutoByPlan,
                {
                    id: i+1,
                    plan: fraccion.nomplan,
                    prima: <CloseIcon 
                        style={{
                            color: '#FC2D22',
                            size: '24px'
                        }}
                    />
                }
            ];
            return fraccionamientosAutoByPlan;
        }
        let fraccionamientoIterado = plan.fraccionamiento.filter(fraccionPlan => fraccion.nomplan === fraccionPlan.nomplan);
        if(fraccionamientoIterado.length > 0) {
            fraccionamientosAutoByPlan = [
                ...fraccionamientosAutoByPlan,
                {
                    id: i+1,
                    plan: fraccion.nomplan,
                    prima: <AmountFormat 
                        value={fraccionamientoIterado[0].prima} 
                        style={{
                                color: '#3C4858',
                                fontWeight: '700',
                                fontSize: '1rem'
                            }}
                        />
                }
            ];
        }
        else {
            fraccionamientosAutoByPlan = [
                ...fraccionamientosAutoByPlan,
                {
                    id: i+1,
                    plan: fraccion.nomplan,
                    prima: <CloseIcon 
                            style={{
                                color: '#FC2D22',
                                size: '24px'
                            }}
                        />
                }
            ];
        }
    });
    return fraccionamientosAutoByPlan;    
};

export default generateFraccionamientosAutoByPlan;