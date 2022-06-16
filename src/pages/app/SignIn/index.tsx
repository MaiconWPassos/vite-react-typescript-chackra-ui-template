import useAuth from "@/hooks/useAuth";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { signIn, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "email@email.com",
      password: "123456",
    },
  });

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/app");
    }
  }, [user]);

  function onSubmit(values: FormValues) {
    signIn({ ...values });
  }
  return (
    <Stack
      minH={"calc(100vh - 60px - 64px)"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"purple.500"}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={"purple"}
              variant={"solid"}
              type="submit"
              isLoading={isSubmitting}
            >
              {t("btnLoginLabel")}
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
