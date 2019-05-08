import React, { useState, useEffect } from 'react';
import { compose, withProps } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import './DiagramVisualization.css';
import { Box, Image, Anchor, Button, Grid, Text } from 'grommet';
import * as vis from 'vis';
import { Github } from "grommet-icons";
import * as _ from 'underscore';

function DiagramVisualization(props) {
    const [data, setData] = useState(props.githubDatas);
    let networkItem = {};
    
  

    const DataProvide = () => {
        // create an array with nodes
        let nodes = new vis.DataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' }
        ]);
        // create an array with edges
        let edges = new vis.DataSet([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 3 }
        ]);
        let data = {
            nodes: nodes,
            edges: edges
        };
        return data;
    };

    const InitalizeNetworkItem = () => {
        // create a network
        var container = document.getElementById('network-item-id');
        var data = DataProvide();
        var options = {};
        var network = new vis.Network(container, data, options);
    };

    useEffect(() => {
        InitalizeNetworkItem();
    },[data]);

    return (
                <div>

                            <div id="network-item-id">
                            </div>  
                </div>
        );
}

export default DiagramVisualization;