import React, { useEffect, useState } from 'react';
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import helpers from '../helpers/helpers'
import './Tab1.css';
import { pencilOutline, ribbon, searchCircle, trashOutline } from 'ionicons/icons';
import EditFormation from '../components/editFormation';
import AddFormation from '../components/addFormation';

const Tab1: React.FC = () => {
  // Variables de repérage des formations
  const [editingId, setEditingId] = useState("")
  const [searched, setSearched] = useState("")
  const [formations, setFormations] = useState("[]")
  // Modales de mises à jour et ajouts
  const [editingModal, setEditingModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  // Messages aux utilisateurs des mise à jour de la table
  const [updateSuccessToast, setUpdateSuccessToast] = useState(false)
  const [updateErrorToast, setUpdateErrorToast] = useState(false)
  const [addSuccessToast, setAddSuccessToast] = useState(false)
  const [addErrorToast, setAddErrorToast] = useState(false)
  const [deleteSuccessToast, setDeleteSuccessToast] = useState(false)
  const [deleteErrorToast, setDeleteErrorToast] = useState(false)


  useEffect(() => {
    // On actualise les formations
    helpers.getFormations(searched).then((value) => {
      setFormations(value)
    })
  }, [formations, searched])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonIcon icon={ribbon} />Formations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="8">
              <IonSearchbar class="search" onIonChange={(e) => {setSearched(e.detail.value); console.log(e.detail.value)}} animated={true} placeholder="Search" />
            </IonCol>
            <IonCol size="2"><IonButton fill="solid" class="search"><IonIcon icon={searchCircle} /></IonButton></IonCol>
            <IonCol size="2"><IonButton fill="solid" class="addFormation" onClick={() => {setAddModal(true)}}>Ajouter</IonButton></IonCol>
          </IonRow>
          <IonRow class="table impair" key="title-col">
            <IonCol class="ion-text-center table">
              Formation
            </IonCol>
            <IonCol class="ion-text-center table">
              Niveau
            </IonCol>
            <IonCol class="ion-text-center table">
              Type
            </IonCol>
            <IonCol class="table"></IonCol>
            <IonCol class="table"></IonCol>
          </IonRow>
          {JSON.parse(formations).map((formation:any, index:number) => {
            let isEven = index % 2 == 0
            return (
              <IonRow class={`table ${isEven ? "pair" : "impair"}`} key={formation.id }>
                <IonCol class="ion-text-center table">
                  {formation.name}
                </IonCol>
                <IonCol class="ion-text-center table">
                  {formation.lvl}
                </IonCol>
                <IonCol class="ion-text-center table">
                  {formation.type}
                </IonCol>
                <IonCol class="ion-text-center table">
                  <IonButton class="editForm" shape="round"  onClick={() => {
                    setEditingId(formation.id)
                    setEditingModal(true)
                  }}><IonIcon icon={pencilOutline} /></IonButton>
                </IonCol>
                <IonCol class="ion-text-center table">
                  <IonButton class="editForm" shape="round" onClick={() => {
                    setEditingId(formation.id)
                    setDeleteAlert(true)
                    }}><IonIcon icon={trashOutline} /></IonButton>
                </IonCol>
              </IonRow>
            )
          })}
        </IonGrid>
        {/* Modal de mise à jour de formation */}
        <IonModal onDidDismiss={() => {setEditingModal(false); setFormations(formations + " ")}} backdropDismiss={false} showBackdrop={false} cssClass="edit" isOpen={editingModal}>
          <EditFormation toastsControllers={{error:setUpdateErrorToast, success:setUpdateSuccessToast}} modalController={setEditingModal} id={editingId} />
        </IonModal>
        {/* Modal d'ajout de formation */}
        <IonModal onDidDismiss={() => {setAddModal(false); setFormations(formations + " ")}} backdropDismiss={false} showBackdrop={false} cssClass="edit" isOpen={addModal}>
          <AddFormation toastsControllers={{error:setAddErrorToast, success:setAddSuccessToast}} modalController={setAddModal} />
        </IonModal>
        {/* Suppression d'une formation */}
        <IonAlert onDidDismiss={() => {setDeleteAlert(false); setFormations(formations + " ")}} isOpen={deleteAlert} buttons={[{text:"Oui", handler: () => {
          helpers.deleteFormation(editingId).then(() => {
            setDeleteSuccessToast(true)}).catch(() => {setDeleteErrorToast(true)})}}, "Non"]} message={"Êtes vous sur de vouloir supprimer cette formation ?"} />
        {/* Messages de mise à jour deformation */}
        <IonToast onDidDismiss={() => {setUpdateSuccessToast(false)}} message="Formation mise à jour avec succés" duration={1000} isOpen={updateSuccessToast} />
        <IonToast onDidDismiss={() => {setUpdateErrorToast(false)}} message="Il y a eu un problème avec la mise à jour réessayez plus tard" duration={1000} isOpen={updateErrorToast} />
        {/* Messages d'ajout de formation */}
        <IonToast onDidDismiss={() => {setAddSuccessToast(false)}} message="Formation ajoutée avec succés" duration={1000} isOpen={addSuccessToast} />
        <IonToast onDidDismiss={() => {setAddErrorToast(false)}} message="Il y a eu un problème avec l'ajout réessayez plus tard" duration={1000} isOpen={addErrorToast} />
        {/* Messages de suppression de formation */}
        <IonToast onDidDismiss={() => {setDeleteErrorToast(false)}} message="Il y a eu un problème avec la suppression réessayez plus tard" duration={1000} isOpen={deleteErrorToast} />
        <IonToast onDidDismiss={() => {setDeleteSuccessToast(false)}} message="Formation supprimée avec succés" duration={1000} isOpen={deleteSuccessToast} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
