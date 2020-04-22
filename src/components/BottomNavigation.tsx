import {
  IonTabs,
  IonRouterOutlet,
  IonLabel,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonPage,
  IonApp,
  IonRippleEffect,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Home from '../pages/Home';
import { leafOutline, clipboardOutline, calendarOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import MessageBoard from '../pages/MessageBoard';
import Dummy from '../pages/Dummy';
import Events from '../pages/Events';

interface BottomNavigationProps {}

export const BottomNavigation: React.FC<BottomNavigationProps> = () => {
  return (
    <IonApp>
      <IonPage>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path='/garden' component={Home} exact />
              <Route path='/messageboard' component={MessageBoard} exact />
              <Route path='/events' component={Events} />
              <Route path='/dummy' component={Dummy} />
              <Redirect path='/' to='/garden' exact />
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
              <IonTabButton tab='garden' href='/garden'>
                <IonIcon icon={leafOutline}></IonIcon>
                <IonLabel>Garden</IonLabel>
                <IonRippleEffect />
              </IonTabButton>

              <IonTabButton tab='messageboard' href='/messageboard'>
                <IonIcon icon={clipboardOutline} />
                <IonLabel>Message board</IonLabel>
                <IonRippleEffect />
              </IonTabButton>

              <IonTabButton tab='events' href='/events'>
                <IonIcon icon={calendarOutline} />
                <IonLabel>Events</IonLabel>
                <IonRippleEffect />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonPage>
    </IonApp>
  );
};
