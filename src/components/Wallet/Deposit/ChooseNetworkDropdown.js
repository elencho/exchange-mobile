import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../../AppText';

import colors from '../../../constants/colors';
import { toggleChooseNetworkModal } from '../../../redux/modals/actions';
import { setNetwork } from '../../../redux/wallet/actions';
import Euro from '../../../assets/images/Euro.svg';
import Card from '../../../assets/images/Card.svg';
import Bank from '../../../assets/images/LocalBank.svg';
import Arrow from '../../../assets/images/Arrow';
import { ICONS_URL_PNG } from '../../../constants/api';
import AppDropdown from '../../AppDropdown';

export default function ChooseNetworkDropdown({
  disabled = false,
  whitelist,
  error,
  style,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { hasMultipleNetworks, network, walletTab },
    trade: { currentBalanceObj },
    transactions: { code },
    modals: { addWhitelistModalVisble },
  } = state;
  // const uri = `${ICONS_URL_PNG}/${network}.png`;
  // const fiat = cur?.type === 'FIAT';

  const cur = currentBalanceObj;

  const m = walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';

  useEffect(() => {
    if (addWhitelistModalVisble && hasMultipleNetworks) {
      dispatch(setNetwork(null));
    }
  }, [addWhitelistModalVisble]);

  const handleDropdown = () => dispatch(toggleChooseNetworkModal(true));

  const isAvailable = () => {
    if (Object.keys(cur).length) {
      return !!Object.keys(cur[m]).length;
    }
    return false;
  };

  const networkName = () => {
    const currentNetwork = currentBalanceObj?.[m]?.WALLET?.filter(
      (item) => item.provider === network
    );
    return (
      <AppText medium body>
        {currentNetwork?.[0].displayName}
      </AppText>
    );
  };

  const NetworkWithTicker = () => (
    <AppText medium style={[styles.dropdownText, dropdownText]}>
      {networkName()}
      {'  '}
      <AppText
        style={[
          styles.secondary,
          disabled && { color: 'rgba(105, 111, 142, 0.4)' },
        ]}
      >
        ({network === 'MAINNET' ? code : network})
      </AppText>
    </AppText>
  );

  const dropdownText = {
    color: disabled ? colors.TEXT_DISABLED : colors.PRIMARY_TEXT,
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
      {isAvailable() && (
        <>
          {hasMultipleNetworks ? (
            <AppDropdown
              notClearable
              label="Choose Network"
              withLabel
              disabled={disabled}
              style={[styles.dropdown, style]}
              icon={renderIcon(network)}
              handlePress={handleDropdown}
              error={error && !network}
              selectedText={network && <NetworkWithTicker />}
            />
          ) : (
            <View style={styles.singleMethod}>
              <NetworkWithTicker />
            </View>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdownText: {
    flex: 1,
    marginRight: 12,
    gap: 6,
    color: colors.PRIMARY_TEXT,
  },
  singleMethod: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(149, 164, 247, 0.04)',
    paddingHorizontal: 22,
  },
  dropdown: {
    marginTop: 20,
  },
  iconDimensions: {
    width: 18,
    height: 18,
  },
  image: {
    marginLeft: 5,
    marginRight: 12,
    resizeMode: 'contain',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  ticker: { marginLeft: 6, color: colors.SECONDARY_TEXT },

  subtext: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    left: -5,
    top: -8,
    paddingHorizontal: 8,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
