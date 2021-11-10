import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function FilterRow({ array = [''], multiselect = false }) {
  const [filter, setFilter] = useState(array[0]);
  const [multiFIlter, setMultiFilter] = useState([]);

  const handleFilter = (filter) => {
    if (multiselect) {
      setMultiFilter([...multiFIlter, filter]);
    } else {
      setFilter(filter);
    }
  };

  const filterConditional = () => {};

  return (
    <View style={styles.filterRow}>
      {array.map((fil) => (
        <Pressable
          key={fil}
          style={[
            styles.filterButton,
            filter === fil && { backgroundColor: 'rgba(74, 109, 255, 0.18)' },
          ]}
          onPress={() => handleFilter(fil)}
        >
          <Text style={[styles.text, filter === fil && { color: '#6582FD' }]}>
            {fil}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 40,
    backgroundColor: 'rgba(31, 31, 53, 0.9)',
    marginRight: 5,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: '#696F8E',
  },
});
