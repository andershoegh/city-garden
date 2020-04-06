import { IonButton } from "@ionic/react";
import React from "react";
import "./Bed.css";

interface BedProps {
    bedNr:string;
    indhold?:string;
    info?:string;
    opgave?:string;
    taget?:boolean;
    temp?:number;
    style?:string;
    setSelection:CallableFunction;
}



const Bed: React.FC<BedProps> = ({bedNr,indhold,info,opgave,taget,style,setSelection}) => {    


    return (
    <IonButton className="bed-style-primary" fill="clear" expand="block" onClick={()=>(setSelection(bedNr))}>Bed nr: {bedNr} 
    </IonButton>
    );
};

export default Bed;