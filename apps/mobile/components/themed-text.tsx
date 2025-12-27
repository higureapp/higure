import { StyleSheet, Text, type TextProps } from 'react-native'

import { Fonts } from '@/constants/theme'
import { useThemeColor } from '@/hooks/use-theme-color'

export type ThemedTextProps = TextProps & {
    lightColor?: string
    darkColor?: string
    type?:
        | 'default'
        | 'title'
        | 'defaultSemiBold'
        | 'subtitle'
        | 'link'
        | 'titleLight'
}

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return (
        <Text
            style={[
                { color: `${color}` },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'titleLight' ? styles.titleLight : undefined,
                style,
            ]}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    default: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        lineHeight: 24,
    },
    titleLight: {
        fontFamily: Fonts.regular,
        fontSize: 24,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontFamily: Fonts.semibold,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        fontFamily: Fonts.light,
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
})
