function signup() {
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;

    var password = document.getElementById("password").value;
  
    //console.log(RestraurentName);
    // console.log(email);
    // console.log(number);
    // console.log(country);
  
    // console.log(password);
  
  
  
    //var db = firebase.firestore();
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log("Login Successfull");
  
            firebase.firestore().collection("users").doc(user.uid).set({
                userName: userName,
              email: email,
              number: number,
              country: country,
      city:city,
                    password: password,
                    uid: user.uid
                })
                .then(function() {
                    console.log("Data Succesfull");
                }).catch(error => {
                    console.log(error);
                })
            swal({
                title: "Good job!",
                text: "Successfully sign up",
                icon: "success",
                button: "next",
            }).then((value) => {
                location.href = "./userLogin.html"
            })
  
  

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error", errorMessage)
            swal("OOpS!", errorMessage, "error");
  
            // ..
        });
      }
  