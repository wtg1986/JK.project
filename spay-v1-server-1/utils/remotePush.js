
const Expo = require('expo-server-sdk');
// Create a new Expo SDK client
let expo = new Expo();

const push = (objPush) => {
    let messages = []
    objPush.map((oj,i) => {
        Expo.isExpoPushToken(oj.pushToken) && 
        messages.push({
            to: oj.pushToken,
            sound: 'default',
            title: oj.title,
            body: oj.body,
            data: { action: 'xxx' },
        })
    })
    let chunks = expo.chunkPushNotifications(messages);

    (async () => {
        for (let chunk of chunks) {
          try {
            let receipts = await expo.sendPushNotificationsAsync(chunk);
            console.log(receipts);
          } catch (error) {
            console.error(error);
          }
        }
    })();
}
module.exports = push;

