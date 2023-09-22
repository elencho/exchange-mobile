import React from 'react';
import { Pressable, StyleSheet, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import {
  setStatusFilter,
  setTypeFilter,
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
  BUY: 'BID',
  SELL: 'ASK',
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
      if (transactionStatus?.includes(fil)) {
        dispatch(
          setStatusFilter(
            [...transactionStatus].filter((item) => !fil.includes(item))
          )
        );
      } else dispatch(setStatusFilter([...transactionStatus, fil]));
    } else if (filterType === 'type') {
      if (typeFilter.includes(fil)) {
        dispatch(setTypeFilter([...typeFilter].filter((item) => item !== fil)));
      } else {
        dispatch(setTypeFilter([...typeFilter, fil]));
      }
    }
  };
  const filterConditional = (fil) => {
    if (filterType === 'type') return typeFilter.includes(fil);
    if (filterType === 'method') return fil === method;
    if (filterType === 'statusTrade')
      return statusQuery?.includes(statusMapping[fil][0]);
    if (filterType === 'currency') return fiatCodesQuery.includes(fil);
    if (filterType === 'tradeAction')
      return actionQuery?.includes(tradeActionMapping[fil]);
    if (filterType === 'statusTransaction')
      return transactionStatus?.includes(fil);
  };

  const RenderItem = ({ item }) => {
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
        {(filterType === 'statusTrade' ||
          filterType === 'statusTransaction') && (
          <View style={{ marginRight: 6 }}>{statusIcons[item]}</View>
        )}
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
    <View style={styles.container}>
      {array.map((item, idx) => (
        <RenderItem item={item} key={`filterItem${idx}`} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  filterButton: {
    height: 34,
    minWidth: 78,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: 'rgba(31, 31, 53, 0.9)',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    color: '#c0c5e0',
    fontSize: 14,
  },
});
