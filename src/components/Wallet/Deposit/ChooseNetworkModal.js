import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import { toggleChooseNetworkModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { setNetwork, wireDepositAction } from '../../../redux/wallet/actions';
import { ICONS_URL_PNG } from '../../../constants/api';

export default function ChooseNetworkModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [networks, setNetworks] = useState([]);
  const [iconDimensions, setIconDimensions] = useState({});

  const {
    modals: { chooseNetworkModalVisible },
    wallet: { network, walletTab },
    trade: { currentBalanceObj },
    transactions: { code },
  } = state;

  const fiat = currentBalanceObj?.type === 'FIAT';

  const hide = () => dispatch(toggleChooseNetworkModal(false));
  const handlePress = (n) => {
    dispatch(setNetwork(n));

    if (fiat && network !== 'ECOMMERCE') {
      dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
      dispatch({ type: 'CLEAN_WALLET_INPUTS' });
    }
    hide();
  };

  const handleDimensions = () => {
    if (network && network !== 'MAINNET') {
      const uri = () => `${ICONS_URL_PNG}/${network}.png`;
      Image.getSize(uri(), (w, h) => {
        setIconDimensions({ width: 25 * (w / h), height: 25 });
      });
    } else {
      setIconDimensions({ width: 25, height: 25 });
    }
  };

  useEffect(() => {
    let networksToDisplay = [];
    const m =
      walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';
    const n = currentBalanceObj[m];

    if (n.WALLET) n.WALLET.forEach((n) => networksToDisplay.push(n));
    if (n.WIRE) n.WIRE.forEach((n) => networksToDisplay.push(n));
    setNetworks(networksToDisplay);

    handleDimensions();
    return () => setNetworks([]);
  }, [code]);

  const name = (n) => {
    if (n === 'ERC20') return 'Ethereum Network';
    if (n === 'BEP20') return 'Binance Smart Chain';
    return null;
  };

  const background = (m) => {
    if (m === network) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1)' };
    }
  };

  const children = (
    <>
      {networks.map((n, i) => (
        <Pressable
          style={[
            styles.network,
            background(n.provider),
            i === 1 && { marginBottom: -10 },
          ]}
          key={n.provider}
          onPress={() => handlePress(n.provider)}
        >
          <Image
            source={{ uri: `${ICONS_URL_PNG}/${n.provider}.png` }}
            style={[styles.image, iconDimensions]}
          />
          <View style={styles.name}>
            <AppText medium body style={styles.primary}>
              {name(n.provider) ?? n.provider}
            </AppText>

            {name(n.provider) ? (
              <AppText subtext style={styles.secondary}>
                {n.provider}
              </AppText>
            ) : null}
          </View>
        </Pressable>
      ))}
    </>
  );

  return (
    <AppModal
      visible={chooseNetworkModalVisible}
      hide={hide}
      title="Choose Network"
      bottom
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  image: { resizeMode: 'contain' },
  name: {
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  network: {
    flexDirection: 'row',
    height: 62,
    alignItems: 'center',
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 5,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
