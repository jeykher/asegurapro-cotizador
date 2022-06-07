import styled from 'styled-components';
import AmountFormat from '../components/tools/AmountFormat';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const SegunLey = styled.p`
    color: #999;
    font-weight: 600;
`;

const generateEdificacionesHogarByPlan = (plan, edificacionesHogar) => {
    let edificacionesHogarByPlan = [];
    let edificacionesFilteredByPlan = [];
    let edificacionesArrayFilteredByPlan = plan.bienes.filter(edificacionExtract => edificacionExtract.descbien === "Edificacion");
    edificacionesArrayFilteredByPlan.map(item1 => {
        const { coberturas } = item1;
        coberturas.map(cobertura => {
            edificacionesFilteredByPlan = [
                ...edificacionesFilteredByPlan,
                cobertura
            ];
        });
    });
    edificacionesHogar?.map((edificacion, i) => {
        if(edificacionesFilteredByPlan.length <= 0) {
            edificacionesHogarByPlan = [
                ...edificacionesHogarByPlan,
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
            return edificacionesHogarByPlan;
        }
        let edificacionIterada = edificacionesFilteredByPlan.filter(edificacionPlan => edificacion.desccobert === edificacionPlan.desccobert);
        if(edificacionIterada.length > 0) {
            if(edificacionIterada[0].indcobley) {
                edificacionesHogarByPlan = [
                    ...edificacionesHogarByPlan,
                    {
                        id: i,
                        plan: plan.nomplan,
                        suma_aseg: <SegunLey>Según Ley</SegunLey>
                    }
                ];
            }
            else {
                if(edificacionIterada[0].suma_aseg === 0) {
                    edificacionesHogarByPlan = [
                        ...edificacionesHogarByPlan,
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
                    edificacionesHogarByPlan = [
                        ...edificacionesHogarByPlan,
                        {
                            id: i,
                            plan: plan.nomplan,
                            suma_aseg: <AmountFormat 
                                            value={edificacionIterada[0].suma_aseg} 
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
            edificacionesHogarByPlan = [
                ...edificacionesHogarByPlan,
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
    return edificacionesHogarByPlan;
};

export const generateEdificacionesHogarByPlan2 = (plan, edificacionesHogar) => {
    let edificacionesHogarByPlan2 = [];
    let edificacionesFilteredByPlan = [];
    let edificacionesArrayFilteredByPlan = plan.bienes.filter(edificacionExtract => edificacionExtract.descbien === "Edificacion");
    edificacionesArrayFilteredByPlan.map(item1 => {
        const { coberturas } = item1;
        coberturas.map(cobertura => {
            edificacionesFilteredByPlan = [
                ...edificacionesFilteredByPlan,
                cobertura
            ];
        });
    });
    edificacionesHogar?.map((edificacion, i) => {
        if(edificacionesFilteredByPlan.length <= 0) {
            edificacionesHogarByPlan2 = [
                ...edificacionesHogarByPlan2,
                {
                    id: i,
                    plan: plan.nomplan,
                    suma_aseg: plan.suma_aseg
                }
            ];
            return edificacionesHogarByPlan2;
        }
        let edificacionIterada = edificacionesFilteredByPlan.filter(edificacionPlan => edificacion.desccobert === edificacionPlan.desccobert);
        if(edificacionIterada.length > 0) {
            if(edificacionIterada[0].indcobley) {
                edificacionesHogarByPlan2 = [
                    ...edificacionesHogarByPlan2,
                    {
                        id: i,
                        plan: plan.nomplan,
                        suma_aseg: plan.suma_aseg
                    }
                ];
            }
            else {
                if(edificacionIterada[0].suma_aseg === 0) {
                    edificacionesHogarByPlan2 = [
                        ...edificacionesHogarByPlan2,
                        {
                            id: i,
                            plan: plan.nomplan,
                            suma_aseg: plan.suma_aseg
                        }
                    ];
                }
                else {
                    edificacionesHogarByPlan2 = [
                        ...edificacionesHogarByPlan2,
                        {
                            id: i,
                            plan: plan.nomplan,
                            suma_aseg:edificacionIterada[0].suma_aseg 
                        }
                    ];
                }
            } 
        }
        else {
            edificacionesHogarByPlan2 = [
                ...edificacionesHogarByPlan2,
                {
                    id: i,
                    plan: plan.nomplan,
                    suma_aseg: plan.suma_aseg
                } 
            ];
        }
    });
    return edificacionesHogarByPlan2;
};

export default generateEdificacionesHogarByPlan;