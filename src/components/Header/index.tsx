import { Flex, Image, Heading, useDisclosure, Center } from "@chakra-ui/react";
import Logo from "../../assets/logo-mini.svg";
import { Menu } from "./Menu";
import { FaTh } from "react-icons/fa";
import { theme } from "../../styles/theme";
export const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Flex
      borderBottom="1px"
      borderBottomColor="#f5f5f5"
      paddingX="8"
      paddingY="2"
    >
      <Flex align="center">
        <Image src={Logo} />
        <Heading ml="4" size="lg">
          Dashboard
        </Heading>
      </Flex>
      <Center ml="auto" onClick={onToggle} as="button" fontSize="2rem">
        <FaTh color={theme.colors.gray[300]}/>
      </Center>
      <Menu isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
