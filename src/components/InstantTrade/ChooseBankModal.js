import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { toggleChooseBankModal } from '../../redux/modals/actions';
import { setBank, setCard } from '../../redux/trade/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';
import ModalTop from '../ModalTop';

export default function ChooseBankModal() {
  const dispatch = useDispatch();
  const chooseBankModalVisible = useSelector(
    (state) => state.modals.chooseBankModalVisible
  );
  const bank = useSelector((state) => state.trade.bank);

  const hide = () => {
    dispatch(toggleChooseBankModal(false));
  };

  const choose = (b) => {
    dispatch(setBank(b));
  };

  const mockArray = ['TBC Bank', 'Bank of Georgia'];

  return (
    <AppModal visible={chooseBankModalVisible} hide={hide}>
      <ModalTop />

      <View style={styles.container}>
        <AppText header style={styles.header}>
          Choose Bank
        </AppText>

        {mockArray.map((b, i) => (
          <View key={b}>
            <Pressable
              style={[
                styles.row,
                b === bank && { backgroundColor: 'rgba(101, 130, 253, 0.16)' },
              ]}
              onPress={() => choose(b)}
            >
              <Image source={images.TBC} />
              <AppText body style={styles.text}>
                {b}
              </AppText>
            </Pressable>
            {i < mockArray.length - 1 && <View style={styles.margin} />}
          </View>
        ))}
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 25,
  },
  margin: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: -15,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    marginLeft: 15,
  },
});