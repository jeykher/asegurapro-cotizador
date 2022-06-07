import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from '../PDF/comparePDFStyles';

export default function ConditionProposalCard() {
  return (
    <View style={styles.cardConditional} wrap={false}>
      <View style={styles.rowTitlePlan}>
        <Text style={styles.titleCard}>
          Condiciones particulares de la propuesta
        </Text>
      </View>
      <View style={styles.textCondition}>
        <View style={styles.rowDataAdvisor}>
          <Text style={styles.boldText}>Nota:</Text>
          <Text>
            - Vehículo sujeto a inspección y No implica la aceptación del
            Riesgo.
          </Text>
        </View>
      </View>
    </View>
  );
}
