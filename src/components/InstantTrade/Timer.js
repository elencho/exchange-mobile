import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from 'react-native-animated-progress';

import AppText from '../AppText';
import { fetchOffers } from '../../redux/trade/actions';

export default function Timer() {
  const dispatch = useDispatch();
  const tradeType = useSelector((state) => state.trade.tradeType);
  const [seconds, setSeconds] = useState(90);

  useEffect(() => {
    if (!seconds) {
      dispatch(fetchOffers());
      setSeconds(90);
    }

    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const timeFormat = (duration) => {
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = '';

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  };

  const progress = (seconds) => {
    return 100 - (100 / 90) * seconds;
  };

  const trackColor = tradeType === 'Buy' ? '#0CCBB5' : '#E0355D';
  const min = timeFormat(seconds).split(':')[0];
  const sec = timeFormat(seconds).split(':')[1];

  return (
    <>
      <ProgressBar
        backgroundColor={trackColor}
        trackColor="rgba(131, 157, 180, 0.23)"
        height={3}
        progress={progress(seconds)}
      />
      <AppText style={{ marginTop: 10, color: '#C0C5E0' }} subtext body>
        Price update in {min}:
        <AppText style={seconds <= 30 && { color: '#FA6392' }}>{sec}</AppText>
      </AppText>
    </>
  );
}
