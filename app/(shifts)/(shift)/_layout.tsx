import { Stack } from "expo-router";

type Props = {};
const _layout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="shift" />
    </Stack>
  );
};
export default _layout;
