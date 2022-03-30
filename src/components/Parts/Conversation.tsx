import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import useInput from "../../hooks/useInput";
import { Message } from "../../store/productSlice";
import { sendMessage } from "../../store/productThunks";
import CustomInput from "./CustomInput";

const Conversation = ({
  messages,
  product_id,
  author_id,
}: {
  messages: Message[];
  product_id: number;
  author_id: number;
}) => {
  const { userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const message = useInput("", "message", "Message", {
    isRequired: true,
    maxLength: 1000,
  });

  // Send new message
  const submitMessage = async () => {
    const isValid = message.isValid();

    if (!isValid) {
      return;
    }

    // Render immediately
    const messageText = message.value;
    message.setValue("");
    const receiverId = messages[0].sender;
    const result = await dispatch(
      sendMessage({
        text: messageText,
        product_id: product_id,
        sender: author_id === userId ? author_id : userId!,
        receiver: author_id === userId ? receiverId : author_id,
      })
    );
    window.scrollTo({ left: 0, top: 100000000000000, behavior: "smooth" });

    // If failed to save message reset to before submit
    if (result.meta.requestStatus !== "fulfilled") {
      message.setValue(messageText);
    }
  };

  return (
    <React.Fragment>
      {messages.map((message: Message, i: number) => (
        <Flex
          direction="column"
          key={"message" + i}
          border="1px solid gray"
          m="1"
          p="1"
          borderRadius="4"
          marginLeft={message.sender !== author_id ? "8" : "1"}
          marginRight={message.sender === author_id ? "8" : "1"}
        >
          <Text wordBreak="break-word">{message.text}</Text>
          <Flex fontSize="sm">
            {new Date(message.time).toLocaleTimeString("en-US")}{" "}
            {new Date(message.time).toLocaleDateString()}
          </Flex>
        </Flex>
      ))}
      <Flex direction="column" p="1">
        <CustomInput
          id={message.id}
          value={message.value}
          placeholder="Make an offer or ask a question"
          label={message.label}
          error={message.error}
          onChange={message.onChange}
          textArea
          hideLabel
        />
        <Button
          colorScheme="green"
          w="fit-content"
          m="1"
          onClick={submitMessage}
          alignSelf="flex-end"
          aria-label="send message"
        >
          Send
        </Button>
      </Flex>
    </React.Fragment>
  );
};

export default Conversation;
