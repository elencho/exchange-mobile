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
  const uri = `${ICONS_URL_PNG}/${network}.png`;

  const cur = currentBalanceObj;

  const m = walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';
  const fiat = cur?.type === 'FIAT';

  const [icon, setIcon] = useState(null);

  useEffect(() => {
    cur?.depositMethods?.WALLET?.forEach((m) => {
      if (m?.provider === network) setIcon(m.iconName);
    });
  }, [network, code]);

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
    if (network === 'ERC20') return 'Ethereum Network';
    if (network === 'BEP20') return 'Binance Smart Chain';
    if (network === 'MAINNET') {
      return cur[m].WALLET[0].displayName;
    }
    return network;
  };

  const dropdown = {
    opacity: disabled ? 0.5 : 1,
    borderColor: error && !network ? '#F45E8C' : '#42475D',
  };
  const dropdownText = {
    color: error && !network ? '#F45E8C' : colors.PRIMARY_TEXT,
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
              style={[styles.dropdown, style]}
              icon={renderIcon(network)}
              handlePress={handleDropdown}
              error={error && !network}
              selectedText={
                network && <AppText medium>{networkName()}</AppText>
              }
            />
          ) : (
            <View style={styles.view}>
              {icon && (
                <Image
                  source={{ uri }}
                  style={[styles.image, styles.iconDimensions]}
                />
              )}
              <AppText medium style={[styles.dropdownText, dropdownText]}>
                {networkName()}{' '}
                <AppText style={styles.secondary}>({network})</AppText>
              </AppText>
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
  },
  view: {
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
  subtext: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    left: -5,
    top: -8,
    paddingHorizontal: 8,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
