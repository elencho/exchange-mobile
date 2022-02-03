import React from 'react';
import { QRCode, Canvas } from 'easyqrcode-react-native';

export default function QrCode({ options }) {
  const generateQRCode = (canvas) => new QRCode(canvas, options);
  return <Canvas ref={generateQRCode} />;
}
