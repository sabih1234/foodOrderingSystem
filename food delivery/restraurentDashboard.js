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
    const RestraurentName = document.getElementById("RestraurentName");
    if (user) {
        var uid = user.uid;

        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                console.log("Snapshot", snapshot);
                console.log("Snapshot Data", snapshot.data());
                console.log("Snapshot Restraurent Data", snapshot.data().RestraurentName);
                RestraurentName.innerText = snapshot.data().RestraurentName;
            }).catch((er) => {
                console.log("Error", er);
            })

    } else {
        location.href("./restraurentLogin.html")

        // ...
        // console.log('user is not signed in to retrive username');
    }
});


let logOut = () => {
    firebase.auth().signOut()
        .then(function() {
            location.href = "./restraurentLogin.html"
        })
        .catch(function(er) {
            console.log(er);
        })
}



let addItem= () => {

    var todo = document.getElementById("todo").value;
    var imageFile = document.getElementById("imageFile")
    var imageKey = imageFile.files[0];
    // console.log();
    var imagesRef = storage.ref().child('images/' + imageKey.name);
    var uploadTask = imagesRef.put(imageKey);

    uploadTask.snapshot.ref.getDownloadURL()
        .then((url) => {
            console.log("URL", url);
            firebase.firestore().collection("todos").add({
                    todo: todo,
                    uid: userID,
                    image: url
                })
                .then(function() {
                    console.log(userID);
                    console.log("Object url", url);
                    console.log("Data Added");
                    getTodo(userID);
                })
                .catch(function(error) {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })

        swal({
            title: "Good job!",
            text: "Successfully sign up",
            icon: "success",
            button: "next",
        }).then((value) => {
            location.href = "./restraurentlogin.html"
        })
}

let getTodo = (userID) => {
    todoArray = []
    firebase.firestore().collection("todos").where("uid", "==", userID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                todoArray.push(doc.data());

                document.getElementById("main").innerHTML = "";

            });
            todoArray.forEach((item, index) => {
                // yahn pe console
                console.log(index, item.todo);
                console.log("Url Index", item.image);

                document.getElementById("main").innerHTML = "";

                var mainDiv = document.createElement("div")
                var para = document.createElement("p")
                var text = document.createTextNode(item.todo)

                var image = document.createElement("img")
                image.setAttribute("src", item.image);
                image.setAttribute("height", "100")
                image.setAttribute("width", "100")

                para.appendChild(text)
                mainDiv.appendChild(image);
                mainDiv.appendChild(para)
                document.getElementById("main").appendChild(mainDiv)


            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}