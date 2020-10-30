import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import helpers from '../helpers/helpers'

interface editProps{
    id: string
    modalController: any
}

const EditFormation:React.FC<editProps> = ({id, modalController}) => {
    const [newName, setNewName] = useState("")
    const [newLevel, setNewLevel] = useState("")
    const [newType, setnewType] = useState("")
    const [editingForm, setEditingForm] = useState({name: "", level: "", type: ""})
    useEffect(() => {
        helpers.getFormation(id).then((value:any) => {
            setEditingForm(value)
            setNewName(value.name)
            setNewLevel(value.level)
            setnewType(value.type)
        })
    }, [])
    
    return (
        <IonGrid class="ion-no-margin" color="tertiary">
            <IonRow class="ion-justify-content-center">
                <IonCol>
                    <IonInput name="name" color="secondary" onIonChange={(e) => {setNewName(e.detail.value)}} value={newName} />
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
                <IonCol>
                    <IonInput name="level" color="secondary" onIonChange={(e) => {setNewLevel(e.detail.value)}} value={newLevel} />
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
                <IonCol>
                    <IonInput name="type" color="secondary" onIonChange={(e) => {setnewType(e.detail.value)}} value={newType} />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol><IonButton onClick={() => {
                    console.log(newName)
                    helpers.updateFormation(id, newName, newType, newLevel).then(() => {
                        modalController(false)
                        console.log("done")
                    })
                    }} >Mettre à jour</IonButton></IonCol>
            </IonRow>
        </IonGrid>
    )
    
}

export default EditFormation