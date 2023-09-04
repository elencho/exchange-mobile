import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  saveTemplateAction,
  setNewTemplateName,
} from '../../../redux/wallet/actions';
import AppInput from '../../AppInput';
import AppText from '../../AppText';

import CheckFull from '../../../assets/images/Check_Full.svg';
import CheckEmpty from '../../../assets/images/Check_Empty.svg';
import colors from '../../../constants/colors';

export default function SaveAsTemplate({ error }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    wallet: { saveTemplate, newTemplateName },
  } = state;

  const toggle = () => dispatch(saveTemplateAction(!saveTemplate));
  const handleNewTemplate = (t) => dispatch(setNewTemplateName(t));

  return (
    <>
      <View style={[styles.row, { marginBottom: saveTemplate ? 15 : 38 }]}>
        <Pressable style={styles.image} onPress={toggle}>
          {saveTemplate ? <CheckFull /> : <CheckEmpty />}
        </Pressable>
        <AppText style={styles.text}>Save as Template</AppText>
      </View>

      {saveTemplate && (
        <AppInput
          value={newTemplateName}
          label="Template Name"
          onChangeText={handleNewTemplate}
          style={styles.input}
          error={error && !newTemplateName?.trim()}
          labelBackgroundColor={colors.PRIMARY_BACKGROUND}
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
    marginBottom: 47,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginTop: -15,
  },
  text: {
    color: '#B7BFDB',
    marginLeft: 13,
  },
});
