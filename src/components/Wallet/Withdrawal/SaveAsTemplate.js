import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import images from '../../../constants/images';
import {
  saveTemplateAction,
  setNewTemplateName,
} from '../../../redux/wallet/actions';
import AppInput from '../../AppInput';
import AppText from '../../AppText';

export default function SaveAsTemplate() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    wallet: { saveTemplate, newTemplateName },
  } = state;

  const image = () => (saveTemplate ? images.Check_Full : images.Check_Empty);
  const toggle = () => dispatch(saveTemplateAction(!saveTemplate));
  const handleNewTemplate = (t) => dispatch(setNewTemplateName(t));

  return (
    <>
      <View style={styles.row}>
        <Pressable style={styles.image} onPress={toggle}>
          <Image source={image()} />
        </Pressable>
        <AppText style={styles.text}>Save as Template</AppText>
      </View>

      {saveTemplate && (
        <AppInput
          value={newTemplateName}
          label="Template Name"
          onChangeText={handleNewTemplate}
          style={styles.input}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginLeft: 10,
    marginTop: -15,
    marginBottom: 15,
  },
  text: {
    color: '#B7BFDB',
    marginLeft: 13,
  },
});
