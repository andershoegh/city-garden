import { IonPage } from "@ionic/react";
import React from "react";
import "./Bed.css";

interface BedProps {
    bedNr:number,
    indhold?:string,
    info?:string,
    opgave?:string,
    taget?:boolean,
    style:string
}

const Bed: React.FC<BedProps> = ({bedNr,indhold,info,opgave,taget,style}) => {
    let className = 'bed-style';
    if(style) className += '-'+style;
    return (
        <button className={className} onClick={()=>(console.log(style,'\n',bedNr))}>Click ME!</button>
    );
};

export default Bed;