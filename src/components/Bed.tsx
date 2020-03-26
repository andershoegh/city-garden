import { IonButton } from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Bed.css";
import {firebase} from '../Utility/Firebase'

interface BedProps {
    bedNr:number,
    indhold?:string,
    info?:string,
    opgave?:string,
    taget?:boolean,
    temp?:number,
    style:string,
    closeModal?:CallableFunction
}



const Bed: React.FC<BedProps> = ({bedNr,indhold,info,opgave,taget,style,closeModal}) => {
    const [data, setData] = useState<firebase.firestore.DocumentData[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const unsub = firebase.getData().onSnapshot(snapShot => {
        let tempArray: firebase.firestore.DocumentData[];
        tempArray = [];
        let changes = snapShot.docChanges();
        console.log(changes);
        snapShot.forEach(doc => {
            tempArray = [...tempArray, doc.data()];
        });
        setData(tempArray);
        });

        return () => {
        unsub();
        };
    }, []);

    

    let className = 'bed-style';
    if(style) className += '-'+style;
    return (
    <IonButton className={className} onClick={()=>(console.log(style,'\n',bedNr))}>Bed nr: {bedNr} 
    </IonButton>
    );
};

export default Bed;