import {
  Button,
  Center,
  Modal,
  ModalBody,
  Box,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FaExclamation, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface ModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonMessage: string;
  onClick: () => void;
  secondaryText: string;
}
export const ModalSuccess = ({
  isOpen,
  onClose,
  buttonMessage,
  message,
  onClick,
  secondaryText,
}: ModalSuccessProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent p="2" bg="white" color="gray.800">
      <ModalHeader display="flex">
        <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Text fontWeight="bold" ml="2">
          Yesss...
        </Text>
        <Center
          onClick={onClose}
          as="button"
          ml="auto"
          w="32px"
          h="32px"
          bg="red.600"
          fontSize="large"
          borderRadius="md"
        >
          <FaTimes color={theme.colors.white} />
        </Center>
      </ModalHeader>

      <ModalBody textAlign="center">
        <Text>
          <Box
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          />
        </Text>
      </ModalBody>

      <ModalFooter flexDirection="column">
        <Button
          bg="purple.500"
          color="white"
          h="60px"
          w="100%"
          onClick={onClick}
          _hover={{ bg: "purple.600" }}
        >
          {buttonMessage}
        </Button>
        <Text alignItems="center" mt="4">
          <Box
            dangerouslySetInnerHTML={{
              __html: secondaryText,
            }}
          />
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
