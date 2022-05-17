import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import colors from '../../constants/colors';
import images from '../../constants/images';

import AppText from '../AppText';
import PurpleText from '../PurpleText';

export default function CheckMarks() {
  const [terms, setTerms] = useState(false);
  const [age, setAge] = useState(false);
  const [updates, setUpdates] = useState(false);

  const image = (type) => {
    if (type === 'terms' && terms) return images.Check_Full;
    if (type === 'age' && age) return images.Check_Full;
    if (type === 'updates' && updates) return images.Check_Full;
    return images.Check_Empty;
  };

  const toggle = (type) => {
    if (type === 'terms') setTerms(!terms);
    if (type === 'age') setAge(!age);
    if (type === 'updates') setUpdates(!updates);
  };

  const text = (type) => {
    if (type === 'terms')
      return (
        <AppText style={styles.white}>
          Agree to <PurpleText text="Terms & Conditions" />
        </AppText>
      );
    if (type === 'age')
      return <AppText style={styles.grey}>I'm over 18 years old</AppText>;
    if (type === 'updates')
      return (
        <AppText style={styles.grey}>Receive e-mail updates & news</AppText>
      );
  };

  return (
    <View style={styles.container}>
      {['terms', 'age', 'updates'].map((c) => (
        <View style={styles.row} key={c}>
          <Pressable style={styles.image} onPress={() => toggle(c)}>
            <Image source={image(c)} />
          </Pressable>
          {text(c)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 50,
    height: 130,
    justifyContent: 'space-between',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 29,
  },
  grey: {
    color: '#B7BFDB',
  },
  white: {
    color: colors.PRIMARY_TEXT,
  },
});
