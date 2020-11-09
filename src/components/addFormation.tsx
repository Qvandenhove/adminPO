import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { useState } from 'react'
import helpers from '../helpers/helpers'
import FormationForm from './formationForm'

interface addProps{
    modalController: any
    toastsControllers: {error: any, success:any}
}

const AddFormation:React.FC<addProps> = ({modalController, toastsControllers}) => {
    const [newName, setNewName] = useState("")
    const [newLevel, setNewLevel] = useState("")
    const [newType, setnewType] = useState("")
    
    return (
        <IonGrid class="ion-no-margin" color="tertiary">
            <FormationForm values={{name: newName, type:newType, level:newLevel}} valueSetters={{name: setNewName, type:setnewType, level:setNewLevel}} />
            <IonRow>
                <IonCol><IonButton onClick={() => {
                    helpers.addFormation(newName, newType, newLevel).then(() => {
                        modalController(false)
                        toastsControllers.success(true)
                    }).catch(toastsControllers.error(true))
                    }} >Ajouter</IonButton></IonCol>
                <IonCol>
                    <IonButton onClick={() => {modalController(false)}}>Annuler</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
    
}

export default AddFormation