import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import colors from '../../constants/colors';
import { setNetwork } from '../../redux/wallet/actions';
import AppButton from '../../components/AppButton';
import WithdrawalInputs from '../../components/Wallet/Withdrawal/WithdrawalInputs';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import WithdrawalInfo from '../../components/Wallet/Withdrawal/WithdrawalInfo';
import SaveAsTemplate from '../../components/Wallet/Withdrawal/SaveAsTemplate';
import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import GeneralError from '../../components/GeneralError';
import AppInfoBlock from '../../components/AppInfoBlock';
import { infos, warnings } from '../../constants/warningsAndInfos';
import { fetchFee, setCard, setFee } from '../../redux/trade/actions';
import { MaterialIndicator } from 'react-native-indicators';
import { validateAmount } from '../../utils/appUtils';
import WithKeyboard from '../../components/WithKeyboard';
import WithdrawalConfirmModal from '../../components/Wallet/Withdrawal/WithdrawalConfirmModal';

export default function Withdrawal({ refreshControl }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    trade: { currentBalanceObj, card, depositProvider, cardsLoading },
    transactions: { code, loading },
    wallet: {
      withdrawalRestriction,
      currentWhitelistObj,
      currentTemplate,
      withdrawalBank,
      iban,
      hasMultipleMethods,
      network,
      withdrawalAmount,
      whitelistLoading,
    },
  } = state;

  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);
  const [error, setError] = useState(false);

  const isFiat = currentBalanceObj.type === 'FIAT';
  const isEcommerce = network === 'ECOMMERCE';
  const walletInfo = () => {
    if (currentBalanceObj?.infos && hasMethod && !hasRestriction) {
      return currentBalanceObj?.infos[network]?.walletInfo;
    }
  };

  useEffect(() => {
    const m = currentBalanceObj.withdrawalMethods;

    if (m.ECOMMERCE) {
      dispatch(setNetwork('ECOMMERCE'));
    } else {
      if (m.WALLET) dispatch(setNetwork(m.WALLET[0].provider));
      if (m.WIRE) dispatch(setNetwork(m.WIRE[0].provider));
    }

    setHasMethod(!!Object.keys(m).length);
  }, [code]);

  useEffect(() => {
    dispatch({ type: 'CLEAN_WALLET_INPUTS' });
    dispatch(setFee(null));
    if (isEcommerce && card && depositProvider) {
      dispatch(fetchFee('withdrawal'));
    }
  }, [network, depositProvider, card]);

  useEffect(() => {
    setHasRestriction(Object.keys(withdrawalRestriction).length);
  }, [withdrawalRestriction]);
  useEffect(() => {
    return () => dispatch(setCard(null));
  }, []);

  useEffect(() => {
    error && setError(false);
  }, [
    depositProvider,
    card,
    withdrawalAmount,
    currentWhitelistObj,
    currentTemplate,
    withdrawalBank,
    iban,
  ]);

  const withdraw = () => {
    const length = Object.keys(currentWhitelistObj)?.length;
    const notEmpty = currentTemplate?.templateName || (iban && withdrawalBank);

    let condition;
    if (isEcommerce) {
      condition =
        !validateAmount(withdrawalAmount) || !card || !depositProvider;
    } else if (isFiat) {
      condition = !validateAmount(withdrawalAmount) || !notEmpty;
    } else {
      condition = !validateAmount(withdrawalAmount) || !length;
    }

    if (condition) {
      setError(true);
    } else {
      dispatch({
        type: 'TOGGLE_WITHDRAWAL_CONFIRM_MODAL',
        withdrawalConfirmModalVisible: true,
      });
    }
  };

  const saveTemplateCheck = () => {
    return (
      currentTemplate.templateName === 'New Template' &&
      Object.keys(withdrawalBank).length
    );
  };

  const reason = () => {
    if (withdrawalRestriction.reason) {
      return withdrawalRestriction.reason;
    }
    return 'METHOD';
  };

  return (
    <>
      {cardsLoading || loading || whitelistLoading ? (
        <MaterialIndicator color="#6582FD" animationDuration={3000} />
      ) : (
        <WithKeyboard flexGrow padding refreshControl={refreshControl}>
          <View style={styles.block}>
            {/* <GeneralError style={{ marginBottom: 16 }} /> */}
            <WalletCoinsDropdown />
            {(!isFiat || code === 'EUR') && <ChooseNetworkDropdown />}
            {isFiat && hasMultipleMethods && (
              <>
                <TransferMethodDropdown />
                <TransferMethodModal />
                {network === 'SWIFT' && (
                  <AppInfoBlock content={warnings.swift.withdrawal} warning />
                )}
                {network === 'SEPA' && (
                  <AppInfoBlock content={warnings.sepa} warning />
                )}
                {network === 'ECOMMERCE' && (
                  <AppInfoBlock content={infos.ecommerce.withdrawal} info />
                )}
              </>
            )}

            {walletInfo() && <AppInfoBlock content={[walletInfo()]} warning />}
          </View>

          {!hasRestriction && isFiat && hasMethod && !isEcommerce && (
            <WithdrawalInfo error={error} />
          )}
          {!hasRestriction && hasMethod && (
            <WithdrawalInputs
              error={error}
              isFiat={isFiat}
              hasRestriction={hasRestriction}
            />
          )}
          {saveTemplateCheck() ? <SaveAsTemplate /> : null}

          {hasRestriction || !hasMethod ? (
            <FlexBlock
              type="Withdrawal"
              reason={reason()}
              restrictedUntil={withdrawalRestriction.restrictedUntil}
            />
          ) : null}

          {!hasRestriction &&
            hasMethod && ( // Button
              <AppButton
                text="Withdrawal"
                onPress={withdraw}
                style={styles.button}
              />
            )}
        </WithKeyboard>
      )}
      <WithdrawalConfirmModal />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  button: {
    marginHorizontal: 15,
  },
});
