import { Stack } from "expo-router"

type Props = {}
const _layout = (props: Props) => {
    return <Stack
        screenOptions={{
            headerShown: false
        }}

    >
        <Stack.Screen name="shift" />
        {/* <Stack.Screen name="text" /> */}
    </Stack>

}
export default _layout