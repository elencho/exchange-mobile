import React from 'react';
import { Pressable, StyleSheet, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import {
  filterAction,
  setStatusFilter,
} from '../../redux/transactions/actions';
import Pending from '../../assets/images/Status_Pending';
import Success from '../../assets/images/Status_Success';
import Failed from '../../assets/images/Status_Failed';
import {
  setFiatCodesQuery,
  setStatusQuery,
  setTradeActionQuery,
} from '../../redux/trade/actions';

const statusIcons = {
  SUCCESS: <Success />,
  PENDING: <Pending />,
  FAILED: <Failed />,
};
const statusMapping = {
  PENDING: ['PENDING', 'WAITING_DEPOSIT'],
  FAILED: ['FAILED', 'EXPIRED'],
  SUCCESS: ['COMPLETED'],
};
const tradeActionMapping = {
  BUY: 'ASK',
  SELL: 'BID',
};

export default function FilterRow({ array = [''], filterType }) {
  const dispatch = useDispatch();
  const transactionsState = useSelector((state) => state.transactions);
  const tradesState = useSelector((state) => state.trade);

  const { typeFilter, method, status: transactionStatus } = transactionsState;
  const {
    offset,
    limit,
    fromDateTimeQuery,
    toDateTimeQuery,
    statusQuery,
    actionQuery,
    cryptoCodeQuery,
    fiatCodesQuery,
  } = tradesState;

  const handleFilter = (fil) => {
    if (filterType === 'currency') {
      if (fiatCodesQuery.includes(fil)) {
        dispatch(
          setFiatCodesQuery([...fiatCodesQuery].filter((item) => item !== fil))
        );
      } else {
        dispatch(setFiatCodesQuery([...fiatCodesQuery, fil]));
      }
    } else if (filterType === 'tradeAction') {
      if (actionQuery.includes(tradeActionMapping[fil])) {
        dispatch(
          setTradeActionQuery(
            [...actionQuery].filter((item) => item !== tradeActionMapping[fil])
          )
        );
      } else
        dispatch(
          setTradeActionQuery([...actionQuery, tradeActionMapping[fil]])
        );
    } else if (filterType === 'statusTrade') {
      if (statusQuery.includes(statusMapping[fil][0])) {
        dispatch(
          setStatusQuery(
            [...statusQuery].filter(
              (item) => !statusMapping[fil].includes(item)
            )
          )
        );
      } else dispatch(setStatusQuery([...statusQuery, ...statusMapping[fil]]));
    } else if (filterType === 'statusTransaction') {
      transactionStatus === fil
        ? dispatch(setStatusFilter(''))
        : dispatch(setStatusFilter(fil));
    } else {
      dispatch(filterAction(fil, filterType));
    }
  };
  const filterConditional = (fil) => {
    if (filterType === 'type') return fil === typeFilter;
    if (filterType === 'method') return fil === method;
    if (filterType === 'statusTrade')
      return statusQuery.includes(statusMapping[fil][0]);
    if (filterType === 'currency') return fiatCodesQuery.includes(fil);
    if (filterType === 'tradeAction')
      return actionQuery?.includes(tradeActionMapping[fil]);
    if (filterType === 'statusTransaction') return fil === transactionStatus;
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={[
          styles.filterButton,
          filterConditional(item) && {
            backgroundColor: 'rgba(74, 109, 255, 0.18)',
          },
        ]}
        onPress={() => handleFilter(item)}
      >
        {filterType === 'statusTrade' ||
          (filterType === 'status' && statusIcons[item])}
        <AppText
          style={[
            styles.text,
            filterConditional(item) && { color: colors.SECONDARY_PURPLE },
          ]}
          medium={filterConditional(item)}
          body
        >
          {item}
        </AppText>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={array}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    height: 34,
    paddingHorizontal: 15,
    borderRadius: 40,
    backgroundColor: 'rgba(31, 31, 53, 0.9)',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  text: {
    color: colors.SECONDARY_TEXT,
  },
});
