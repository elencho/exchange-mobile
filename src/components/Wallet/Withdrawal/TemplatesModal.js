import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleTemplatesModal } from '../../../redux/modals/actions';
import {
  chooseTemplate,
  setIban,
  setWithdrawalBank,
} from '../../../redux/wallet/actions';
import AppModal from '../../AppModal';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';

export default function TemplatesModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { templatesModalVisible },
    wallet: { templates, currentTemplate },
  } = state;

  useEffect(() => {
    dispatch(setWithdrawalBank({}));
  }, [currentTemplate]);

  const hide = () => dispatch(toggleTemplatesModal(false));

  const deleteTemplate = () => {};
  const choose = (t) => {
    dispatch(chooseTemplate(t));
    dispatch(setIban(t.iban));
    hide();
  };

  const background = (t) => {
    if (t.templateName === currentTemplate.templateName) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1)' };
    }
  };

  const children = (
    <>
      {templates.map((t) => (
        <View style={[styles.template, background(t)]} key={t.id}>
          <Pressable style={styles.flex} onPress={() => choose(t)}>
            <AppText medium style={styles.white}>
              {t.templateName}
            </AppText>
            <AppText subtext style={styles.subtext}>
              {t.iban}
            </AppText>
          </Pressable>

          <Pressable onPress={deleteTemplate} style={styles.icon}>
            <Image source={images.Delete} />
          </Pressable>
        </View>
      ))}

      <View
        style={[styles.template, background({ templateName: 'New Template' })]}
      >
        <Pressable
          style={styles.flex}
          onPress={() => choose({ templateName: 'New Template' })}
        >
          <PurpleText text="Add New Bank" />
          <AppText subtext style={styles.subtext}>
            Other Provider
          </AppText>
        </Pressable>

        <Pressable style={styles.icon}>
          <Image source={images.Add} />
        </Pressable>
      </View>
    </>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      bottom
      visible={templatesModalVisible}
      title="Choose or Add"
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  icon: {
    width: 18,
    alignItems: 'center',
  },
  template: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginHorizontal: -18,
    height: 60,
    alignItems: 'center',
    borderRadius: 5,
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginTop: 5,
  },
  white: {
    color: colors.PRIMARY_TEXT,
  },
});
