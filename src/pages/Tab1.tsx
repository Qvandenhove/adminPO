import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonTab, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import helpers from '../helpers/helpers'
import './Tab1.css';
import { searchCircle } from 'ionicons/icons';
import EditFormation from '../components/editFormation';
let update = 0
const Tab1: React.FC = () => {
  const [editingId, setEditingId] = useState("")
  const [searched, setSearched] = useState("")
  const [formations, setFormations] = useState("[]")
  const [editingModal, setEditingModal] = useState(false)
  const [updateSuccessToast, setUpdateSuccessToast] = useState(false)
  const [updateErrorToast, setUpdateErrorToast] = useState(false)
  const updateFormations = () => {
    helpers.getFormations(searched).then((value) => {
      setFormations(value)
      console.log(formations)
      console.log("update")
    })
  }

  useEffect(() => {
    updateFormations()
  }, [update])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow class="table" key="title-col">
            <IonCol class="ion-text-center">
              Formation
            </IonCol>
            <IonCol class="ion-text-center">
              Niveau
            </IonCol>
            <IonCol class="ion-text-center">
              Type
            </IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
          {JSON.parse(formations).map((formation:any) => {
            return (
              <IonRow class="table" key={formation.id }>
                <IonCol class="ion-text-center">
                  {formation.name}
                </IonCol>
                <IonCol class="ion-text-center">
                  {formation.lvl}
                </IonCol>
                <IonCol class="ion-text-center">
                  {formation.type}
                </IonCol>
                <IonCol class="ion-text-center">
                  <IonButton color="secondary" onClick={() => {
                    setEditingId(formation.id)
                    setEditingModal(true)
                  }} fill="outline">Modifier</IonButton>
                </IonCol>
                <IonCol class="ion-text-center">
                  <IonButton>Supprimer</IonButton>
                </IonCol>
              </IonRow>
            )
          })}
          <IonRow class="ion-justify-content-center">
            <IonCol size="8">
              <IonSearchbar class="search" onIonChange={(e) => {setSearched(e.detail.value); console.log(e.detail.value)}} animated={true} placeholder="Search" />
            </IonCol>
            <IonCol size="2"><IonButton fill="solid" class="search"><IonIcon icon={searchCircle} /></IonButton></IonCol>
          </IonRow>
        </IonGrid>
        <IonModal onDidDismiss={() => {updateFormations()}} backdropDismiss={false} showBackdrop={false} cssClass="edit" isOpen={editingModal}>
          <EditFormation toastsControllers={{error:setUpdateErrorToast, success:setUpdateSuccessToast}} modalController={setEditingModal} id={editingId} />
        </IonModal>
        <IonToast onDidDismiss={() => {setUpdateSuccessToast(false)}} message="Formation mise à jour avec succés" duration={1000} isOpen={updateSuccessToast} />
        <IonToast onDidDismiss={() => {setUpdateErrorToast(false)}} message="Il y a eu un problème avec la mise à jour réessayez plus tard" duration={1000} isOpen={updateErrorToast} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
