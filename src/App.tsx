import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonModal
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, radio,location,settings } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import { Client, ConnectionOptions } from 'paho-mqtt'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import { Amplify, I18n } from "aws-amplify";
import { MapView } from '@aws-amplify/ui-react';




/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

I18n.setLanguage('tr');

/* Theme variables */
import './theme/variables.css';
import React, { createContext, useEffect, useState } from 'react';
import { MqttClient } from 'mqtt';

setupIonicReact({
  animated: true,
  mode: 'ios',

});

Amplify.configure(awsExports);

const Body: React.FC<{
  count: number;
  onDismiss: () => void;
  onIncrement: () => void;
}> = ({ count, onDismiss, onIncrement }) => (
  <div>
    count: {count}
    <IonButton expand="block" onClick={() => onIncrement()}>
      Increment Count
    </IonButton>
    <IonButton expand="block" onClick={() => onDismiss()}>
      Close
    </IonButton>
  </div>
);




const App: React.FC = () => {

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDismiss = () => {
    dismiss();
  };
  
  const [present, dismiss] = useIonModal(Body, {
    count,
    onDismiss: handleDismiss,
    onIncrement: handleIncrement,
  });
  
  var serverUrl = "ws://15.188.112.229:8083/mqtt";
  const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
  var username = "primal";
  var password = "123456";

  const _imei = "865067023262689";
  const options = {
    reconnect: true,
    hosts: [serverUrl,],
    userName: username,
    password: password,
    onSuccess: onConnect

  }

  const [client, setClient] = useState(new Client(serverUrl, clientId));
  const AutoContext = createContext(client);
  useEffect(()=>{
    if (client.isConnected() == false) {
      //client.connect(options);
      
      client.onMessageArrived = (message)=>{
        console.log(message.payloadString);
        

      }
      setClient(client);
      console.log(client);
    }
  })
  
  
  
  

  

  function onConnect() {
    client.subscribe("response/" + _imei);

  }


  /***
   * Settings for maps
   */
  

  
  return (
    <AutoContext.Provider value={client}>
    <IonApp >
      
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1  client={client} imei={_imei} />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
            <IonTabBar slot="bottom" >
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={radio} />
              <IonLabel>Kontrol</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={location} />
              <IonLabel>Harita</IonLabel>
            </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3" >
              <IonIcon icon={settings} />
              <IonLabel>Ayarlar</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
    </AutoContext.Provider>
  );
}
  ;

export default App;
