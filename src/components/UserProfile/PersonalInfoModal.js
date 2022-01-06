import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import AppInput from '../AppInput';
import { togglePersonalInfoModal } from '../../redux/modals/actions';
import colors from '../../constants/colors';
import images from '../../constants/images';

export default function PersonalInfoModal() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { personalInfoModalVisible },
  } = state;

  const hide = () => {
    dispatch(togglePersonalInfoModal(false));
  };

  const handleSave = () => {
    // dispatch(submitTrade());
    hide();
  };

  const children = (
    <>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.99}>
          <AppInput style={styles.inputContainer} label="First Name" />
          <AppInput style={styles.inputContainer} label="Last Name" />
          <AppInput style={styles.inputContainer} label="Address" />

          <View style={styles.dropdown}>
            <View style={styles.subtext}>
              <AppText body style={styles.secondary}>
                Country
              </AppText>
            </View>

            <Image source={images.GEO} />
            <AppText medium style={styles.dropdownText}>
              Georgia
            </AppText>
            <Image source={images.Arrow} />
          </View>

          <View style={styles.row}>
            <AppInput
              style={[styles.inputContainer, styles.rowInputs]}
              label="City"
            />
            <AppInput
              style={[styles.inputContainer, styles.rowInputs]}
              label="Postal Code"
              onChangeText={(t) => setValue(t)}
              value={value}
            />
          </View>

          <View style={styles.dropdown}>
            <View style={styles.subtext}>
              <AppText body style={styles.secondary}>
                Citizenship
              </AppText>
            </View>

            <Image source={images.GEO} />
            <AppText medium style={styles.dropdownText}>
              Georgia
            </AppText>
            <Image source={images.Arrow} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Pressable onPress={handleSave} style={styles.button}>
        <AppText medium style={styles.buttonText}>
          Save
        </AppText>
      </Pressable>
    </>
  );

  return (
    <AppModal
      visible={personalInfoModalVisible}
      hide={hide}
      fullScreen
      title="Personal Information"
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: colors.PRIMARY_PURPLE,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  dropdownText: {
    flex: 1,
    marginHorizontal: 12,
    color: colors.PRIMARY_TEXT,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#42475D',
    paddingHorizontal: 15,
  },
  flex: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInputs: {
    width: '47%',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  subtext: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    left: -5,
    top: -7,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 8,
  },
});
