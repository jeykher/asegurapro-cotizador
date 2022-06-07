import React from 'react';
import { Text, Image, View } from '@react-pdf/renderer';
import redCarIcon from '../../assets/static/car-icon.png';
import blueCarIcon from '../../assets/static/blue-car-icon.png';
import redAppIcon from '../../assets/static/app-icon.png';
import blueAppIcon from '../../assets/static/blue-app-icon.png';
import styles from '../PDF/comparePDFStyles';

const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY;
const carIcon = insuranceCompany === 'OCEANICA' ? blueCarIcon : redCarIcon;
const appIcon = insuranceCompany === 'OCEANICA' ? blueAppIcon : redAppIcon;

export default function CardVehiclePDF(props) {
  const { infoClient, vehicle } = props;
  return (
    <View style={styles.cardInfo}>
      <View style={styles.rowDataIcon}>
        <Image style={styles.icon} src={appIcon} />
        <Text
          style={styles.quotationInfo}
        >{`Cotización numero: ${infoClient[0].BUDGET_ID}`}</Text>
      </View>
      <View style={styles.rowDataIcon}>
        <Image style={styles.icon} src={carIcon} />
        <Text
          style={styles.quotationInfo}
        >{`${vehicle.descmarca.toLowerCase()} ${vehicle.descmodelo.toLowerCase()} ${
          vehicle.p_year
        }`}</Text>
      </View>
      <View style={styles.rowDate}>
        <Text
          style={styles.cobertInfo}
        >{`Fecha: ${infoClient[0].DATE_CREATION}`}</Text>
        <Text
          style={styles.cobertInfo}
        >{`Vence: ${infoClient[0].EXPIRED_ON}`}</Text>
      </View>
    </View>
  );
}
