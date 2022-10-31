import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import images from '../../../constants/images';
import colors from '../../../constants/colors';
import AppText from '../../AppText';
import { toggleChooseNetworkModal } from '../../../redux/modals/actions';
import { ICONS_URL_PNG } from '../../../constants/api';
import { setNetwork } from '../../../redux/wallet/actions';

export default function ChooseNetworkDropdown({ disabled = false, whitelist }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { hasMultipleNetworks, network, walletTab },
    trade: { currentBalanceObj },
    transactions: { code },
    modals: { addWhitelistModalVisble },
  } = state;

  const cur = currentBalanceObj;
  const [iconDimensions, setIconDimensions] = useState({});
  const [icon, setIcon] = useState(null);

  const uri = `${ICONS_URL_PNG}/${network}.png`;

  useEffect(() => {
    if (network && network !== 'MAINNET') {
      Image.getSize(uri, (w, h) => {
        setIconDimensions({ width: 18 * (w / h), height: 18 });
      });
    } else {
      setIconDimensions({ width: 18, height: 18 });
    }

    cur?.depositMethods?.WALLET?.forEach((m) => {
      if (m.provider === network) setIcon(m.iconName);
    });
  }, [network, code]);

  useEffect(() => {
    if (addWhitelistModalVisble) dispatch(setNetwork(null));
  }, [addWhitelistModalVisble]);

  const handleDropdown = () => dispatch(toggleChooseNetworkModal(true));

  const m = walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';
  const isAvailable = !!Object.keys(cur[m]).length;

  const networkName = () => {
    if (network === 'ERC20') return 'Ethereum Network';
    if (network === 'BEP20') return 'Binance Smart Chain';
    if (network === 'MAINNET') {
      return cur[m].WALLET[0].displayName;
    }
    return network;
  };

  const backgroundColor =
    colors[whitelist ? 'PRIMARY_BACKGROUND' : 'SECONDARY_BACKGROUND'];

  return (
    <>
      {isAvailable && (
        <>
          {hasMultipleNetworks ? (
            <Pressable
              style={[styles.dropdown, { opacity: disabled ? 0.5 : 1 }]}
              onPress={handleDropdown}
              disabled={disabled}
            >
              {network !== 'Choose Network' ? (
                <>
                  <View style={[styles.subtext, { backgroundColor }]}>
                    <AppText body style={styles.secondary}>
                      Choose Network
                    </AppText>
                  </View>
                  <Image
                    source={{ uri }}
                    style={[styles.image, iconDimensions]}
                  />
                  <AppText medium style={styles.dropdownText}>
                    {networkName()}{' '}
                    <AppText style={styles.secondary}>({network})</AppText>
                  </AppText>
                </>
              ) : (
                <AppText style={[styles.secondary, { flex: 1 }]}>
                  {network}
                </AppText>
              )}
              <Image source={images.Arrow} />
            </Pressable>
          ) : (
            <View style={styles.view}>
              {icon && (
                <Image
                  source={{ uri }}
                  style={[styles.image, styles.iconDimensions]}
                />
              )}
              <AppText medium style={styles.dropdownText}>
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
    color: colors.PRIMARY_TEXT,
  },
  view: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(149, 164, 247, 0.04)',
    paddingHorizontal: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#42475D',
    paddingHorizontal: 15,
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
  },
});
