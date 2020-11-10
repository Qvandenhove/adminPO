import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import Chart from 'chart.js'
import helpers from '../helpers/helpers';

const Tab2: React.FC = () => {
  let critereIndex = 0
  let criteres = []
  
  let notes
  let datas = [{data: [], backgroundColor: []}]
  useEffect(() => {
    helpers.getResults().then((values) => {
      notes = values
      let noteCount = notes.length
      let ctx = document.querySelector("canvas#contentement")
      if(ctx){
      notes.forEach(note => {
        for(let critere in note){
          if (critere != "id"){
            critereIndex = criteres.indexOf(critere)
            if (critereIndex < 0){
              criteres.push(critere)
              datas[0].data.push(note[critere])
              datas[0].backgroundColor.push('rgba(255,194,82, 0.5)')
            }else{
              datas[0].data[critereIndex] += note[critere]
            }
          }
        }
      });
      console.log(datas)
      for(let value in datas[0].data){
        datas[0].data[value] = datas[0].data[value] / noteCount
      }
      let chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: criteres,
            datasets: datas,
          },
          title: "Moyenne des notes",
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        max: 5,
                        min: 0,
                        beginAtZero: true
                    }
                }]
            },
            title: {
              display: true,
              text: "Moyenne des notes",
              fontSize: 30,
            },
            legend:{
              display: false,
              
            }
          }
        })
  
      }else{
        console.log("nok")
      }
      
    })
  }, [])
  
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
