import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAr2ARyw2PBu7i9l_dvRAgl3X4cgE0Voi4",
    authDomain: "satisfaction-7bbc4.firebaseapp.com",
    databaseURL: "https://satisfaction-7bbc4.firebaseio.com",
    projectId: "satisfaction-7bbc4",
    storageBucket: "satisfaction-7bbc4.appspot.com",
    messagingSenderId: "88882724595",
    appId: "1:88882724595:web:40b919b492d15f6a420186"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const helpers = {
    async getFormations(name:string =""){
        let formationsList = await db.collection("Formation").get()
        let formations: any[] = []
        formationsList.forEach((formation) => {
            let datas = formation.data()
            console.log(name)
            if(datas.name.indexOf(name) >= 0 || name == "")
            formations.push({name:datas.name, lvl:datas.level, type:datas.type, id: formation.id})
        })
        console.log(JSON.stringify(formations))
        console.log(JSON.parse(JSON.stringify(formations)))
        return JSON.stringify(formations)
    },

    async getFormation(formId:string){
        let searched = await (await db.collection("Formation").doc(formId).get()).data()
        return searched
    },

    async updateFormation(formId:string , newName:string, newType:string, newLevel:string){
        let update = await db.collection("Formation").doc(formId).update({
            name: newName,
            type: newType,
            level: newLevel
        })
    }
}

export default helpers