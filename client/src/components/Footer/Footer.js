import { Box, Stack, Text, Input, Button, Divider, Center } from '@chakra-ui/react'
import { MdFoodBank } from 'react-icons/md';
import { BsGithub, BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';
import { Icon } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'

export default function Footer() {

    // return <Box as="footer" >
    return <Box as="footer">

            <Stack direction="horizontal">
           
                    <Box display="flex" gap="20px" w="95%" alignItems="center" justifyContent={"space-between"} mt="35px">
                        
                            <Box display={"flex"} alignItems="center">
                                <IconButton marginLeft={'25px'} colorScheme='teal' aria-label='sharemeal' icon={<MdFoodBank />} size="xs" />
                                <Text fontSize={'md'} fontWeight={'bold'} margin={'8px'}>ShareMeal</Text>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <Text fontSize={'sm'} margin={'8px'} fontWeight={'bold'} whiteSpace="nowrap">Contact Us:</Text>
                                <Input placeholder="Your Email" fontSize={'xs'} margin={'8px'} size="xs" />
                                <Input placeholder="Message" fontSize={'xs'} margin={'8px'} size="xs" />
                            </Box>

                            <Box display="flex" alignItems="center" gap="8px;">
                                <Text fontSize={'sm'} margin={'8px'} fontWeight={'bold'} whiteSpace="nowrap">Follow Us: </Text>
                                <IconButton colorScheme='pink' aria-label='instagram' icon={<BsInstagram />} size="xs" />
                                <IconButton colorScheme='blue' aria-label='linked in' icon={<BsLinkedin />} size="xs" />
                                <IconButton colorScheme='blue' aria-label='twitter' icon={<BsTwitter />} size="xs" />
                            </Box>
                    </Box>
            </Stack>

            <Divider color="grey" borderColor="grey" borderWidth={"1px"} mt="0px" mb="0px"/>

            <Stack>
                <Box>
                    <Text fontSize='xs' marginLeft={'25px'}> © 2023 ShareMeal. ShareMeal Marketing Agency Phoenix, Arizona. All Rights Reserved.</Text>
                </Box>
            </Stack>
    </Box>
}