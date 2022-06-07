import styled from 'styled-components';
import AmountFormat from '../components/tools/AmountFormat';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const SegunLey = styled.p`
    color: #999;
    font-weight: 600;
`;

const generateMobiliariosHogarByPlan = (plan, mobiliariosHogar) => {
    let mobiliariosHogarByPlan = [];
    let mobiliariosFilteredByPlan = [];
    let mobiliariosArrayFilteredByPlan = plan.bienes.filter(mobiliarioExtract => mobiliarioExtract.descbien === "Mobiliario");  
    mobiliariosArrayFilteredByPlan.map(item1 => {
        const { coberturas } = item1;
        coberturas.map(cobertura => {
            mobiliariosFilteredByPlan = [
                ...mobiliariosFilteredByPlan,
                cobertura
            ];
        });
    });
    mobiliariosHogar?.map((mobiliario, i) => {
        if(mobiliariosFilteredByPlan.length <= 0) {
            mobiliariosHogarByPlan = [
                ...mobiliariosHogarByPlan,
                {
                    id: i,
                    plan: plan.nomplan,
                    suma_aseg: <CloseIcon 
                                    style={{
                                        color: '#FC2D22',
                                        size: '24px'
                                    }}
                                />
                }
            ];
            return mobiliariosHogarByPlan;
        }
        let mobiliarioIterado = mobiliariosFilteredByPlan.filter(mobiliarioPlan => mobiliario.desccobert === mobiliarioPlan.desccobert);
            if(mobiliarioIterado.length > 0) {
                if(mobiliarioIterado[0].indcobley) {
                    mobiliariosHogarByPlan = [
                        ...mobiliariosHogarByPlan,
                        {
                            id: i,
                            plan: plan.nomplan,
                            suma_aseg: <SegunLey>Según Ley</SegunLey>
                        }
                    ];
                }
                else {
                    if(mobiliarioIterado[0].suma_aseg === 0) {
                        mobiliariosHogarByPlan = [
                            ...mobiliariosHogarByPlan,
                            {
                                id: i,
                                plan: plan.nomplan,
                                suma_aseg: <CheckIcon 
                                                style={{
                                                    color: '#4caf50',
                                                    size: '24px'
                                                }}
                                            />
                            }
                        ];
                    }
                    else {
                        mobiliariosHogarByPlan = [
                            ...mobiliariosHogarByPlan,
                            {
                                id: i,
                                plan: plan.nomplan,
                                suma_aseg: <AmountFormat 
                                                value={mobiliarioIterado[0].suma_aseg} 
                                                style={{
                                                    color: '#3C4858',
                                                    fontWeight: '700',
                                                    fontSize: '1rem'
                                                }}
                                            />
                            }
                        ];
                    }
                } 
            }
        else {
            mobiliariosHogarByPlan = [
                ...mobiliariosHogarByPlan,
                {
                    id: i,
                    plan: plan.nomplan,
                    suma_aseg: <CloseIcon 
                            style={{
                                color: '#FC2D22',
                                size: '24px'
                            }}
                        />
                }
            ];
        }
    });
    return mobiliariosHogarByPlan;
};

export const generateMobiliariosHogarByPlan2 = (plan, mobiliariosHogar) => {
    let mobiliariosHogarByPlan2 = [];
    let mobiliariosFilteredByPlan = [];
    let mobiliariosArrayFilteredByPlan = plan.bienes.filter(mobiliarioExtract => mobiliarioExtract.descbien === "Mobiliario");  
    mobiliariosArrayFilteredByPlan.map(item1 => {
        const { coberturas } = item1;
        coberturas.map(cobertura => {
            mobiliariosFilteredByPlan = [
                ...mobiliariosFilteredByPlan,
                cobertura
            ];
        });
    });
    mobiliariosHogar?.map((mobiliario, i) => {
        if(mobiliariosFilteredByPlan.length <= 0) {
            mobiliariosHogarByPlan2 = [
                ...mobiliariosHogarByPlan2,
                {
                    id: i,
                    plan: plan.nomplan,
                    suma_aseg: plan.suma_aseg
                }
            ];
            return mobiliariosHogarByPlan2;
        }
        let mobiliarioIterado = mobiliariosFilteredByPlan.filter(mobiliarioPlan => mobiliario.desccobert === mobiliarioPlan.desccobert);
            if(mobiliarioIterado.length > 0) {
                if(mobiliarioIterado[0].indcobley) {
                    mobiliariosHogarByPlan2 = [
                        ...mobiliariosHogarByPlan2,
                        {
                            id: i,
                            plan: plan.nomplan,
                            suma_aseg: plan.suma_aseg
                        }
                    ];
                }
                else {
                    if(mobiliarioIterado[0].suma_aseg === 0) {
                        mobiliariosHogarByPlan2 = [
                            ...mobiliariosHogarByPlan2,
                            {
                                id: i,
                                plan: plan.nomplan,
                                suma_aseg: plan.suma_aseg
                            }
                        ];
                    }
                    else {
                        mobiliariosHogarByPlan2 = [
                            ...mobiliariosHogarByPlan2,
                            {
                                id: i,
                                plan: plan.nomplan,
                                suma_aseg: mobiliarioIterado[0].suma_aseg
                            }
                        ];
                    }
                } 
            }
        else {
            mobiliariosHogarByPlan2 = [
                ...mobiliariosHogarByPlan2,
                {
                    id: i,
                    plan: plan.nomplan,
                    suma_aseg: plan.suma_aseg
                }
            ];
        }
    });
    return mobiliariosHogarByPlan2;
};
export default generateMobiliariosHogarByPlan;