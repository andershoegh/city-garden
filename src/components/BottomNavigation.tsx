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

interface BottomNavigationProps {}

export const BottomNavigation: React.FC<BottomNavigationProps> = () => {
  return (
    <IonApp>
      <IonPage>
        <IonReactRouter>
          <Redirect path="/" to="/have"></Redirect>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/have" component={Home} exact />
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
