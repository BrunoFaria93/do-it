import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";
import { GoBackButton } from "./goBackButton";
import { api } from "../../services/api";
import { ModalSuccess } from "../../components/Modal/ModalSuccess";
import { ModalError } from "../../components/Modal/ModalError";
import { useHistory } from "react-router-dom";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const history = useHistory();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });
  const {
    isOpen: isModalSucccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const handleSignup = ({ name, email, password }: SignUpData) => {
    setLoading(true);
    api
      .post("/users", { name, email, password })
      .then((response) => {
        setLoading(false);
        onModalSuccessOpen();
      })
      .catch((err) => {
        setLoading(false);
        onModalErrorOpen();
      });
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });
  return (
    <>
      <ModalSuccess
        buttonMessage="Ir para o login agora"
        message="Seu cadastro deu super certo, <b>vamos lá</b>!"
        secondaryText="Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo..."
        onClick={() => {
          history.push("/");
        }}
        isOpen={isModalSucccessOpen}
        onClose={onModalSuccessClose}
      />
      <ModalError
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
        error="Seu email já está em uso"
        secondaryText="Você já pode tentar novamente, <b>clicando</b> no botão acima ou aguarde alguns minutos..."
      />
      <Flex
        padding={["10px 15px", "10px 15px", "0px", "0px"]}
        alignItems="center"
        justifyContent="center"
        height={["auto", "auto", "100vh", "100vh"]}
        bgGradient={[
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
        ]}
        color="white"
      >
        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "row", "row"]}
          alignItems="center"
        >
          {isWideVersion ? (
            <>
              <GoBackButton top="75" left="24" />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loading={loading}
                register={register}
              />
              <SignupInfo />
            </>
          ) : (
            <>
              <GoBackButton top="10" left="75vw" />
              <SignupInfo />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loading={loading}
                register={register}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
