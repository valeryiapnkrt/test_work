import React, {useEffect} from 'react';
import './App.css';
import AppRouter from './routes/AppRouter';
import Navbar from './components/Navbar';
import withStore from './helpers/hocs/withStore';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react'
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';

const App = props => {
  const { appState } = props.stores;

  useEffect(() => {
    appState.init();
  }, [appState]);

  if (appState.status !== "run") return null;

  return (
    <div className="App">
      <ReactNotification />
      <Navbar role={appState.check}/>
      <Container textAlign='justified'>
        <AppRouter role={appState.check} appStatus={appState.status} />
      </Container>
    </div>
  );
};

export default withStore(App);