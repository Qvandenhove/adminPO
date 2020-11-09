import { IonButton, IonCol, IonGrid, IonInput, IonRow, IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import helpers from '../helpers/helpers'

interface editProps{
    id: string
    modalController: any
    toastsControllers: {error: any, success:any}
}

const EditFormation:React.FC<editProps> = ({id, modalController, toastsControllers}) => {
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
                    <IonSelect name="level" value={newLevel} onIonChange={(e) => {setNewLevel(e.detail.value)}}>
                        <IonSelectOption value="Bac +2">Bac +2</IonSelectOption>
                        <IonSelectOption value="Bac +3">Bac +3</IonSelectOption>
                        <IonSelectOption value="Bac +5">Bac +5</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
                <IonCol>
                    <IonSelect name="type" onIonChange={(e) => {setnewType(e.detail.value)}} value={newType} >
                        <IonSelectOption value="Informatique">Informatique</IonSelectOption>
                        <IonSelectOption value="BTP">BTP</IonSelectOption>
                        <IonSelectOption value="Industries et Services">Industries et Services</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol><IonButton onClick={() => {
                    console.log(newName)
                    helpers.updateFormation(id, newName, newType, newLevel).then(() => {
                        modalController(false)
                        toastsControllers.success(true)
                    }).catch(toastsControllers.error(true))
                    }} >Mettre à jour</IonButton></IonCol>
                <IonCol>
                    <IonButton onClick={() => {modalController(false)}}>Annuler</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
    
}

export default EditFormation