import {
  IonTabs,
  IonRouterOutlet,
  IonLabel,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonPage,
  IonApp
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Home from "../pages/Home";
import { leafOutline, clipboardOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import MessageBoard from "../pages/MessageBoard";
import Dummy from "../pages/Dummy";

interface BottomNavigationProps {}

export const BottomNavigation: React.FC<BottomNavigationProps> = () => {
  return (
    <IonApp>
      <IonPage>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/have" component={Home} exact />
              <Route path="/opslagstavle" component={MessageBoard} exact />
              <Route path="/dummy" component={Dummy} />
              <Redirect path="/" to="/have" exact />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="have" href="/have">
                <IonIcon icon={leafOutline}></IonIcon>
                <IonLabel>Have</IonLabel>
              </IonTabButton>
              <IonTabButton tab="opslagstavle" href="/opslagstavle">
                <IonIcon icon={clipboardOutline} />
                <IonLabel>Opslagstavle</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonPage>
    </IonApp>
  );
};
