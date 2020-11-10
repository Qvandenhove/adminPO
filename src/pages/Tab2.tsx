import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import Chart from 'chart.js'
import helpers from '../helpers/helpers';
import { type } from 'os';

const Tab2: React.FC = () => {
  let criteresRecus = []
  let critereIndex = 0
  let notes
  let datas = []
  helpers.getResults().then((values) => {
    notes = values
    let ctx = document.querySelector("canvas#contentement")
  if(ctx){
  notes.forEach(note => {
    for(let critere in note){
      if (critere != "id"){
        critereIndex = criteresRecus.indexOf(critere)
        if (critereIndex < 0){
          let randomColor = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.4)`
          datas.push({label: critere, data: [0, 0, 0, 0, 0], backgroundColor: [randomColor, randomColor, randomColor, randomColor, randomColor]})
          criteresRecus.push(critere)
          critereIndex = criteresRecus.length - 1
        }
        datas[critereIndex].data[note[critere] - 1]++
      }
    }
    // notesRecues.orientation[note.orientation - 1]++
    // notesRecues.accueil[note.accueil - 1]++
    // notesRecues.choix[note.choix - 1]++
  });
  let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Très insatisfait', 'Insatisfait', 'Neutre', 'Satisfait', 'Très satisfait'],
        datasets: datas,
      options: {
        legend: {
          labels : {
            FontSize: '100px'
          }
        }
      }
      
      }
    })  
  }else{
    console.log("nok")
  }
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Résultats de satisfaction</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <canvas id="contentement" width="400px" height="300px"></canvas>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
