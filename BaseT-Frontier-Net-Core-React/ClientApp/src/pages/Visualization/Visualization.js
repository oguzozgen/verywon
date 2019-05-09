import React,{useState,useEffect} from 'react';
import { compose, withProps } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import axios from 'axios';
import './Visualization.css';
import CriclesVirtualization from './components/CriclesVirtualization/CriclesVirtualization';
import DiagramVisualization from './components/DiagramVisualization/DiagramVisualization';
import {
    Box,
    Button,
    Heading,
    Grommet,
    FormField,
    Tab,
    Tabs,
    Text,
    TextInput } from 'grommet';
import {
    Attraction,
        Car,
        CircleInformation,
        Currency,
        TreeOption
} from "grommet-icons";
import * as d3 from 'd3';
import * as _ from 'underscore';

// WARN Enviroment selection
const env = "dev";


function Visualization(props) {
    const [githubData, setGithubData] = useState(
        {
            loading: false,
            data: (props.githubData != null ? props.githubData : [])
        }
    );
    const staticDataWARNINDIRECTDATA = [];
    useEffect(() =>
    {
    }, [githubData]);

    const getQuery = (lastCursor) => {
        return `
             query { 
                  viewer { 
                    login
                    repositories(first:100 after:${(lastCursor === null ? null : ("\"" + lastCursor + "\""))}){
                      edges{
                        cursor
                        node{
                          id
                          name
                          languages(first:1) {
                            edges {
                              node {
                                id
                                name
                                color
                              }
                            }
                          }
                        } 
                      }
                    }    
                  }
                }
                `;
    };

    const GithubFetch = async () => {
        let datas = [];
        let lastCursor = null;
        setGithubData({ loading: true });
        x();
        function x() {
            const gitGraphQuery = getQuery(lastCursor);
            const variables = {};
            fetch('https://api.github.com/graphql', {
                method: "post",
                headers: {
                    Authorization: "bearer 3de39e74cd50903e2558c683189148a5cf39f4a8"
                },
                body: JSON.stringify({ query: gitGraphQuery, variables: variables })

            }).then(res => res.json())
                .then((json) => {
                    //path shortcut
                    let repositoriesRef = json.data.viewer.repositories.edges;
                    let lastRepo = repositoriesRef[repositoriesRef.length - 1];
                    //last cursor for next page start point (per page 100)
                    lastCursor = lastRepo.cursor;
                    let checkLenght = repositoriesRef.length;
                    datas = datas.concat(json.data.viewer.repositories.edges);
                    setTimeout(function () {
                        if (checkLenght === 100) {
                            x();
                        } else {
                            done();
                        }
                    }, 300);
                });

        }
        function done() {
            console.log(datas);
            setGithubData(datas);
        }

    };
    useEffect(() => {
        console.log(githubData);
       
        if (githubData.length === 0) {
            GithubFetch();
         }
      
    }, []);
    return (      

        <div>
            <Button
                label="Visualization"
                onClick={GithubFetch}
                justify="center"
                align="center"
            />


            <Box fill>
                <Tabs flex>
                    <Tab title="Vis Visualization">
                        <Box fill pad="large" align="center" >

                            <DiagramVisualization data={githubData}>
                            </DiagramVisualization>
                        </Box>
                    </Tab>
                    <Tab title="D3 Visualization">
                        <Box fill pad="large" align="center">
                            
                            <CriclesVirtualization githubDatas={githubData}>
                            </CriclesVirtualization>
                        </Box>
                    </Tab>
                </Tabs>
            </Box>


            

            <div className={"d3-data-holder-id"} style={{ width: 900, height:700 }}>
            </div>
        </div>
      
    );
}



export default Visualization;

/**
 * Auth Fetch Example
 * */
/*
 * const enhanceFetch = compose(
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

const ButtonFetchEnhance = enhanceFetch(ButtonFetch);
*/
/** * Auth Fetch Example ENDS * */


/**
 * gets github v5 graphql data with auth
 * @param {any} gitQuery
 * @param {any} variables
 */
/*
const getRepo = async (gitQuery, variables) => {
    try {
        const response = await axios.post(
            "https://api.github.com/graphql",
            {
                query: gitQuery,
                variables: variables
            },
            {
                headers: {
                    Authorization: `bearer ${githubAccessToken}` 
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
};
*/
