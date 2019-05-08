import React,{useState,useEffect} from 'react';
import { compose, withProps } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import './Profile.css';
import ProgressPanel from "./components/ProgressPanel/ProgressPanel";
import { Box, Image, Anchor, Button, Grid, Text } from 'grommet';
import { Github, Gremlin, Link} from "grommet-icons";



const enhanceFetch = compose(
  withAuthentication(fetch),
  withProps(props => ({
    handleClick: e => {
      e.preventDefault();
      props
      .fetch('http://localhost:5220/api/values')
      .then(res => res.json())
      .then(json => console.log({ data: json }))
      .catch(e => alert(e));   
       
    },
  })),
);
const ButtonFetch = ({ handleClick }) => (
  <button onClick={handleClick} type="button">
    Simulate Fetch
  </button>
);
/**
 *      <p>
                <Button403Enhance />
              </p>
              <p>
                <Button401Enhance />
              </p>
              <p>
                <ButtonFetchEnhance />
              </p>
 * */
const ButtonFetchEnhance = enhanceFetch(ButtonFetch);
const GithubFetch = () => {
    fetch('https://api.github.com/users/oguzozgen/repos?page=1&per_page=100')
    .then(res => res.json())
    .then(json => console.log({ data: json }))
    .catch(e => alert(e));   
};




function Profile(props) {
    const [tre, setTre] = useState((props.tre != null ? props.tre : []));

    return (
      
        <Box gridArea="main" justify="center" align="center">
            <Box flex-container direction="row-responsive" className={"profile-top-line"}>
                    <Box className={"profile-picture centered profile-picture-border-shadow"}>
                        <Image
                        fit="cover"                      
                            src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
                        />
                    </Box>
                    <Box pad="medium" justify='end' className={"profile-information"}>
                            <Text>Oguz Ozgen</Text>
                            <Text>*</Text>
                            <Text>Software Developer</Text>
                            <Text>Homeless Developer</Text>
                            <Text>*</Text>
                    </Box>
                <Box align="end" justify='center' className={"profile-right-place"}>
                   
                    <Button
                        label="Virtualization"
                        onClick={() => { }}
                        />
               
                    </Box>              
            </Box>

            <Box border={{ color:'lightgrey' , size: 'medium' }} className={"thin-mid-line"} >
                    <Text>
                      Thin Mid Line  WoooOLOLOLOLOLO welcome to verywon PROFILE Beyb'
                    </Text>
                <Button onClick={GithubFetch}>Deneme1</Button>
            </Box>

            <Box className={"progress-panels-mid-line"}>
                <Box
                    direction="row-responsive"
                    justify="center"
                    align="center"
                    pad="xlarge"
                    gap="medium"
                >
                    <ProgressPanel>

                    </ProgressPanel> 
                    
                </Box>   
             </Box>
            <Box className={"footer-line footer-css-dasrc"} justify='center' align="end">
                    <Text style={{ fontSize:14 }}> DASRC &#x00A9;2019 </Text>
            </Box>

        </Box>
      
    );
}






export default Profile;
