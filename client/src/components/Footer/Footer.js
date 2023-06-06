import { Box, Stack, Text, Input, Button,Divider } from '@chakra-ui/react'
import { MdFoodBank } from 'react-icons/md';
import {BsGithub, BsLinkedin, BsTwitter, BsInstagram} from 'react-icons/bs';
import { Icon } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'

export default function Footer(){


 
  

    return <Box as="footer" >
        
            
        <Stack direction="horizontal">
            
           
            
                
                <Box display="flex" gap="20px" w="100%" alignItems="center" justifyContent={"space-between"}>

                <Box display={"flex"}>  
                        <IconButton margin='8px' colorScheme='purple' aria-label='instagram' icon=  {<MdFoodBank />} />
                        <Text fontSize={'30px'} fontWeight={'bold'} margin={'8px'}>ShareMeal</Text> 
                    
                </Box>


                <Box display="flex" alignItems="center">
                
                <Text fontSize={'20px'} margin={'8px'} fontWeight={'bold'} marginLeft={'28px'} whiteSpace="nowrap">Contact Us:</Text>
                <Input placeholder="Your Email" margin={'8px'}/>
                <Input placeholder="Message" margin={'8px'}/>  

                </Box>  
                
                <Box display="flex" alignItems="center" gap="10px;">
                <Text fontSize={'20px'} margin={'8px'} fontWeight={'bold'} marginLeft={'28px'} whiteSpace="nowrap">Follow Us: </Text>
                <IconButton  colorScheme='pink' aria-label='instagram' icon={<BsInstagram />} />
                <IconButton  colorScheme='blue' aria-label='linked in' icon={<BsLinkedin />} />
                <IconButton colorScheme='blue' aria-label='twitter' icon={<BsTwitter />} />
                </Box> 
                
                </Box>
            
        
        </Stack>
        <Divider color="black" borderColor="black" borderWidth={"1px"} mt="10px"/>
        <Stack>
            <Box>
                <Text fontSize='xs'> © 2023 ShareMeal. ShareMeal Marketing Agency Phoenix, Arizona. All Rights Reserved.</Text> 

            </Box>
        </Stack>
        
  
 
        
        
 
    </Box>
}