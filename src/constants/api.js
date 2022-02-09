export const bearer =
  'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyYWFJQ0Y2Ny0tbndKZVRrRFNKUXo3Uk1KNERzUXFiVHR1c0Z0SFNnaFZnIn0.eyJqdGkiOiJjYmU0Nzk4Yy01YmM0LTQ0MGMtYTVjMi1iYjJmZDYyMDc1ZWYiLCJleHAiOjE2NTMwNTE5OTUsIm5iZiI6MCwiaWF0IjoxNjQ0NDExOTk1LCJpc3MiOiJodHRwOi8vMTAuMTAuNS40OjgwODEvYXV0aC9yZWFsbXMvR0VYIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImE3Yjk1ZGM2LTlhYTgtNGYzYS1hZjdkLTZlNDYxMDczNGEwNSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImdleC1zZXJ2aWNlLXB1YmxpYyIsImF1dGhfdGltZSI6MTY0NDQxMTkzNywic2Vzc2lvbl9zdGF0ZSI6ImNiY2E1ZGRiLWY1ZjYtNDEyMy1hYjVjLWYxN2Q0ZWYzYWUxYSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ2ZXJpZmllZC1jdXN0b21lciIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iLCJjdXN0b21lciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc0xpbWl0ZWRUb2tlbiI6dHJ1ZSwiUm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ2ZXJpZmllZC1jdXN0b21lciIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iLCJjdXN0b21lciJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJpbWV0cmV2QGNyeXB0eC5jb20iLCJvdHBUeXBlIjoiVE9UUCIsImVtYWlsIjoiaW1ldHJldkBjcnlwdHguY29tIn0.DxjL4gEdtx3hy2lsY7AklXzTTEyG9N7jCcq9Oj6LwTPkRKSq_xKiYnlzKnqyvnP3cuV0ER4jNByD7-uaYOr_ELFqwal4jj35yFcVNRqfBfFEXFprqY2yvjVlAIxM-qGSNYDzbU4Es1P7i31BzCT44GPqCwGwcbJdxLlz_Xsyb0JUCrSEaxLJimy-vrKAXL5opwdRj61XvUARu-PME1jSzX1Ev9T5gyCJ2Kh1Wj2DykBRUUNAScINteHokzwZ2bWxfR5yd_NDi_5xjXMDMHqsNb3eq6Z6z9EmIMOqdNiJhkwObl399Rz1D6xSufOkjYTOnfr8uCeHJC1fDCZq52Rypg';

export const TRANSACTIONS_URL =
  'http://10.10.5.4:8080/exchange/api/v1/mobile/private/account/transactions';

export const CURRENCIES_URL =
  'http://10.10.5.4:8080/exchange/api/v1/mobile/public/currencies';

export const COUNTRIES_URL =
  'http://10.10.5.4:8080/exchange/api/v1/public/countries';

export const TRADES_URL =
  'http://10.10.5.4:8080/exchange/api/v1/mobile/private/simpleTrade/trades';

export const OFFERS_URL =
  'http://10.10.5.4:8080/exchange/api/v1/mobile/private/simpleTrade/offers';

export const BALANCE_URL =
  'http://10.10.5.4:8080/exchange/api/v1/mobile/private/account/balance';

export const CARDS_URL =
  'http://10.10.5.4:8080/exchange/api/v1/mobile/private/account/cards';

export const CALCULATE_FEE_URL =
  'http://10.10.5.4:8080/exchange/api/v1/private/account/calculateFee';

export const USER_INFO_URL =
  'http://10.10.5.4:8080/exchange/api/v1/private/account/userInfo';

export const SUBSCRIBE_EMAIL_URL =
  'http://10.10.5.4:8080/exchange/api/v1/private/account/subscribeToEmailUpdates';

export const UNSUBSCRIBE_EMAIL_URL =
  'http://10.10.5.4:8080/exchange/api/v1/private/account/unsubscribeFromEmailUpdates';

export const UPDATE_USER_DATA =
  'http://10.10.5.4:8080/exchange/api/v1/private/users/updateUserData';

export const UPDATE_PASSWORD =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/updatePassword';

export const VERIFY_PHONE_NUMBER =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/verifyPhoneNumber';

export const UPDATE_PHONE_NUMBER =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/updatePhoneNumber';

export const SEND_OTP =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/sendOTP';

export const OTP_CHANGE_TOKEN =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/getOTPChangeParams';

export const EMAIL_VERIFICATION =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/sendEmailVerification';

export const ACTIVATE_EMAIL_OTP =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/enableEmailTwoFA';

export const ACTIVATE_GOOGLE_OTP =
  'http://10.10.5.4:8081/auth/realms/GEX/GEX-resource/enableTotpTwoFA';
