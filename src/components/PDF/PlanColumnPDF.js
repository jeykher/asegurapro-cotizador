import React from 'react';
import { Text, Image, View } from '@react-pdf/renderer';
import doneIcon from '../../assets/static/done-icon.png';
import closeIcon from '../../assets/static/close-icon.png';
import { getSymbolCurrency, formatAmount } from '../PDF/utils';
import styles from '../PDF/comparePDFStyles';
import generateEdificacionesHogarByPlan, { generateEdificacionesHogarByPlan2 } from '../../utils/generateEdificacionesHogarByPlan';
import generateMobiliariosHogarByPlan,{generateMobiliariosHogarByPlan2} from '../../utils/generateMobiliariosHogarByPlan';

export default function PlanColumnPDF(props) {
  const { plan, type,plans,mobiliariosHogar, edificacionesHogar, title } = props;
  var arrayEdificacion =[]
  var arrayMobiliario = []
  let cont = 0
  return (
    <View style={styles.planColumn}>
      <View style={styles.card}>
        <View style={styles.rowTitlePlan}>
          <Text style={styles.titleCard}>{plan.title}</Text>
        </View>
        <View style={styles.rowAmountPlan}>
          <Text>{`${getSymbolCurrency(plan.currency)}`}</Text>
          <Text style={styles.amount}>{`${formatAmount(plan.prima)}`}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.rowTitlePlan}>
          <Text style={styles.titleCard}>Precio </Text>
        </View>
        {plan.payment.map((payDescription, index) => {
          return payDescription === "CLOSE" ? (
            <View
              style={index % 2 === 0 ? styles.rowData : styles.rowDataEven}
              key={index}
            >
              <Image style={styles.icon} src={closeIcon} />
            </View>
          ) : (
            <View
              style={index % 2 === 0 ? styles.rowData : styles.rowDataEven}
              key={index}
            >
              <Text>{formatAmount(payDescription)}</Text>
            </View>
          );
        })}
      </View>

      {type === "PERSONAS" && (
        <View style={styles.card}>
          <View style={styles.rowTitlePlan}>
            <Text style={styles.titleCard}>Edades</Text>
          </View>
          <View style={styles.rowDataAge}>
            {plan.ages.map((age, index) =>
              age.inc === "S" ? (
                <Text key={`row_${index}a`}>
                  {age.age}
                  <Image style={styles.iconAge} src={doneIcon} />
                </Text>
              ) : (
                <Text key={`row_${index}b`}>
                  {age.age}
                  <Image style={styles.iconAge} src={closeIcon} />
                </Text>
              )
            )}
          </View>
        </View>
      )}

      {/* COBERTURAS */}
      <View style={styles.card}>
        <View style={styles.rowTitlePlan}>
          <Text style={styles.titleCard}>Suma asegurada </Text>
        </View>
        {plan.coberts.map((cobertDesc, index) => {
          return cobertDesc === undefined ? (
            <View
              style={
                index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
              }
              key={index}
            >
              <Image style={styles.icon} src={closeIcon} />
            </View>
          ) : cobertDesc.codcobert === "DVEN" ? (
            <View
              style={
                index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
              }
              key={index}
            >
              <Text>{formatAmount(0)}</Text>
            </View>
          ) : cobertDesc.suma_aseg === 0 ? (
            <View
              style={
                index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
              }
              key={index}
            >
              <Image style={styles.icon} src={doneIcon} />
            </View>
          ) : (
            <View
              style={
                index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
              }
              key={index}
            >
              <Text>{formatAmount(cobertDesc.suma_aseg)}</Text>
            </View>
          );
        })}
      </View>

      {type === "HOGAR" && (
        <>
          <View style={styles.card}>
            <View style={styles.rowTitlePlan}>
              <Text style={styles.titleCard}>Suma asegurada</Text>
            </View>
            {plans?.plans?.map((plan, index1) =>{
            if(plan.descplanprod.toLowerCase()===title.toLowerCase()){
             arrayEdificacion = generateEdificacionesHogarByPlan2(plan, edificacionesHogar)?.map(
                (bien, index) => {
                 
                  return (
                    bien.suma_aseg === undefined ? (
                      <View
                        style={
                          index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
                        }
                        key={index}
                      >
                        <Image style={styles.icon} src={closeIcon} />
                      </View>
                    ) : bien.suma_aseg === "DVEN" ? (
                      <View
                        style={
                          index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
                        }
                        key={index}
                      >
                        <Text>{formatAmount(0)}</Text>
                      </View>
                    ) : bien.suma_aseg === 0 ? (
                      <View
                        style={
                          index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
                        }
                        key={index}
                      >
                        <Image style={styles.icon} src={doneIcon} />
                      </View>
                    ) :(
                    <View
                    style={
                      index % 2 === 0
                        ? styles.rowDataPlan
                        : styles.rowDataPlanEven
                    }
                     key={index}
                  >
                    
                    <Text>{formatAmount(bien.suma_aseg)}</Text> 
                  </View>
                    )
                  )
                }
              )
            }
            }
            )
            
            }            
            {arrayEdificacion}
          </View> 

          <View style={styles.card}>
            <View style={styles.rowTitlePlan}>
              <Text style={styles.titleCard}>Suma asegurada</Text>
            </View>
            {plans?.plans?.map((plan, index) =>{

            if(plan.descplanprod.toLowerCase()===title.toLowerCase()){
             arrayMobiliario =   generateMobiliariosHogarByPlan2(plan, mobiliariosHogar)?.map(
                (bien, index) => {
                  
                  return(
                    bien.suma_aseg === undefined ? (
                      <View
                        style={
                          index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
                        }
                        key={index}
                      >
                        <Image style={styles.icon} src={closeIcon} />
                      </View>
                    ) : bien.suma_aseg === "DVEN" ? (
                      <View
                        style={
                          index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
                        }
                        key={index}
                      >
                        <Text>{formatAmount(0)}</Text>
                      </View>
                    ) : bien.suma_aseg === 0 ? (
                      <View
                        style={
                          index % 2 === 0 ? styles.rowDataPlan : styles.rowDataPlanEven
                        }
                        key={index}
                      >
                        <Image style={styles.icon} src={doneIcon} />
                      </View>
                    ) :(
                  <View
                    style={
                      index % 2 === 0
                        ? styles.rowDataPlan
                        : styles.rowDataPlanEven
                    }
                    key={index}
                  >
                    <Text>{formatAmount(bien.suma_aseg)}</Text>
                   
                  </View>
                  )
                  )
                }
              )
            }
          }
            )}
            {arrayMobiliario}
          </View>
        </>
      )}
    </View>
  );
}









// {plan.properties.map((propertiesCoberts, index) => (
//   <View style={styles.card} key={index * 12}>
//     <View style={styles.rowTitlePlan}>
//       <Text style={styles.titleCard}>Suma daniel</Text>
//     </View>
//     {propertiesCoberts.map((propertyDesc, index) => {
//       return propertyDesc === "NO" ? (
//         <View
//           style={
//             index % 2 === 0
//               ? styles.rowDataPlan
//               : styles.rowDataPlanEven
//           }
//           key={index}
//         >
//           <Image style={styles.icon} src={closeIcon} />
//         </View>
//       ) : propertyDesc === 0 ? (
//         <View
//           style={
//             index % 2 === 0
//               ? styles.rowDataPlan
//               : styles.rowDataPlanEven
//           }
//           key={index}
//         >
//           <Image style={styles.icon} src={doneIcon} />
//         </View>
//       ) : (
//         <View
//           style={
//             index % 2 === 0
//               ? styles.rowDataPlan
//               : styles.rowDataPlanEven
//           }
//           key={index}
//         >
//           <Text>{formatAmount(propertyDesc)}</Text>
//         </View>
//       );
//     })}
//   </View>
// ))}