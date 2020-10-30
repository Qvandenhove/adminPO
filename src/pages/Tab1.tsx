import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonTab, IonTitle, IonToolbar } from '@ionic/react';
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
  useEffect(() => {
    console.log("effect")
    helpers.getFormations(searched).then((value) => {
      setFormations(value)
      console.log(formations)
    })
  }, [update, searched])
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
        <IonModal onDidDismiss={() => {setSearched("")}} backdropDismiss={false} showBackdrop={false} cssClass="edit" isOpen={editingModal}>
          <EditFormation modalController={setEditingModal} id={editingId} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
