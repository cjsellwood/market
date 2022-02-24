import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface CustomInputProps {
  initialValue: string;
  id: string;
  label: string;
}

const CustomInput = ({ initialValue, id, label }: CustomInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState("");

  return (
    <Flex direction="column">
      <FormControl isInvalid={isInvalid}>
        <FormLabel htmlFor={id}>
          {label}{" "}
          <Text as="span" color="red">
            *
          </Text>
        </FormLabel>
        <Input
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsInvalid(false);
          }}
        />
        {isInvalid && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Flex>
  );
};

export default CustomInput;
