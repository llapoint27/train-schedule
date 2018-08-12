$(document).ready(function () {

  //  Initialize Firebase
  var config = {
    apiKey: "AIzaSyAE7OrQ4_XT971i1BDIhFmoGda1qrx9Ius",
    authDomain: "train-schedule-70fdb.firebaseapp.com",
    databaseURL: "https://train-schedule-70fdb.firebaseio.com",
    projectId: "train-schedule-70fdb",
    storageBucket: "train-schedule-70fdb.appspot.com",
    messagingSenderId: "743439704818"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  $("#addButton").on("click", function () {

    event.preventDefault();

    //storing user input into variables
    var trainName = $("#trainName").val().trim();
    var destintaion = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    //making sure variables are logging correct inputs in console
    // console.log(trainName);
    // console.log(destintaion);
    // console.log(firstTrain);
    // console.log(frequency);

    //variable to push object into firebase

    var newTrainInfo = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,

    }

    database.ref().push(newTrainInfo);

    //clear the input fields
    $("#trainName").val("");
    $("destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");



  });


  database.ref().on("child_added", function (childSnapshot, key) {

    console.log(childSnapshot.val());

    var FBname = childSnapshot.val().name;
    var FBdestination = childSnapshot.val().destination;
    var FBtrain = childSnapshot.val().firstTrain;
    var FBfreq = childSnapshot.val().frequency;

    console.log(FBname);
    console.log(FBdestination);
    console.log(FBtrain);
    console.log(FBfreq);

    var calculateTime = moment().diff(moment.unix(FBtrain), "minutes");
    var timeRemainder = moment().diff(moment.unix(FBtrain), "minutes") % FBfreq;
    var minutes = FBfreq - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(calculateTime);
    console.log(minutes);
    console.log(nextTrainArrival);


  });





});