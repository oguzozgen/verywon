import React,{Component} from 'react';
import { compose, withProps } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';

export class Home extends Component {


    render() {
      return (
              <div>
                <h1>Home Verywon</h1>

              </div>
        );
      }}
  
  
  export default Home;
  