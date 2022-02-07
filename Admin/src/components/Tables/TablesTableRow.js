import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React ,{ useState, useEffect } from "react";
import axios from "axios"
function TablesTableRow(props) {
  const { logo, name, email, subdomain, domain, connected, date ,_id ,banned } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("green.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const [toggleban, setToggleban] = useState(banned);

 
  const toggle = ()=>{
    
  
   setToggleban(!toggleban)
  }
  
  const ban = (_id) =>{
    
    console.log(_id)
  
     axios.put(`http://localhost:5000/admin/ban/${_id}`)
       .then(({data}) => console.log(data) ,
      toggle())
        
      }
  const unban = (_id) =>{
    setTimeout(() =>{
    console.log(_id)
      
      axios.put(`http://localhost:5000/admin/unban/${_id}`)
       .then(({data}) => console.log(data) ,
          toggle())
            },3000)
          }
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {domain}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {subdomain}
          </Text>
        </Flex>
      </Td>
      <Td>
        {connected ? <Badge
          bg= "green.600" 
          color="white" 
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
          marginLeft="-10px"

        >
          online
        </Badge> : 
         <Badge 
           bg="red"
          color="white"
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
          marginLeft="-10px"

        >
          offline
        </Badge>}
       
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      <Td>
      {banned ? <Button p="0px" bg="transparent" variant="no-hover" onClick={ ()=>{unban(_id)}} >
          <Text
            fontSize="md"
            color="green.400"
            fontWeight="bold"
            cursor="pointer"
          >
            unban
          </Text>
        </Button> : <Button p="0px" bg="transparent" variant="no-hover" onClick={ ()=>{ban(_id)}} >
          <Text
            fontSize="md"
            color="red.400"
            fontWeight="bold"
            cursor="pointer"
          >
            ban
          </Text>
        </Button>}
      
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
