import React from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "../PDF/comparePDFStyles";
import CardVehiclePDF from "../PDF/CardVehiclePDF";
import CardHumanPDF from "../PDF/CardHumanPDF";
import CardAgesPDF from "../PDF/CardAgesPDF";
import { distinctArray } from "../PDF/utils";
import CardTravelPDF from "./CardTravelPDF";
import CardHomePDF from "./CardHomePDF";
import { ConstructionOutlined } from "@mui/icons-material";

export default function CobertColumnPDF(props) {
  const {
    distinctPayments,
    infoClient,
    cobertsDescription,
    type, 
    budgetInfo,
    propertyDescrip,
    cobertsProperty,
    mobiliariosHogar,
    edificacionesHogar,
  } = props;


  function getDistinctCobertPropertyDescrip(descbien) {
    const coberts = cobertsProperty.filter((c) => c.descbien === descbien);
    return distinctArray(coberts, "codcobert", "desccobert");
  }
  return (
    <View style={styles.wrapperCobert}>
      <View>
        {type === "AUTOMOVIL" ? (
          <CardVehiclePDF vehicle={budgetInfo} infoClient={infoClient} />
        ) : type === "VIAJE" ? (
          <CardTravelPDF infoClient={infoClient} budgetInfo={budgetInfo} />
        ) : type === "HOGAR" ? (
          <CardHomePDF infoClient={infoClient} budgetInfo={budgetInfo} />
        ) : (
          <CardHumanPDF infoClient={infoClient} budgetInfo={budgetInfo} />
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.rowTitlePlan}>
          <Text style={styles.titleCard}>Forma de pago</Text>
        </View>
        {distinctPayments.map((payment, index) => (
          <View
            style={index % 2 === 0 ? styles.rowData : styles.rowDataEven}
            key={index}
          >
            <Text style={styles.paymentInfo}>{payment?.name}</Text>
          </View>
        ))}
      </View>

      {type === "PERSONAS" && <CardAgesPDF />}
      {/* COBERTURAS */}
      <View style={styles.card}>
        <View style={styles.rowTitlePlan}>
          <Text style={styles.titleCard}>Coberturas</Text>
        </View>
        {cobertsDescription.map((cobert, index) => (
          <View
            style={index % 2 === 0 ? styles.rowData : styles.rowDataEven}
            key={index}
          >
            <Text style={styles.cobertInfo}>{cobert.desccobert}</Text>
          </View>
        ))}
      </View>
      {type === "HOGAR" && (       
        <>
          {/* EDIFICACION */}
          <View style={styles.card}>
            <View style={styles.rowTitlePlan}>
              <Text style={styles.titleCard}>Edificación</Text>
            </View>
            {edificacionesHogar?.map((cobert, index) => (
              <View
                style={index % 2 === 0 ? styles.rowData : styles.rowDataEven}
                key={index}
              >
                <Text style={styles.cobertInfo}>{cobert.desccobert}</Text>
              </View>
            ))}
          </View>
          {/* MOBILIARIO */}
          <View style={styles.card}>
            <View style={styles.rowTitlePlan}>
              <Text style={styles.titleCard}>Mobiliario</Text>
            </View>
            {mobiliariosHogar?.map((cobert, index) => (
              <View
                style={index % 2 === 0 ? styles.rowData : styles.rowDataEven}
                key={index}
              >
                <Text style={styles.cobertInfo}>{cobert.desccobert}</Text>
              </View>
            ))}
          </View>
        </> 
      )}
    </View>
  );
}
