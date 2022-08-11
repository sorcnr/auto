import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Tab3.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

const Login: React.FC = () =>{
  return (
    <div>
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello { user? user.getUsername() : "yabancı"}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    </div>
  )
}

const Tab3: React.FC = () => {
  const [present,dismiss] = useIonModal(Login);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem onClick={()=>{
            present({
              canDismiss:true,
              showBackdrop:true,
              animated:true
            });
          }}>
            <IonLabel>Giriş</IonLabel>
          </IonItem>
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
