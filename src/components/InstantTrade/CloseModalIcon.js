import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CloseModalIcon() {
  const modalRef = useSelector((state) => state.transactions.modalRef);

  const close = () => {
    modalRef.close();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={close}>
        <Image source={require('../../assets/images/Close.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  close: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { alignItems: 'flex-end' },
});
