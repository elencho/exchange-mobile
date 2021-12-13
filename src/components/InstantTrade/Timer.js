import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ProgressBar from 'react-native-animated-progress';

import AppText from '../AppText';

export default function Timer() {
  const [seconds, setSeconds] = useState(90);

  useEffect(() => {
    if (!seconds) setSeconds(90);

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
    return (100 / 90) * seconds;
  };

  return (
    <>
      <ProgressBar
        backgroundColor="#0CCBB5"
        trackColor="rgba(131, 157, 180, 0.23)"
        height={3}
        progress={progress(seconds)}
      />
      <AppText style={styles.text} subtext body>
        Price update in {timeFormat(seconds)}
      </AppText>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#0CCBB5',
    marginTop: 10,
  },
});
