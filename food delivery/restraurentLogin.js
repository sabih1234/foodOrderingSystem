let Login = (event) => {

    console.log(event);
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    var form = document.getElementById('needs-validation')

    if (!form) {
        return
    }
    form.classList.add('was-validated')


    if (!email || !password) {
        swal({
            title: "Empty Fields",
            text: "please fill input fields",
            icon: "error",
            button: "Try Again",
        });
    } else {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("Login Successfull")
                location.href = ("./restraurentDashboard.html")
                    // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log("error", errorMessage)

                swal({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                    button: "Try Again",
                });
            });
    }

}