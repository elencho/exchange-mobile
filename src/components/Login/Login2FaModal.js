import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import { toggleLogin2FaModal } from '../../redux/modals/actions';
import images from '../../constants/images';

export default function Login2FaModal() {
  const dispatch = useDispatch();
  const login2FaModalVisible = useSelector(
    (state) => state.modals.login2FaModalVisible
  );

  const hide = () => dispatch(toggleLogin2FaModal(false));

  const children = (
    <ImageBackground
      source={images.Background}
      style={{ flex: 1 }}
    ></ImageBackground>
  );

  return (
    <AppModal
      custom
      children={children}
      hide={hide}
      visible={login2FaModalVisible}
    />
  );
}

const styles = StyleSheet.create({});
