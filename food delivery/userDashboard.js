// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User

//         var email = user.email;


//         // ...
//     } else {
//         // User is signed out
//             // ...
//     }
// });

firebase.auth().onAuthStateChanged((user) => {
    const userName = document.getElementById("userName");
    if (user) {
        var uid = user.uid;

        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                console.log("Snapshot", snapshot);
                console.log("Snapshot Data", snapshot.data());
                console.log("Snapshot Restraurent Data", snapshot.data().userName);
                userName.innerText = snapshot.data().userName;
            }).catch((er) => {
                console.log("Error", er);
            })

    } else {
        location.href("./userLogin.html")

        // ...
        // console.log('user is not signed in to retrive username');
    }
});


let logOut = () => {
    firebase.auth().signOut()
        .then(function() {
            location.href = "./userLogin.html"
        })
        .catch(function(er) {
            console.log(er);
        })
}