import React ,{ useState, useEffect } from "react";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import { tablesProjectData, tablesTableData } from "variables/general";
import axios from "axios"
import moment from "moment"


function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const [pharmacytable, setPharmaciestable] = useState([]);
  const [userstable, setUserstable] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/admin/getPharmacies')
    .then(({data}) =>{
      console.log(data);
     
      setPharmaciestable(data.pharmacies)
      setUserstable(data.users)
    }) 
  },[])
  
 

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Pharmacies Table
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                 Pharmacy
                </Th>
                <Th color="gray.400">Address</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Joined At</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
             
              {
              pharmacytable.map((row) => {
                return (
                  <TablesTableRow
                    name={row.username}
                    logo={row.logo}
                    email={row.email}
                    domain={row.location}
                    connected={row.connected}
                    date={moment(row.createdAt).format("MMM Do YY")}
                    
                    _id={row._id}
                    banned={row.banned} />  
                );
              })}

              
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <Card
        my="22px"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Users's Table
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th pl="0px" color="gray.400">
                  Users
                </Th>
                <Th color="gray.400">Phone Number</Th>
                <Th color="gray.400">Status</Th>
                
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {userstable.map((row) => {
                return (
                  <TablesProjectRow
                    name={row.name}
                    logo={row.logo}
                    email={row.email}
                    vip={row.vip}
                    budget={row.phoneNumber}
                    connected={row.connected}
                    _id={row._id}
                    banned={row.banned}/>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
    
  );
}
// // ban={ban(id => ban(_id) )}
export default Tables;
