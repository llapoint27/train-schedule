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
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();


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
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");


  });


  database.ref().on("child_added", function (childSnapshot, key) {

    var FBname = childSnapshot.val().name;
    var FBdestination = childSnapshot.val().destination;
    var FBtrain = childSnapshot.val().firstTrain;
    var FBfreq = childSnapshot.val().frequency;

    //converts first tmime
    var firstCovertedTime = moment(FBtrain, "HH:mm").subtract(1, "years");

    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //difference in time
    var difference = moment().diff(moment(firstCovertedTime), "minutes");
    

    //find the remainder (time apart)
    var timeRemainder = difference % FBfreq;

    //minutes until the train arrives
    var minutes = FBfreq - timeRemainder;

    //next train variables
    var next = moment().add(minutes, "minutes");
    var nextTrainTime = moment(next).format("HH:mm");

    // console.log(firstCovertedTime);
    // console.log(minutes);
    // console.log(nextTrainTime);

    //append the next Train's info into table

    $("#trainInfo > tbody").append("<tr><th>" + FBname + "</th><th>" + FBdestination + "</th><th>" + FBfreq + "</th><th>" + nextTrainTime + "</th><th>" + minutes + "</th>");

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});