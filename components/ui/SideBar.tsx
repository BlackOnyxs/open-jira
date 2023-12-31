import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { UIContext } from '../../context/ui';

const menuItems = ['Inbox', 'Starred', 'Send Email', 'Drafts'];
export const SideBar = () => {
    const { sidemenuOpen, closeSideMenu } = useContext( UIContext );
    return (
        <Drawer 
            anchor="left"
            open={sidemenuOpen}
            onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px'}}>
                    <Typography variant='h4'>Menu</Typography>
                </Box>
                <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItemButton key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={ text }/>
                            </ListItemButton>
                        ))
                    }
                </List>

                <Divider />

                <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItemButton key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={ text }/>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Box>

        </Drawer>
    )
}
