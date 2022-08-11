import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar, IonButton, IonIcon, IonItemSliding, IonItemOption, IonItemOptions, useIonAlert, UseIonAlertResult, IonSegment, IonSegmentButton, IonItemDivider, IonListHeader,IonModal } from '@ionic/react';
import { AsyncHook } from 'async_hooks';
import { checkmarkDoneCircle, chevronBack, chevronForward, chevronForwardCircle, keyOutline, star, starHalfOutline, volumeMute, bluetooth, wifi, flash, flashOff,locate } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';

import './Tab1.css';
import { Client, ConnectionOptions, Message } from 'paho-mqtt'




const Tab1 = ({ client, imei }: { client: Client,imei:string }) => {
  const [device, setDevice] = useState()
  const [presentAlert] = useIonAlert();
  

  client.onMessageArrived = (message: Message) => {
    if (message.destinationName.startsWith("response") && message.payloadString.includes("OK")) {
      presentAlert({
        header: 'Dikkat',
        
        message: 'İşlem gerçekleştirildi.',
        buttons: ['Tamam'],
      })
    }
  }

  /***
   * MQTT Orders
   */
  const top = "order/"+imei;

  var msg = `{"pwd" : "${imei}", "action" : `;
  
  function switchOn() {
    var m = msg + '"switch"}';
    
    client.send(top,m);  
    
  }
  function stop() {
    var m = msg + '"stop"}';

    client.send(top, m);

  }
  function locateMe() {
    var m = msg + '"locate"}';

    client.send(top, m);

  }
  function alarm() {
    var m = msg + '"alarm"}';

    client.send(top, m);

  }
  function gps() {
    var m = msg + '"gps"}';

    client.send(top, m);

  }
  function emergency() {
    var m = msg + '"emergency"}';

    client.send(top, m);

  }
  function start() {
    var m = msg + '"start"}';

    client.send(top, m);

  }

    

  return (
    <IonPage >

      <IonContent fullscreen>
        <IonToolbar>
          <IonSegment value="web">
            <IonSegmentButton value="web">
              Web
              <IonIcon icon={wifi} ></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="bluetooth" disabled={true}>
              Bluetooth
              <IonIcon icon={bluetooth} ></IonIcon>
            </IonSegmentButton>
          </IonSegment>

        </IonToolbar>
        <IonList>
          
            <IonItemDivider>
              <IonLabel>Uzaktan kontrol</IonLabel>
            </IonItemDivider>  
          
          
          <IonItem>
            <IonButton className='widget' expand='full' mode='ios' shape='round' onClick={switchOn}>
              <h2>Kontak</h2>
              <IonIcon slot='end' icon={keyOutline} size='large'  ></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton className='widget'  expand='full' mode='ios' shape='round' onClick={start}>
              <h2>Motor</h2>
              <IonIcon slot='end' icon={flash} size='large'  ></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton className='widget' color='danger' expand='full' mode='ios' shape='round' disabled={true}>
              <h2>Acil Durum</h2>
              <IonIcon slot='end' icon={flashOff} size='large'  ></IonIcon>
            </IonButton>
          </IonItem>

          <IonItemDivider>
            <IonLabel>Alarm için</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonButton className='widget' color='success' expand='full' mode='ios' shape='round'onClick={alarm}>
              <h2>Kur</h2>
              <IonIcon slot='end' icon={checkmarkDoneCircle} size='large'  ></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton className='widget' color='warning' expand='full' mode='ios' shape='round' onClick={stop}>
              <h2>Sustur</h2>
              <IonIcon slot='end' icon={volumeMute} size='large'  ></IonIcon>
            </IonButton>
          </IonItem>
          <IonItemDivider>
            <IonLabel>Motorumu bulamıyorum !</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonButton className='widget'  expand='full' mode='ios' shape='round' onClick={locateMe}>
              <h2>Nerdesin ?</h2>
              <IonIcon slot='end' icon={locate} size='large'  ></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>{client.clientId}</IonLabel>
          </IonItem>
        </IonList>



      </IonContent>
    </IonPage>
  );
};

export default Tab1;
