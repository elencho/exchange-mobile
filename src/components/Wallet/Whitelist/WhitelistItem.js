import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import images from '../../../constants/images';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { toggleWhitelistActionsModal } from '../../../redux/modals/actions';

export default function WhitelistItem({ id, name, address, tag }) {
  const dispatch = useDispatch();

  const openModal = () => dispatch(toggleWhitelistActionsModal(true));

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <AppText body style={styles.primary}>
          {name} {tag && `/ Tag: ${tag}`}
        </AppText>
        <AppText subtext style={styles.secondary}>
          {address}
        </AppText>
      </View>

      <TouchableOpacity onPress={openModal} style={styles.menu}>
        <Image source={images.Menu} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  flex: {
    flex: 1,
  },
  menu: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 5,
  },
});
