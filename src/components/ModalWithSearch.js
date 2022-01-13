import React from 'react';
import { FlatList, Image, StyleSheet, TextInput, View } from 'react-native';

import AppText from './AppText';
import ModalTop from './ModalTop';
import ModalSearchItem from './ModalSearchItem';
import images from '../constants/images';
import colors from '../constants/colors';

export default function ModalWithSearch({
  array,
  filter,
  choose,
  currentItem,
  crypto = false,
}) {
  const handlePress = (name, code) => {
    crypto ? choose(code) : choose(name, code);
  };

  const searchItem = ({ item }) => (
    <ModalSearchItem
      name={item.name}
      code={item.code}
      key={item.code}
      currentItem={currentItem}
      onPress={() => handlePress(item.name, item.code)}
    />
  );

  return (
    <View style={styles.container}>
      <ModalTop />

      <View style={styles.block}>
        <AppText medium style={styles.headline}>
          Choose Currency
        </AppText>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search Currency"
            placeholderTextColor="rgba(105, 111, 142, 0.5)"
            style={styles.input}
            onChangeText={filter}
          />
          <Image source={images.Search} />
        </View>

        <FlatList
          data={array}
          renderItem={searchItem}
          keyExtractor={(item) => item.code}
          scrollEventThrottle={1000}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 40,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 20,
    color: colors.PRIMARY_TEXT,
  },
  inputContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    height: '100%',
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
    flex: 1,
    marginRight: 10,
  },
});
