import { Stack } from "expo-router"

type Props = {}
const _layout = (props: Props) => {
    return <Stack
        screenOptions={{
            headerShown: false
        }}

    >
        <Stack.Screen name="noticeBoard" />
        <Stack.Screen name="text" />
    </Stack>

}
export default _layout