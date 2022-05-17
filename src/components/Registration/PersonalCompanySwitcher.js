import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { switchPersonalCompany } from '../../redux/profile/actions';
import colors from '../../constants/colors';
import images from '../../constants/images';
import AppButton from '../AppButton';

export default function PersonalCompanySwitcher() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { Personal_Company },
  } = state;

  const handleSwitch = (type) => dispatch(switchPersonalCompany(type));

  const backgroundColor = (type) => {
    if (type === Personal_Company) {
      return colors.PRIMARY_PURPLE;
    } else {
      return 'rgba(101, 130, 253, 0.1)';
    }
  };

  const User = () => <Image source={images.User} />;
  const Portfolio = () => <Image source={images.Portfolio} />;

  return (
    <View style={styles.switchers}>
      <AppButton
        left={<User />}
        style={styles.switcher}
        text="Personal"
        backgroundColor={backgroundColor('Personal')}
        onPress={() => handleSwitch('Personal')}
      />
      <AppButton
        left={<Portfolio />}
        style={styles.switcher}
        text="Company"
        backgroundColor={backgroundColor('Company')}
        onPress={() => handleSwitch('Company')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switcher: {
    borderRadius: 21,
    width: '48%',
  },
  switchers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
