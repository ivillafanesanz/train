/* global moment firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSGbgRTpjQESsNHccewtaBpu1Bc_GEixY",
    authDomain: "ucla-example-fbb79.firebaseapp.com",
    databaseURL: "https://ucla-example-fbb79.firebaseio.com",
    projectId: "ucla-example-fbb79",
    storageBucket: "ucla-example-fbb79.appspot.com",
    messagingSenderId: "99308258546"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var trainName
var destination
var currentTime 
var firstTrainTime 
var frequency



$("#submit").on("click", function (event) {
    event.preventDefault();

    // Get the input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    
    var firstTrainTime = moment($("#first-time").val().trim(), "HH:mm").subtract(10, "years").format("X")
    var frequency = parseInt($("#frequency").val().trim())
    // var bidderName = $("#bidder-name").val().trim();
    // var bidderPrice = parseInt($("#bidder-price").val().trim());

    var newTrain = {
        trainName: trainName,
        destination: destination,
        
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    }

    database.ref().push(newTrain);

    console.log(trainName)
    console.log(destination)
    
    console.log(firstTrainTime)
    console.log(frequency)
  
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");






    
});

database.ref().on("child_added", function (snapshot) {
    // console.log(snapshot.val().currentTime);

    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;
    
    console.log(trainName)
    console.log(destination)
    
    console.log(firstTrainTime)
    console.log(frequency)

    // this is the below logic to calculate the missing columns:
    // var minutesAway = (currentTime - firstTrainTime) % frequency
    // var nextArrival = currentTime + minutesAway
   

    
    currentTime1 = moment();
    console.log(currentTime1)
    // firstTrainTime1 = moment(firstTrainTime,"HH:mm");
    
    console.log(firstTrainTime)
    // frequency = moment().format("mm");
    console.log(frequency)
    
    // var mins = moment.utc(moment(currentTime1, "HH:mm").diff(moment(firstTrainTime, "HH:mm"))).format("mm");
    console.log('*******', moment.unix(firstTrainTime))
    var mins = currentTime1.diff(moment.unix(firstTrainTime), "minutes")
    
    console.log("difference between first train and current times"+ mins);

    // console.log('********', parseInt(mins))
    // console.log(parseInt(frequency))
    var difference = parseInt(mins) % parseInt(frequency);

    var minutesAway = frequency -  difference
    
    console.log("this is how many minutes away the train is " + minutesAway);
    
    // acrtual minutes away is frequency - minutesAway

    // var nextArrival = currentTime1 + minutesAway;
    // var minutesAway2 = moment().format("HH:mm");

    // var nextArrival =  minutesAway + currentTime1;

    var nextArrival = moment().add(currentTime1, "m").add(minutesAway, "m").format("HH:mm")
    console.log("this is when the train will arrive next " + nextArrival);
    
    // var a = moment().diff(moment(currentTime1,"X"),"minutes");
    // console.log( "this is the time diff"+a);
    

    
    
    

    
    var a = $("<tr>");
    a.append("<td>" + trainName + "</td>");
    a.append("<td>" + destination + "</td>");
    a.append("<td>" + frequency + "</td>");
    a.append("<td>" + nextArrival + "</td>");
    a.append("<td>" + minutesAway + "</td>");
    $("#tablefill").append(a);



    
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid


