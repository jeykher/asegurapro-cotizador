import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const generateAgesViajeByPlan = (plan, agesViajero) => {
    let agesViajeByPlan = [];
    let agesViajeFormatted = [];
    agesViajero.map(item => {
        let ageFormatted = parseInt(item);
        agesViajeFormatted = [
            ...agesViajeFormatted,
            ageFormatted
        ];
    });
    agesViajeFormatted.map((age, i) => {
        if(plan.coberturas.length <= 0) {
            agesViajeByPlan = [
                ...agesViajeByPlan,
                {
                    id: i,
                    plan: plan.nomplan,
                    valid: <CloseIcon 
                                    style={{
                                        color: '#FC2D22',
                                        size: '24px'
                                    }}
                                />
                }
            ];
            return agesViajeByPlan;
        }
        let ageFound = plan.coberturas.filter(cobertura => age === cobertura.age);
        if(ageFound.length <= 0) {
            agesViajeByPlan = [
                ...agesViajeByPlan,
                {
                    id: i,
                    plan: plan.nomplan,
                    valid: <CloseIcon 
                                    style={{
                                        color: '#FC2D22',
                                        size: '24px'
                                    }}
                                />
                }
            ];
        }
        else {
            agesViajeByPlan = [
                ...agesViajeByPlan,
                {
                    id: i,
                    plan: plan.nomplan,
                    valid: <CheckIcon 
                                    style={{
                                        color: '#4caf50',
                                        size: '24px'
                                    }}
                                />
                }
            ];
        }
    });
    console.log(agesViajeByPlan);
    return agesViajeByPlan;
};

export default generateAgesViajeByPlan;