import React from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';

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
}) {
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

        <ScrollView>
          {array.map((c) => (
            <ModalSearchItem
              name={c.name}
              code={c.code}
              key={c.code}
              currentItem={currentItem}
              onPress={() => choose(c.code, c.name)}
            />
          ))}
        </ScrollView>
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
