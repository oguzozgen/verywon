import React, { useState, useEffect } from 'react';
import { compose, withProps } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import './CriclesVirtualization.css';
import { Box, Image, Anchor, Button, Grid, Text } from 'grommet';
import * as d3 from 'd3';
import { Github } from "grommet-icons";
import * as _ from 'underscore';

function CriclesVirtualization(props) {
    const [githubDatasx, setGithubDatasx] = useState(props.githubDatas);
    let directDataWARNING = props.githubDatas;

    useEffect(() => {
        
        console.log(githubDatasx);
    }, [githubDatasx]);

    var xCenter = [
          100, 200, 300, 400, 500, 600, 800, 900, 1000
        , 150, 250, 350, 450, 550, 650, 850, 950, 1050
        , 120, 220, 320, 420, 520, 620, 820, 920, 1020
        , 135, 235, 335, 435, 535, 635, 835, 935, 1035
    ]

    var uniqByLang = _.uniq(directDataWARNING, function (ii) {
        if (ii.node.languages.edges[0] !== null && ii.node.languages.edges[0] !== undefined) {
 
            return ii.node.languages.edges[0].node.name;
        }      
    });
    let uniqLang = [];
    uniqByLang.forEach((item) => {
        if (item.node.languages.edges[0] !== null && item.node.languages.edges[0] !== undefined) {
            uniqLang.push(item.node.languages.edges[0].node.name);            
        }      
      }
    );
    uniqLang.push("null");

    var nodes2 = [];
    directDataWARNING.forEach((item) => { 
        let categoryLang = "null";
        let colorSelection = "red";
        if (item.node.languages.edges[0] !== null && item.node.languages.edges[0] !== undefined) {
            categoryLang = item.node.languages.edges[0].node.name;
            colorSelection = item.node.languages.edges[0].node.color;
        }
        // Shape of Data
        nodes2.push(
            {
                radius: Math.random() * 15,
                name: item.node.name,
                category: categoryLang,
                colorSelection: colorSelection
            }
        );
    });



   function getRandom(max) {
        return Math.random() * Math.floor(max);
    }
  /*   var nodes = [{}, {}, {}, {}, {}];
    var svg = d3.select('#content')
        .append("svg")
        .attr("width", 900)
        .attr("height", 300)
             .selectAll('circle')
            .data(nodes2)
            .enter()
            .append('circle')
            .attr('r', function (d) { return d.radius;})
            .attr('cx', getRandom(1000) )
            .attr('cy', getRandom(900) )
            .attr("fill", "blue")
            .attr("stroke", "black")
            .attr("stroke-width", Math.round(3 * Math.random()));


*/
    var width = 1000, height = 600;

    var simulation = d3.forceSimulation(nodes2)
        .force('charge', d3.forceManyBody().strength(6))
        .force('x', d3.forceX().x(function (d) {
            return xCenter[_.indexOf(uniqLang, d.category)];
        }))
        .force('y', d3.forceY().y(function (d) {
            return (150 * (_.indexOf(uniqLang, d.category) % 4));
        }))

        .force('collision', d3.forceCollide().radius(function (d) {
            return d.radius;
        }))
        .on('tick', ticked);

    function ticked() {
        var u = d3.select('svg g')
            .selectAll('circle')
     
            .data(nodes2);
        u.enter()
            .append('circle')
            .attr('r', function (d) {
                return d.radius;
            })
            .style('fill', function (d) {
                return d.colorSelection;
            })
            .merge(u)
            .attr('cx', function (d) {
                return d.x;
            })
            .attr('cy', function (d) {
                return d.y;
            });

        u.exit().remove();
    }
    
    return (
                <div>
                    <div id="content">
                        <svg width="1080" height="900">
                            <g transform="translate(50, 100)"></g>
                        </svg>
                    </div>
                </div>
        );
}

export default CriclesVirtualization;