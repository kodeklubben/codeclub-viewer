import React from 'react';
import {NavBarContainer} from '../components/Navigation/NavBar';
import {FooterContainer} from '../components/Navigation/Footer';
import '../styles/customBootstrapStyles';

const App = (props) =>
  <div>
    <NavBarContainer params={props.params}/>
    {props.children}
    <FooterContainer/>
  </div>;

export default App;
