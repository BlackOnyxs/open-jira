import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '../../context/ui';


export const NavBar = () => {

    const { openSideMenu } = useContext( UIContext );

    return (
      <AppBar position='sticky'>
          <Toolbar>
              <IconButton
                  size='large'
                  edge='start'
                  onClick={ openSideMenu }
              >
                  <MenuOutlinedIcon />
              </IconButton>

                <Link 
                    href='/' 
                    underline='none' 
                    color='white' 
                    component={NextLink}
                >
                    <Typography variant='h6'>OpenJira</Typography>
                </Link>
          </Toolbar>
      </AppBar>
    )
}
