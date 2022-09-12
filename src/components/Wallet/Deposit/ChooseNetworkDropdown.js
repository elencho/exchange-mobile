import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import images from '../../../constants/images';
import colors from '../../../constants/colors';
import AppText from '../../AppText';
import { toggleChooseNetworkModal } from '../../../redux/modals/actions';
import { COINS_URL_PNG, ICONS_URL_PNG } from '../../../constants/api';

export default function ChooseNetworkDropdown({ disabled = false }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { hasMultipleNetworks, network, walletTab },
    trade: { currentBalanceObj },
    transactions: { code },
  } = state;

  const [iconDimensions, setIconDimensions] = useState({});

  useEffect(() => {
    Image.getSize(uri(network), (w, h) => {
      setIconDimensions({ width: 18 * (w / h), height: 18 });
    });
  }, [network]);

  const handleDropdown = () => dispatch(toggleChooseNetworkModal(true));

  const m = walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';
  const isAvailable = !!Object.keys(currentBalanceObj[m]).length;

  const networkName = () => {
    if (network === 'ERC20') return 'Ethereum Network';
    if (network === 'BEP20') return 'Binance Smart Chain';
    if (network === 'MAINNET') {
      return currentBalanceObj[m].WALLET[0].displayName;
    }
    return network;
  };

  const uri = (network) => `${ICONS_URL_PNG}/${network}.png`;

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
                  <View style={styles.subtext}>
                    <AppText body style={styles.secondary}>
                      Choose Network
                    </AppText>
                  </View>
                  <Image
                    source={{ uri: uri(network) }}
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
              <Image
                source={{ uri: `${COINS_URL_PNG}/${code.toLowerCase()}.png` }}
                style={[styles.image, styles.iconDimensions]}
              />
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
    marginHorizontal: 12,
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
    resizeMode: 'contain',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  subtext: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    left: -5,
    top: -7,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 8,
  },
});
