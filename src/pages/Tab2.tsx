import { IonContent, IonHeader, IonIcon, IonPage, IonPopover, IonText, IonTitle, IonToolbar, } from '@ionic/react';

import './Tab2.css';
import { Amplify } from "aws-amplify";
import { Heading, MapView,View } from '@aws-amplify/ui-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { createMap} from "maplibre-gl-js-amplify";
import { location } from 'ionicons/icons';
import { cleanup } from '@testing-library/react';
import mapboxgl, { MapboxEvent, MapMouseEvent } from 'mapbox-gl';

const Tab2: React.FC = () => {
  Amplify.configure({
    Auth: {
      identityPoolId: "eu-central-1:35b9b1f2-a10f-4fe4-860f-fee7efd0c421",
      region: "eu-central-1",
    },
    geo: {
      AmazonLocationService: {
        maps: {
          items: {
            "automoto.map": {
              style: "Default style"
            },
          },
          default: "automoto.map",
        },
        region: "eu-central-1",
      },
    }
  })
  const [{ latitude, longitude }, setMarkerLocation] = useState({
    latitude: 38.394314,
    longitude: 27.157562,
  });
  

  const openPopover = (e: MapboxEvent<MouseEvent>) => {
    e.originalEvent.stopPropagation();
    setShowPopup(true);
  };
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MapView onLoad={(e)=>e.target.flyTo({center:[longitude,latitude],zoom:14,speed:0.5})}  > 
          <Marker onClick={openPopover} longitude={longitude} latitude={latitude}  ></Marker>
          {showPopup && (
            <Popup
              latitude={latitude}
              longitude={longitude}
              offset={{ bottom: [0, -40] }}
              onClose={() => setShowPopup(false)}
            >
              
              <IonText color='primary'>Some information about a location.</IonText>
            </Popup>
          )}
        </MapView>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;


