import styled from 'styled-components';
import AmountFormat from '../components/tools/AmountFormat';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const SegunLey = styled.p`
    color: #999;
    font-weight: 600;
`;

const generateCoberturasViajeByPlan = (plan, coberturasViajero) => {
    let coberturasViajeByPlan = [];
    coberturasViajero.map((cobertura, i) => {
        if(plan.coberturas.length <= 0) {
            coberturasViajeByPlan = [
                ...coberturasViajeByPlan,
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
            return coberturasViajeByPlan;
        }
        let coberturaIterada = plan.coberturas.filter(coberturaPlan => cobertura.desccobert === coberturaPlan.desccobert);
        if(coberturaIterada.length > 0) {
            if(coberturaIterada[0].indcobley) {
                coberturasViajeByPlan = [
                    ...coberturasViajeByPlan,
                    {
                        id: i,
                        plan: plan.nomplan,
                        suma_aseg: <SegunLey>Según Ley</SegunLey>
                    }
                ];
            }
            else {
                if(coberturaIterada[0].suma_aseg === 0) {
                    coberturasViajeByPlan = [
                        ...coberturasViajeByPlan,
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
                    coberturasViajeByPlan = [
                        ...coberturasViajeByPlan,
                        {
                            id: i,
                            plan: plan.nomplan,
                            suma_aseg: <AmountFormat 
                                            value={coberturaIterada[0].suma_aseg} 
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
            coberturasViajeByPlan = [
                ...coberturasViajeByPlan,
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
    return coberturasViajeByPlan;
};

export default generateCoberturasViajeByPlan;