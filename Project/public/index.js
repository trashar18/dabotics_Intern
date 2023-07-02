
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyD_kWUzxosoXO1nU4M2hnRPBFlFeQMotRg",
    authDomain: "rentit-project.firebaseapp.com",
    databaseURL: "https://rentit-project-default-rtdb.firebaseio.com",
    projectId: "rentit-project",
    storageBucket: "rentit-project.appspot.com",
    messagingSenderId: "900902601029",
    appId: "1:900902601029:web:363f636aff83bde775be2c",
    measurementId: "G-487ZEC8T5H"
  };


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);


import{getDatabase,ref,set,child,update,remove} 
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"


const auth = firebase.auth()
const database = firebase.database()

function register () {

  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favourite_song = document.getElementById('favourite_song').value
  milk_before_cereal = document.getElementById('milk_before_cereal').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    
  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser

    var database_ref = database.ref()


    var user_data = {
      email : email,
      full_name : full_name,
      favourite_song : favourite_song, 
      last_login : Date.now()
    }


    database_ref.child('users/' + user.uid).set(user_data)

    alert('User Created!!')
    window.location.replace("./index1.html")
  })
  .catch(function(error) {
   
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
  
}


function login () {

  email = document.getElementById('email').value
  password = document.getElementById('password').value


  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
   
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
   
    var user = auth.currentUser

    
    var database_ref = database.ref()

  
    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data)

  
   
    alert('User Logged In!!')
    window.location.replace("./index1.html")

  })
  .catch(function(error) {

    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}



function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {

    return true
  } else {
   
    return false
  }
}

function validate_password(password) {
 
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}