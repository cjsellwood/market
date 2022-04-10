import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
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

    let result;
    // If sent by the author of product
    if (author_id === userId) {
      const receiverId = messages[0].sender;
      result = await dispatch(
        sendMessage({
          text: messageText,
          product_id: product_id,
          sender: userId,
          receiver: receiverId,
        })
      );
      // If sent by user to author of product
    } else {
      result = await dispatch(
        sendMessage({
          text: messageText,
          product_id: product_id,
          sender: userId!,
          receiver: author_id,
        })
      );
    }

    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    // If failed to save message reset to before submit
    if (result.meta.requestStatus !== "fulfilled") {
      message.setValue(messageText);
    }
  };

  const buttonBackgroundColor = useColorModeValue("success", "transparent");
  const buttonTextColor = useColorModeValue("white", "success");
  const secondaryText = useColorModeValue("secondaryText", "secondaryTextDark");

  return (
    <React.Fragment>
      <Flex direction="column">
        {messages.map((message: Message, i: number) => (
          <Flex
            direction="column"
            key={"message" + i}
            m="1"
            marginLeft={message.sender === userId ? "12" : "1"}
            marginRight={message.sender !== userId ? "12" : "1"}
          >
            <Flex justifyContent={message.sender === userId ? "end" : "start"}>
              <Text
                wordBreak="break-word"
                color="white"
                bg={message.sender === userId ? "secondary" : "primary"}
                borderRadius="8"
                p="2.5"
              >
                {message.text}
              </Text>
            </Flex>
            <Flex
              paddingX="1"
              justifyContent={message.sender === userId ? "end" : "start"}
            >
              <Text fontSize="13px" fontWeight="300" color={secondaryText}>
                {new Date(message.time).toLocaleDateString()}{" "}
                {new Date(message.time)
                  .toLocaleTimeString("en-US")
                  .toLowerCase()}{" "}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Flex direction="column" marginLeft="12" paddingTop="2">
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
          marginBottom="1"
          marginTop="-4"
          onClick={submitMessage}
          alignSelf="flex-end"
          aria-label="send message"
          variant="submit-button"
          bg={buttonBackgroundColor}
          color={buttonTextColor}
        >
          Send
        </Button>
      </Flex>
    </React.Fragment>
  );
};

export default Conversation;
