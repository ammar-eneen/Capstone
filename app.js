// importing neccesary functions and data
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

//initialize firebase
const firebase = initializeApp({
  apiKey: "AIzaSyCR30Eoa-Q4yQK14ul0r7q4okUwOMm4yqA",
  authDomain: "abbas-project-9d725.firebaseapp.com",
  databaseURL: "https://abbas-project-9d725-default-rtdb.firebaseio.com",
  projectId: "abbas-project-9d725",
  storageBucket: "abbas-project-9d725.appspot.com",
  messagingSenderId: "666477929209",
  appId: "1:666477929209:web:6ba7385ec0b8d672cd7828",
  measurementId: "G-GKE9RK3L5K",
});

//getting the whole database
let db = getDatabase(
  firebase,
  "https://abbas-project-9d725-default-rtdb.firebaseio.com/"
);

//creating Plant Data
let plantdata = {
  Blackberry: [5.0, 6.0],
  Blueberry: [4.5, 5.0],
  Cranberry: [4.0, 5.5],
  Parsley: [5.0, 7.0],
  Peanut: [5.0, 7.5],
  Potato: [4.5, 6.0],
  Raspberry: [5.5, 6.5],
  "Sweet potato": [5.5, 6.0],
  Apple: [5.0, 6.5],
  Basil: [5.5, 6.5],
  Carrot: [5.5, 7.0],
  Cauliflower: [5.5, 7.5],
  Chervil: [6.0, 6.7],
  Corn: [5.5, 7.5],
  Cucumber: [5.5, 7.0],
  Dill: [5.5, 6.5],
  Eggplant: [5.5, 6.5],
  Garlic: [5.5, 7.5],
  Melon: [5.5, 6.5],
  Pepper: [5.5, 7.0],
  Pumpkin: [6.0, 6.5],
  Radicchio: [6.0, 6.7],
  Radish: [6.0, 7.0],
  Rhubarb: [5.5, 7.0],
  Sorrel: [5.5, 6.0],
  Squash: [5.5, 7.0],
  Tomato: [5.5, 7.5],
  Turnip: [5.5, 7.0],
  Artichoke: [6.5, 7.5],
  Arugula: [6.5, 7.5],
  Asparagus: [6.0, 8.0],
  Bean: [6.0, 7.5],
  "Bean - lima": [6.0, 7.0],
  Beet: [6.0, 7.5],
  Broccoli: [6.0, 7.0],
  "Broccoli rabe": [6.5, 7.5],
  "Brussels sprouts": [6.0, 7.5],
  Cabbage: [6.0, 7.5],
  Cantaloupe: [6.0, 7.5],
  Celery: [6.0, 7.0],
  "Chinese cabbage": [6.0, 7.5],
  Celeriac: [6.0, 7.0],
  Celery: [6.0, 7.0],
  Chive: [6.0, 7.0],
  Cilantro: [6.0, 6.7],
  Claytonia: [6.5, 7.0],
  Collard: [6.5, 7.5],
  Cress: [6.0, 7.0],
  "Endive/escarole": [6.0, 7.0],
  Fennel: [6.0, 6.7],
  Gourd: [6.5, 7.5],
  Horseradish: [6.0, 7.0],
  "Jerusalem Artichoke/Sunchoke": [6.7, 7.0],
  Kale: [6.0, 7.5],
  Kohlrabi: [6.0, 7.5],
  Leek: [6.0, 8.0],
  Lettuce: [6.0, 7.0],
  Marjoram: [6.0, 8.0],
  Mizuna: [6.5, 7.0],
  Mustard: [6.0, 7.5],
  Okra: [6.0, 7.5],
  Onion: [6.0, 7.0],
  Oregano: [6.0, 7.0],
  "Pak choi": [6.5, 7.0],
  Parsnip: [5.5, 7.5],
  Pea: [6.0, 7.5],
  Sage: [6.0, 6.7],
  Salsify: [6.0, 7.5],
  Spinach: [6.0, 7.5],
  Sunflower: [6.0, 7.5],
  Sunflower: [6.0, 7.5],
  "Swiss chard": [6.0, 7.5],
  Tarragon: [6.0, 7.5],
  Tomatillo: [6.7, 7.3],
  Watermelon: [6.0, 7.0],
  "Alpine strawberry": [5.0, 7.5],
  Rutabaga: [5.5, 7.0],
};
let arrPh = Object.values(plantdata);
let arrNames = Object.keys(plantdata);

let historyPara = document.querySelectorAll(`.sec1 p`);
let currPara = document.querySelector(`.sec3 p`);
let listItems = document.querySelectorAll(`.sec3 li`);
//getting the ref for pH data
let refr = ref(db, "pH");
onValue(refr, (snap) => {
  let i;
  let j;
  let arrval = Object.values(snap.val());
  arrval.reverse();
  let last = arrval[0];
  console.log(last);
  currPara.textContent = "Current pH: " + last;

  for (i = 1; i < 13; i++) {
    historyPara[i].innerHTML = arrval[i - 1];
  }
  for (j = 0; j < 75; j++) {
    if (last > arrPh[j][0] && last < arrPh[j][1]) {
      listItems[j].textContent = arrNames[j];
    }
  }
});

setInterval(() => {
  let pHPromise = new Promise((resolve) => {
    onValue(refr, (snap) => {
      resolve(Object.values(snap.val()));
    });
  });

  pHPromise.then((result) => {
    bb.generate({
      bindto: "#chart",
      data: {
        columns: [["pH"].concat(result)],
        types: {
          pH: "area-spline",
        },
        colors: {
          humidity: "blue",
        },
      },
    });
  });
}, 1500);
