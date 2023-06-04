import {
  Avatar,
  Badge,
  Box,
  Button,
  Image,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { database } from "../Firebase/Connexion";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Valide({ items, email,id }) {
  // console.log(items.Status);
  if (items.Status == "Non livrée" && items.livreur  == email) {
    return (
      <>
        <Box
          maxW="fit-content"
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={items.imageUrl} alt={items.nom} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.nom}
            </Box>

            <Box>
              {items.totalPrice + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box>
              <Button bgColor={'red'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "ANNULE")}>
                ANNULER COMMANDE
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  } else {
    return <>
      {/* <Text>AUCUNE DONNEE</Text> */}
    </>;
  }
}

function Termine({ items, email,id }) {
  // console.log(items.Status);
  if (items.Status == "Livrée" && items.livreur  == email){
    return (
      <>
        <Box
          maxW="fit-content"
          display={"flex"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={items.imageUrl} alt={items.nom} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {items.Status}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {items.nom}
            </Box>

            <Box>
              {items.totalPrice + " "}
              <Box as="span" color="gray.600" fontSize="sm">
                €
              </Box>
            </Box>
            <Box>
              <Button bgColor={'red'} _hover={{
                bgColor:'#FF6969'
              }} color={'white'} onClick={() => Cancel2(id, "Livrée")}>
                LIVRÉE
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  } else {
    return <>
      {/* <Text>AUCUNE DONNEE</Text> */}
    </>;
  }
}


function Cancel2(id, state) {
  update(ref(db2, "Commandes/" + String(id)), {
    statutLivraison: state,
  });
}


export default function Daschboard() {
  const router= useRouter()
  const [col1, setCol1] = useState("blue");
  const [col2, setCol2] = useState("white");
  const [col3, setCol3] = useState("white");
  const [col4, setCol4] = useState("dark");
  const [commandeListe, setCommandeListe] = useState([]);
  const [id, setId] = useState();
  const [data,setData]=useState()
  const [email,setEmail]=useState()
  

  const Getall = async () => {
    const starCountRef = ref(database, "Commandes/");
    onValue(starCountRef, (snapshot) => {
      setCommandeListe(snapshot.val());
      if (snapshot.val() != undefined || snapshot.val() != null) {
        setId(Object.keys(snapshot.val()));
      }
    });
  };


  useEffect(() => {
    Getall()
    const exist = localStorage.getItem("user");

    if (exist) {
      setData(JSON.parse(exist));
      const all = JSON.parse(exist);
      setEmail(JSON.parse(exist));

      router.push("/Dashboard");
    } else {
      router.push("/");
    }
  },[setData,router]);
  const logout = () => {
    localStorage.clear("user");
  };

  return (
    <>
      <SimpleGrid
        display={"flex"}
        justifyContent={"space-between"}
        mb={5}
        borderBottom={"1px solid gray"}
      >
        <Image src="logo1.png" alt={"logo de chap"} h={"4em"} />
        <Box display={"flex"}>
          <Avatar name="kolo" />
          <Text mt={2}>{email}</Text>
        </Box>
      </SimpleGrid>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab
            bgColor={col1}
            color={col3}
            onClick={() => {
              setCol2("white"),
                setCol1("blue"),
                setCol4("black"),
                setCol3("white");
            }}
          >
            VALABLE
          </Tab>
          <Tab
            bgColor={col2}
            color={col4}
            onClick={() => {
              setCol1("white"),
                setCol2("green"),
                setCol3("black"),
                setCol4("white");
            }}
          >
            TERMINEE
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <Box as={SimpleGrid} columns={2} spacing={10}>
              {commandeListe ? (
                Object.values(commandeListe).map((items) => (
                  <Valide key={items.key} items={items} id={id} email={email} />
                ))
              ) : (
                <Box>Aucune donnee</Box>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
          <Box as={SimpleGrid} columns={2} spacing={10}>
              {commandeListe ? (
                Object.values(commandeListe).map((items) => (
                  <Termine key={items.key} items={items} id={id} email={email} />
                ))
              ) : (
                <Box>Aucune donnee</Box>
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
