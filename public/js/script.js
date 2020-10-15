

$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const carMake = $("input#carMake-input");
  const carModel = $("input#carModel-input");
  const nameInput = $("input#name-input");
  const licensePlateInput = $("#licensePlate");
  const parkForm = $("form.park");
  const packageChoice = $("#package");
  const parkingSpace = $("#spot-input");
  // let referralCode;
  
  let referal = $("#ref-code")

  
  
  
  



  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password, );
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {


        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  // Getting references to our form and input
  const signUpForm = $("form.signup");


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      car_make: carMake.val().trim(),
      name: nameInput.val().trim(),
      car_model: carModel.val().trim(),
      license_plate: licensePlateInput.val().trim()

    };

    if (!userData.email || !userData.password || !userData.car_make || !userData.car_model || !userData.name) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.car_make, userData.name, userData.car_model);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, car_make, name, car_model, license_plate) {
    $.post("/api/signup", {
      email: email,
      password: password,
      car_make: car_make,
      name: name,
      car_model: car_model,
      license_plate: license_plate
    })
      .then(() => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function addTask(name, car_make, car_model, license_plate, package, parking_space, complete) {
    $.post("/api/tasks", {
      name: name,
      car_make: car_make,
      car_model: car_model,
      license_plate: license_plate,
      package: package,
      parking_space: parking_space,
      complete: complete

    })

  }

  function findTask() {

    
    $.get("/api/user_data").then(data => {

      addTask(data.name, data.car_make, data.car_model, data.license_plate, data.package, data.parking_space, data.complete )
    })

    


  }

  

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  parkForm.on("submit", event => {
    event.preventDefault();

    $.post("/api/user_data", {
      package: packageChoice.val(),
      parking_space: parkingSpace.val().trim(),
      complete: 0
    }).then(() => { 
      findTask();
      window.location.replace("/thankyou")



    })
  });

  var generateBTN = document.querySelector("#code");

  function makeCode() {
     referralCode = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)

      referralCode += possible.charAt(Math.floor(Math.random() * possible.length));
      
    return referralCode;

    
  }
  
  $("#codeBtn").on("click", event => {
    event.preventDefault();
    
    referal.value = makeCode();
    
  } )

  function writereferralCode() {
    var referralCode = makeCode();
    var referralCodeText = document.querySelector("#referralCode");
  
    referralCodeText.value = referralCode;
  
  }
  
  // Add event listener to generate button
  generateBTN.addEventListener("click", writereferralCode);

});

