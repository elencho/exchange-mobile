import React, { useLayoutEffect } from 'react';
import CardVerificationContent from '../components/CardVerificationContent';

export default function CardVerificationOne({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      animation: 'slide_from_bottom',
    });
  }, [navigation]);

  return <CardVerificationContent step={1} cardId={route.params.id} />;
}
