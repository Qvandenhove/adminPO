import { IonRow, IonCol, IonInput, IonSelect, IonSelectOption } from '@ionic/react'
import React, { Fragment } from 'react'

interface formationProps{
    valueSetters : {name:any, level:any, type:any}
    values : {name:any, level:any, type:any}
}

const FormationForm:React.FC<formationProps> = ({valueSetters, values}) => {
    
    return (
        <Fragment>
            <IonRow class="ion-justify-content-center">
                <IonCol>
                    <IonInput placeholder="Nom de la formation" name="name" color="secondary" onIonChange={(e) => {valueSetters.name(e.detail.value)}} value={values.name} />
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
                <IonCol>
                    <IonSelect placeholder="Niveau de la formation" name="level" value={values.level} onIonChange={(e) => {valueSetters.level(e.detail.value)}}>
                        <IonSelectOption value="Bac +2">Bac +2</IonSelectOption>
                        <IonSelectOption value="Bac +3">Bac +3</IonSelectOption>
                        <IonSelectOption value="Bac +5">Bac +5</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
                <IonCol>
                    <IonSelect placeholder="Type de la formation" name="type" onIonChange={(e) => {valueSetters.type(e.detail.value)}} value={values.type} >
                        <IonSelectOption value="Informatique">Informatique</IonSelectOption>
                        <IonSelectOption value="BTP">BTP</IonSelectOption>
                        <IonSelectOption value="Industries et Services">Industries et Services</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
        </Fragment>
    )
}

export default FormationForm