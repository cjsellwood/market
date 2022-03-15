import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

interface CustomInputProps {
  value: string;
  id: string;
  label: string;
  error: string;
  isRequired?: boolean;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  textArea?: boolean;
}

const CustomInput = ({
  value,
  id,
  label,
  error,
  isRequired,
  type,
  onChange,
  textArea,
}: CustomInputProps) => {
  return (
    <Flex direction="column">
      <FormControl isInvalid={error !== ""}>
        <FormLabel htmlFor={id} marginBottom="1">
          {label}{" "}
          {isRequired && (
            <Text as="span" color="red">
              *
            </Text>
          )}
        </FormLabel>
        {textArea ? (
          <Textarea id={id} value={value} onChange={onChange} resize={"none"} />
        ) : (
          <Input id={id} value={value} onChange={onChange} type={type} />
        )}
        <Text color="red.500" fontSize="14px" h="16px" marginTop="1">
          {error}
        </Text>
      </FormControl>
    </Flex>
  );
};

export default CustomInput;
