import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { toggleChooseCardModal } from '../../redux/modals/actions';
import { setCard } from '../../redux/trade/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';
import ModalTop from '../ModalTop';

export default function ChooseCardModal() {
  const dispatch = useDispatch();
  const chooseCardModalVisible = useSelector(
    (state) => state.modals.chooseCardModalVisible
  );
  const card = useSelector((state) => state.trade.card);

  const hide = () => {
    dispatch(toggleChooseCardModal(false));
  };

  const choose = (c) => {
    dispatch(setCard(c));
  };

  const mockArray = ['000004****0026', '600004****1672', '268004****0010'];

  return (
    <AppModal visible={chooseCardModalVisible} hide={hide}>
      <ModalTop />

      <View style={styles.container}>
        <AppText header style={styles.header}>
          Choose Card
        </AppText>

        {mockArray.map((c, i) => (
          <Pressable
            style={[
              styles.row,
              c === card && { backgroundColor: 'rgba(101, 130, 253, 0.16)' },
            ]}
            key={c}
            onPress={() => choose(c)}
          >
            <View style={styles.iconContainer}>
              <Image source={i === 1 ? images.Visa : images.MC_Card} />
            </View>
            <AppText body style={styles.text}>
              {c}
            </AppText>
          </Pressable>
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
  iconContainer: {
    width: 35,
    height: 25,
    backgroundColor: 'rgba(146, 142, 186, 0.16)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
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
  },
});