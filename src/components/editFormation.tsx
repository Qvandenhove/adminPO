import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { useState } from 'react'
import helpers from '../helpers/helpers'
import FormationForm from './formationForm'

interface editProps{
    id: string
    modalController: any
    toastsControllers: {error: any, success:any}
}
let dataGet = false

const EditFormation:React.FC<editProps> = ({id, modalController, toastsControllers}) => {
    const [newName, setNewName] = useState("")
    const [newLevel, setNewLevel] = useState("")
    const [newType, setNewType] = useState("")
    if(!dataGet){
        helpers.getFormation(id).then((value:any) => {
            setNewName(value.name)
            setNewLevel(value.level)
            setNewType(value.type)
            console.log("refresh")
            dataGet = true
        })
    }
    return (
        <IonGrid class="ion-no-margin" color="tertiary">
            <FormationForm values={{name: newName, type:newType, level:newLevel}} valueSetters={{name: setNewName, type:setNewType, level:setNewLevel}} />
            <IonRow>
                <IonCol><IonButton onClick={() => {
                    helpers.updateFormation(id, newName, newType, newLevel).then(() => {
                        modalController(false)
                        toastsControllers.success(true)
                        dataGet = false
                    }).catch(() => {toastsControllers.error(true); dataGet=false})
                    }} >Mettre à jour</IonButton></IonCol>
                <IonCol>
                    <IonButton onClick={() => {modalController(false); dataGet = false}}>Annuler</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
    
}

export default EditFormation