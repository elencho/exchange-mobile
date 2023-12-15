export default (token) => `
<html>
<head>
<title>WebSDK CDN Example</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
 </head>
 <body>
	<script src="https://static.sumsub.com/idensic/static/sns-websdk-builder.js"></script>
	<div id="sumsub-websdk-container"></div>
</body>
</html>
<script>

function launchWebSdk(accessToken, applicantEmail, applicantPhone) {
    let snsWebSdkInstance = snsWebSdk.init(
            accessToken,
            () => null
        )
        .withBaseUrl('https://api.sumsub.com')
        .withConf({
            lang: 'en',
            onMessage: (type, payload) => {
                console.log('WebSDK onMessage', type, payload)
            },
            
            onError: (error) => {
                console.error('WebSDK onError', error)
            },
        })
        .withOptions({ addViewportTag: false, adaptIframeHeight: true})
        .on('stepCompleted', (payload) => {
            console.log('stepCompleted', payload)
        })
        .on('onError', (error) => {
            console.log('onError', payload)
        })
        .onMessage((type, payload) => {
            console.log('onMessage', type, payload)
        })
        .build();
    snsWebSdkInstance.launch('#sumsub-websdk-container')
}

    launchWebSdk("${token}")
</script>
`
