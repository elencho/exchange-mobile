import { StyleProp } from 'react-native'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { SvgUri } from 'react-native-svg'

type Props = {
	src: string
	style?: StyleProp<ImageStyle>
	// TODO: Refactor this
	svgSize?: {
		width: number
		height: number
	}
}

export function AppImage({ src, style, svgSize }: Props) {
	if (src.endsWith('.svg')) {
		return <SvgUri uri={src} width={svgSize?.width} height={svgSize?.height} />
	} else {
		return <FastImage source={require(src)} style={style} />
	}
}
