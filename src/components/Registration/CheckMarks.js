import React from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import PurpleText from '../PurpleText';
import colors from '../../constants/colors';
import images from '../../constants/images';
import { setRegistrationInputs } from '../../redux/profile/actions';

export default function CheckMarks() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { registrationInputs },
  } = state;

  const i = registrationInputs;
  const set = (obj) => dispatch(setRegistrationInputs({ ...i, ...obj }));

  const image = (type) => {
    if (type === 'terms' && i.acceptTerms === 'on') return images.Check_Full;
    if (type === 'age' && i.acceptAgeRequirement === 'on')
      return images.Check_Full;
    if (type === 'updates' && i.getEmailUpdates === 'on')
      return images.Check_Full;
    return images.Check_Empty;
  };

  const toggle = (type) => {
    if (type === 'terms')
      set({ acceptTerms: i.acceptTerms !== 'on' ? 'on' : 'off' });
    if (type === 'age')
      set({
        acceptAgeRequirement: i.acceptAgeRequirement !== 'on' ? 'on' : 'off',
      });
    if (type === 'updates')
      set({ getEmailUpdates: i.getEmailUpdates !== 'on' ? 'on' : 'off' });
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
