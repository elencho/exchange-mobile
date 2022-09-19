import React, { useLayoutEffect } from 'react';
import CardVerificationContent from '../components/CardVerificationContent';

export default function CardVerificationTwo({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      animation: 'slide_from_right',
    });
  }, [navigation]);

  return <CardVerificationContent step={2} cardId={route.params.id} />;
}
