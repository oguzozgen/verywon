import React,{Component, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Grommet,Text,Menu ,Grid} from 'grommet';
import { Notification, User, Yoga, Diamond,Login,Logout } from 'grommet-icons';
import ContainerLayout from './components/ContainerLayout/ContainerLayout';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../Router/Routes";

const linkStyle = {
    color:'#F2F2F2',
  font: {
    family: 'Roboto',
    size: '26px',
    height: '20px',      
  },
  };
  
  const theme = {
    global: {
      colors: {
          brand:'#738678',    
     }, 
      font: {
        family: 'Roboto',
        size: '26px',
        height: '20px',      
      },
    },
  };

  
const headerStyle = {
    display: 'flex',
    backgroundColor: '#26c6da',
    justifyContent: 'space-between',
    padding: 10,
  };  
const AppBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'small', right: 'small', vertical: 'small' }}
      elevation='small'
      margin='small'
      style={{ zIndex: '1' }}
      {...props}
    />
);

function Layout(props) {
    const [latlng, setLatlng] = useState((props.latlng!=null?props.latlng:[]));

      
    return (
            <div>                                
                  <Grommet theme={theme} full>
                    <Box fill>
                            <AppBar>
                              
                                    <Grid align="start">
                                        
                                    </Grid>
                                    <Grid align="center">                                         
                                          <Link style={linkStyle} to="/">
                                           verywon
                                          </Link>
                                    </Grid>
                                    <Grid align="end" direction='row'>

                                            {props.oidcUser || !props.isEnabled ? (
                                                      <Box direction='row'>
                                                            <Link style={linkStyle} to="/profile">
                                                            <User size="medium" title="Profile" color="light-2"/>
                                                            </Link>
                                                             <Link style={linkStyle} to="/Visualization">
                                                                  <Diamond size="medium" color="light-2" title="Visualization"/>
                                                            </Link>                                           
                                                             <Button onClick={props.logout}> <Logout size="medium" title="Logout" color="light-2"/></Button>
                                                        </Box>
                                                  ) : (
                                                            <Button onClick={props.login}> <Login size="medium" title="Login" color="light-2"/></Button>
                                                      )
                                              }

                                    </Grid>         
                            </AppBar>
                            <Box flex align='center' justify='start'>                                  
                                  <ContainerLayout>    

                                    
                                    <Routes />

                                    
                                 </ContainerLayout>                                 
                            </Box>
                        </Box>
                    </Grommet>
            </div>
            
    );

}

export default Layout;


/* 
        <Menu
        dropProps={{ align: { top: "bottom", left: "left" } }}
        label="actions"
        items={[
        { label: "Homr", onClick: () => { <Link style={linkStyle} to="/"></Link>} },
        { label: "DashBoard", onClick: () => { <Link style={linkStyle} to="/dashboard"></Link>} },
        { label: "Profile", onClick: () => {  <Link style={linkStyle} to="/profile"> </Link>} },
        { label: "Admin", onClick: () => {  <Link style={linkStyle} to="/admin"> </Link>} },
        { label: "Disabled", disabled: true }
        ]}
        />
                                     */