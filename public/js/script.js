$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
    const carMake =  $("input#carMake-input");
    const carModel = $("input#carModel-input");
    const nameInput = $("input#name-input");
  
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
      loginUser(userData.email, userData.password);
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
      car_model: carModel.val().trim()
      
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
  function signUpUser(email, password, car_make, name, car_model) {
    $.post("/api/signup", {
      email: email,
      password: password,
      car_make: car_make,
      name: name,
      car_model: car_model,
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  });

  