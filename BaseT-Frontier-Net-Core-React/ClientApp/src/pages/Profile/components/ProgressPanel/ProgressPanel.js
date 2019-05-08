import React, { useState, useEffect } from 'react';
import { compose, withProps } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import './ProgressPanel.css';
import { Box, Image, Anchor, Button, Grid, Text } from 'grommet';
import { Github } from "grommet-icons";


function ProgressPanel(props) {
    const [tres, setTres] = useState((props.tres != null ? props.tres : []));


    return (
        <div>
            <Box pad="large" align="center" background="#FAFAFA" round gap="small">
                <Github size="large" color="light-2" />
                <Text>Travel</Text>
                <Anchor href="" label="Link" />
                <Button label="Button" onClick={() => { }} />
            </Box> 
        </div>
        );
}

export default ProgressPanel;