import React from 'react';
import { Text, Image, View } from '@react-pdf/renderer';
import LogoPiramide from '../../assets/static/logo-piramides.png';
import LogoOceanica from '../../assets/static/oceanica_original.png';

import styles from '../PDF/comparePDFStyles';

const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY;
const Logo = insuranceCompany === 'OCEANICA' ? LogoOceanica : LogoPiramide;

export default function HeaderPDF() {
  return (
    <View style={styles.header} fixed>
      <View style={styles.headerLogo}>
        <View style={styles.rowLogo}>
          <Image style={styles.logo} src={Logo} />
        </View>
        <View style={styles.rowDataHeader}>
          <Text>Av. Tamanaco, Edif. Impres, PB. Urb. EL Rosal.</Text>
        </View>
        <View style={styles.rowDataHeader}>
          <Text>Caracas, Distrito Capital</Text>
        </View>
        <View style={styles.rowDataHeader}>
          <Text>02129520733 - 02129520656 - 02129522268</Text>
        </View>
      </View>
      <View style={styles.headerInfo}>
        <View style={styles.rowDataHeader}>
          <Text>
            Inscrita en la Superintendencia de la Actividad Aseguradora bajo el
            N°80
          </Text>
        </View>
        <View style={styles.rowDataHeader}>
          <Text>Capital Suscrito Bs.1400</Text>
        </View>
        <View style={styles.rowDataHeader}>
          <Text>Capital Pagado Bs.1400</Text>
        </View>
        <View style={styles.rowDataHeader}>
          <Text>R.I.F J-00106474-5</Text>
        </View>
      </View>
    </View>
  );
}
