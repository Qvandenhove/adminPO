import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import Chart from 'chart.js'
import helpers from '../helpers/helpers';

const Tab2: React.FC = () => {
  let notesRecues = {orientation: [0, 0, 0, 0, 0], accueil: [0, 0 , 0 , 0 , 0], choix: [0, 0 , 0 , 0 , 0]}
  let notes
  helpers.getResults().then((values) => {
    notes = values
    let ctx = document.querySelector("canvas#contentement")
  if(ctx){
  notes.forEach(note => {
    notesRecues.orientation[note.orientation - 1]++
    notesRecues.accueil[note.accueil - 1]++
    notesRecues.choix[note.choix - 1]++
  });
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Très insatisfait', 'Insatisfait', 'Neutre', 'Satisfait', 'Très satisfait'],
        datasets: [{
          label: 'Orientation',
          data: [
            notesRecues.orientation[0],
            notesRecues.orientation[1],
            notesRecues.orientation[2],
            notesRecues.orientation[3],
            notesRecues.orientation[4]
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
        ]
        },{
          label: "Accueil",
          data: [
            notesRecues.accueil[0],
            notesRecues.accueil[1],
            notesRecues.accueil[2],
            notesRecues.accueil[3],
            notesRecues.accueil[4]
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
        ]
        },{
          label: "Choix",
          data: [
            notesRecues.choix[0],
            notesRecues.choix[1],
            notesRecues.choix[2],
            notesRecues.choix[3],
            notesRecues.choix[4],
          ],
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ]
        }
      ],
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
