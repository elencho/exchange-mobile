import React from 'react';
import { FlatList, Image, StyleSheet, TextInput, View } from 'react-native';

import AppText from './AppText';
import ModalTop from './ModalTop';
import ModalSearchItem from './ModalSearchItem';
import images from '../constants/images';
import colors from '../constants/colors';
import { COINS_URL_SVG, COUNTRIES_URL_PNG } from '../constants/api';

export default function ModalWithSearch({
  array,
  filter,
  choose,
  currentItem,
  crypto = false,
  title,
  phoneCountry,
  type,
}) {
  const handlePress = (name, code) => {
    crypto ? choose(code) : choose(name, code);
  };

  const uri = (code) => {
    return title === 'Choose Currency'
      ? `${COINS_URL_SVG}/${code.toLowerCase()}.svg`
      : `${COUNTRIES_URL_PNG}/${code}.png`;
  };

  const searchItem = ({ item }) => (
    <ModalSearchItem
      name={item.name}
      code={item.code}
      key={item.code}
      phoneCode={item.phoneCode}
      currentItem={currentItem}
      onPress={() => handlePress(item.name, item.code)}
      // uri={uri(item.code)}
      type={type}
      phoneCountry={phoneCountry}
    />
  );

  return (
    <View style={styles.container}>
      <ModalTop />

      <View style={styles.block}>
        <AppText medium style={styles.headline}>
          {title}
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
          initialNumToRender={25}
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
