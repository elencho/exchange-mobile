import React from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import PurpleText from '../PurpleText';
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
    if (type === 'acceptTerms' && i.acceptTerms === 'on')
      return images.Check_Full;
    if (type === 'updates' && i.getEmailUpdates === 'on')
      return images.Check_Full;
    return images.Check_Empty;
  };

  const toggle = (type) => {
    if (type === 'acceptTerms')
      set({ acceptTerms: i.acceptTerms !== 'on' ? 'on' : 'off' });
    if (type === 'updates')
      set({ getEmailUpdates: i.getEmailUpdates !== 'on' ? 'on' : 'off' });
  };

  const text = (type) => {
    if (type === 'acceptTerms')
      return (
        <AppText style={styles.text}>
          I'm over 18 years old and agree to{' '}
          <PurpleText text="Terms & Conditions" />
        </AppText>
      );
    if (type === 'updates')
      return (
        <AppText style={styles.text}>Receive e-mail updates & news</AppText>
      );
  };

  return (
    <View style={styles.container}>
      {['acceptTerms', 'updates'].map((c, i, a) => (
        <View
          style={[styles.row, { marginTop: i === a.length - 1 ? 20 : 0 }]}
          key={c}
        >
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
  },
  text: {
    color: '#B7BFDB',
    lineHeight: 20,
    flex: 1,
  },
});
