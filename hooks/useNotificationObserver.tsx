import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

import React from "react";

function useNotificationObserver() {
  const router = useRouter();

  React.useEffect(() => {
    let isMounted = true;

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted) {
        return;
      }

      console.log("response", response);
      const resp = response?.notification.request.content.data?.notification;
      if (resp) {
        console.log("route to oen shift");
        router.push("/(shifts)/openShifts");
      }
    });

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content;
        console.log("url", url);
        console.log("route to open shift in this function");
        setTimeout(() => {
          router.push("/(shifts)/openShifts");
        }, 1);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

export default useNotificationObserver;
