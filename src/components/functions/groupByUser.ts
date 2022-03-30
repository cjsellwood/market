import { Message } from "../../store/productSlice";

const groupByUser = (allMessages: Message[] = [], authorId: number) => {
  const messagesMap = new Map();
  for (let message of allMessages) {
    const userId =
      message.sender === authorId ? message.receiver : message.sender;
    const username = allMessages.find(
      (message) => message.sender === userId
    )?.senderName;

    if (!messagesMap.get(username)) {
      // Add new entry to map if it doesn't exist
      messagesMap.set(username, [message]);
    } else {
      // Add messages to users array
      messagesMap.set(username, [...messagesMap.get(username), message]);
    }
  }
  return messagesMap;
};

export default groupByUser;
