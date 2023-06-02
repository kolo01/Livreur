import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { app, db, storage } from "@/Firebase/Connexion";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";


const Inscription = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  //recuperation des champs
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [name, setName] = useState();

  const toast = useToast();
  const router = useRouter();
  const createUSer = async () => {
    if (password == password2) {
      //hachage ici

      //fin hachage

      // create a pointer to our Document
      const _user = doc(db, `Livreur/${email}`);
      // structure the todo data
      const Users = {
        name,
        number,
        email,
        password,
      };
      await setDoc(_user, Users)
        .then(() => {
          toast({
            title: "INSCRIPTION VALIDEE",
            description: "veuillez vous connecter",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "VERIFIER LES CHAMPS/VOUS AVEZ UN COMPTE",
            description: "SVP VERIFIER VOS DONNEES ",
            status: "error",
            duration: 7000,
            isClosable: true,
          });
        });
      router.push("/");
    } else {
      console.log("okay la");
      toast({
        title: "MAUVAISE SAISIE",
        description: "MOT DE PASSE NON IDENTIQUE",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  ///upload image

  return (
    <>
      <Box
        mt={"-90px"}
     
        pb={20}
        // bgImage={"3.jpg"}
        bgSize={"cover"}
        
        height={"fit-content"}
      >
        {/* le main  */}
        <Center width={"100%"} pb={60} pt={-5}>
          {/* la premier box grise  */}
          <Flex
            width={{ base: "50%", md: "50%", xl: "50%"}}
            mt={"190px"}
            // bg={"#dee2e6"}
            borderRadius={"2em"}
            direction={"column"}
          >
            {/* premiere ligne  */}
            <Stack
              w={"100%"}
              h={"4em"}
              direction={"row"}
              mt={"1em"}
              alignItems={"center"}
            >
                <Box ml={"1em"}  h={'5em'} w={'8em'} >
             <Image src="/logo1.png" alt={'logo de chap'}/>
            </Box>
              <Center w={"full"}>
                <Text
                  color={"#0077b6"}
                  fontWeight={"bold"}
                  fontSize={{ base: "1em", sm: "2em" }}
                >
                  BIENVENUE TRES CHERS LIVREURS
                </Text>
              </Center>
            </Stack>

            {/* les deux inputs  */}
         
            <Flex w={"100%"} alignItems={"center"} justifyContent={"center"}>
          

              <Flex
                w={"50%"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                  <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    VOTRE NOM
                  </Text>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="votre nom"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    isRequired
                  ></Input>
                </Stack>
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    VOTRE NUMERO
                  </Text>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="Numero de la structure"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setNumber(e.target.value)}
                    type="number"
                    isRequired
                  ></Input>
                </Stack>
              </Flex>
              {/* input Nom */}

              <Flex
                w={"50%"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                {/* input email */}
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    E-mail
                  </Text>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="votre e-mail"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    isRequired
                  ></Input>
                </Stack>

                {/* input mot de pass */}
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    Mot de Passe
                  </Text>
                  <InputGroup>
                    <Input
                      w={"100%"}
                      h={"4em"}
                      bg={"#fff"}
                      borderRadius={"full"}
                      placeholder="mot de passe"
                      _placeholder={{ color: "#000" }}
                      type={show ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      _valid={{ border: "1px solid red" }}
                      isRequired
                    ></Input>

                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        w={"fit-content"}
                        size="sm"
                        mt={5}
                        mr={5}
                        onClick={handleClick}
                      >
                        {show ? "Afficher" : "Masquer"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Stack>
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    Confirmation du Mot de Passe
                  </Text>
                  <InputGroup>
                    <Input
                      w={"100%"}
                      h={"4em"}
                      bg={"#fff"}
                      borderRadius={"full"}
                      placeholder="mot de passe"
                      _placeholder={{ color: "#000" }}
                      type={show ? "text" : "password"}
                      onChange={(e) => setPassword2(e.target.value)}
                      _valid={{ border: "1px solid red" }}
                      isRequired
                    ></Input>

                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        w={"fit-content"}
                        size="sm"
                        mt={5}
                        mr={5}
                        onClick={handleClick}
                      >
                        {show ? "Afficher" : "Masquer"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Stack>
              </Flex>
              {/* input email */}
            </Flex>

            <Center
              mt={"2em"}
              w={"100%"}
              h={{ base: "3em" }}
              _hover={{ textDecoration: "none" }}
            >
              <Link
                w={"50%"}
                h={{ base: "3em" }}
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  w={"full"}
                  h={"full"}
                  colorScheme="blue"
                  borderRadius={"full"}
                  fontSize={"1.5em"}
                  onClick={() => {
                    createUSer();
                  }}
                >
                  Inscription
                </Button>
              </Link>
            </Center>
            <Center>
              <Flex alignContent={"center"} textAlign={"center"}>
                <Text
                  color={"#0077b6"}
                  fontWeight={"bold"}
                  mt={"1em"}
                  _hover={{ textDecoration: "none" }}
                >
                  VOUS AVEZ DEJA UN COMPTE?{" "}
                </Text>
                <Link
                  href="/"
                  color={"#0077b6"}
                  fontWeight={"bold"}
                  mt={"1em"}
                  _hover={{ textDecoration: "none", color: "messenger.400" }}
                >
                  Connectez-vous
                </Link>
              </Flex>
            </Center>
          </Flex>
        </Center>
      </Box>
    </>
  );
};

export default Inscription;
