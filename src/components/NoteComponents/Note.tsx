import React, { useState, useCallback, useEffect } from 'react';
import {
    IonCard,
    IonCardContent,
    IonText,
    IonCardSubtitle,
    IonCardHeader,
    IonIcon,
    IonCheckbox,
    IonItem,
  } from "@ionic/react";
  import { addCircle} from "ionicons/icons";
  import { firebase } from "../../Utility/Firebase";


export interface NoteProps {
    note: string;
    author: string;
    pinned: boolean;
    id: string;
}
 
const Note: React.SFC<NoteProps> = ({note, author, pinned, id}) => {
    const [pin, setPin] = useState<string>( pinned? "filled" : "outline" );

    useEffect(()=>{
        setPin(pinned? "filled" : "outline" );
    }, [pinned]);

    const pinNote = useCallback(()=>{ 
        firebase.updatePin(id).update({pinned: !pinned});
    },[pinned, id]);

    return ( 
        <IonCard>
            <IonCardHeader>
                <IonIcon src={"/assets/CostumIcons/pushpin-"+ pin +".svg"} className="pin-icon" onClick={pinNote}></IonIcon>
            </IonCardHeader>
            <IonCardContent>
                <div className="card-div">
                    <IonText>{note}</IonText>
                </div>
                <IonCardSubtitle>- {author}</IonCardSubtitle>
            </IonCardContent>
      </IonCard> );
}
 
export default Note;