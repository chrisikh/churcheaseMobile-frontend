import * as Notifications from "expo-notifications";

const sendPushNotification = async (token, message) => {
  console.log("Sending push notification o:", token);
  console.log("Message:", message);
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      to: token,
      ...message,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://exp.host/--/api/v2/push/send", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // const response = await fetch("https://exp.host/--/api/v2/push/send", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Accept-Encoding": "gzip, deflate",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     to: token,
    //    // sound: "default",
    //     title: message.title,
    //     body: message.body,
    //     //data: message.data,
    //   }),
    // });

    if (!response) {
      throw new Error("No response from fetch request");
    }

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Network response was not ok: ${errorData}`);
    }

    const data = await response.json();
    if (data.errors) {
      console.log("Error sending push notification:", data.errors);
      throw new Error(data.errors);
    }
    console.log("Push notification response:", data);
    return data;
  } catch (error) {
    console.log("Error in sendPushNotification:", error);
    throw error;
  }
};

export { sendPushNotification };
