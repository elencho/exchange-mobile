import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from 'expo-local-authentication';

export const handleAuth = async () => {
  const compatible = await hasHardwareAsync();
  const enrolled = await isEnrolledAsync();

  if (enrolled && compatible) {
    const result = await authenticateAsync({
      promptMessage: 'Log in with fingerprint or faceid',
      cancelLabel: 'Abort',
      fallbackLabel: 'Uupss',
      //   disableDeviceFallback: true,
    });
    console.log(result);
  }
};
