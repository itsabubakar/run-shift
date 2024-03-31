import { Stack } from "expo-router"

type Props = {}
const _layout = (props: Props) => {
    return <Stack
        screenOptions={{
            headerShown: false
        }}

    >
        <Stack.Screen name="settings" />
        <Stack.Screen name="weather" />
    </Stack>

}
export default _layout