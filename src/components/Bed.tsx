import { IonButton } from "@ionic/react";
import React from "react";
import "./Bed.css";

interface BedProps {
    bedNr:number,
    indhold?:string,
    info?:string,
    opgave?:string,
    taget?:boolean,
    temp?:number,
    style?:string
}



const Bed: React.FC<BedProps> = ({bedNr,indhold,info,opgave,taget,style}) => {    


    return (
    <IonButton className="bed-style-primary" fill="clear" expand="block" onClick={()=>(console.log(style,'\n',bedNr))}>Bed nr: {bedNr} 
    </IonButton>
    );
};

export default Bed;