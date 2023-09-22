import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { ICONS_URL_PNG } from '../../../constants/api';
import { toggleTransferMethodModal } from '../../../redux/modals/actions';

import Arrow from '../../../assets/images/Arrow';
import Euro from '../../../assets/images/Euro.svg';
import Card from '../../../assets/images/Card.svg';
import Bank from '../../../assets/images/LocalBank.svg';
import AppDropdown from '../../AppDropdown';

export default function TransferMethodDropdown() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const { network, walletTab, methodsToDisplay } = wallet;

  const show = () => dispatch(toggleTransferMethodModal(true));

  const isOneMethod = methodsToDisplay?.length < 2;
  const dropdownStyle = {
    backgroundColor: isOneMethod ? 'rgba(149, 164, 247, 0.04)' : null,
    borderWidth: isOneMethod ? 0 : 1,
  };
  const renderIcon = (network) => {
    if (network === 'ECOMMERCE') {
      return <Card />;
    }
    if (network === 'SWIFT') {
      return <Bank />;
    }
    if (network === 'SEPA') {
      return <Euro />;
    }
  };

  return (
    <>
      {!isOneMethod ? (
        <AppDropdown
          style={[styles.dropdown, dropdownStyle]}
          notClearable
          label={isOneMethod ? null : 'Choose provider'}
          withLabel={!isOneMethod}
          // disabled={isOneMethod}
          icon={renderIcon(network)}
          selectedText={network}
          handlePress={show}
          hideArrow={isOneMethod}
        />
      ) : (
        <View style={styles.singleMethod}>
          {renderIcon(network)}
          <AppText style={styles.singleText}>{network}</AppText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdownText: {
    flex: 1,
    marginHorizontal: 12,
    color: colors.PRIMARY_TEXT,
  },
  dropdown: {
    marginTop: 22,
  },
  image: {
    marginLeft: 5,
  },
  singleMethod: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(149, 164, 247, 0.04)',
    paddingHorizontal: 22,
  },
  singleText: {
    color: colors.PRIMARY_TEXT,
    marginLeft: 8,
  },
});
