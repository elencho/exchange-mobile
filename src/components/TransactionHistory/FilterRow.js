import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import AppText from '../AppText';
import colors from '../../constants/colors';

export default function FilterRow({ array = [''], multiselect = false }) {
  const [filter, setFilter] = useState(array[0]);
  const [multiFIlter, setMultiFilter] = useState([array[0]]);

  const handleFilter = (filter) => {
    if (multiselect && !multiFIlter.includes(filter)) {
      setMultiFilter([...multiFIlter, filter]);
    } else if (multiselect && multiFIlter.includes(filter)) {
      let newMultiFilter = multiFIlter.filter((f) => filter !== f);
      setMultiFilter(newMultiFilter);
    } else {
      setFilter(filter);
    }
  };

  const filterConditional = (fil) => {
    if (!multiselect) {
      return filter === fil;
    } else {
      return multiFIlter.includes(fil);
    }
  };

  return (
    <View style={styles.filterRow}>
      {array.map((fil) => (
        <Pressable
          key={fil}
          style={[
            styles.filterButton,
            filterConditional(fil) && {
              backgroundColor: 'rgba(74, 109, 255, 0.18)',
            },
          ]}
          onPress={() => handleFilter(fil)}
        >
          <AppText
            style={[
              styles.text,
              filterConditional(fil) && { color: colors.SECONDARY_PURPLE },
            ]}
          >
            {fil}
          </AppText>
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
    color: colors.SECONDARY_TEXT,
  },
});
