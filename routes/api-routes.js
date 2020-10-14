// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");


module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      car_model: req.body.car_model,
      car_make: req.body.car_make,
      name: req.body.name,
      license_plate: req.body.licensePlate
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json("Invalid Login");
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        car_make: req.user.car_make,
        car_model: req.user.car_model,
        package: req.user.package,
        parking_space: req.user.parking_space,
        complete: req.user.complete

      });
    }
  });

  app.post("/api/user_data", (req, res) => {
    if (!req.user) {
      console.log("no user")
      res.status(401).end();
    } else {
      console.log("has user")
      console.log(req.body)

      db.User.update(
        {
          package: req.body.package,
          parking_space: req.body.parking_space

        },
        { where: { id: req.user.id } }
      ).then(() => {
        res.redirect("/members")
      })
    }

  })

  app.post("/api/tasks", (req,res)=> {
      db.Task.create({
        name: req.name,
        car_make: req.car_make,
        car_model: req.car_model,
        license_plate: req.license_plate,
        package: req.package,
        parking_space: req.parking_space,
        complete: req.complete



      })
  })

  app.get("/api/customer_data", (req,res) => {
        const data = db.User.findAll({where: {
          role: "customer",
          complete:1
        }}).then(data => {
          res.render(data)
        })

        
          

  })



};
/* Sequalize.query("insert into Tasks select car_make car_model name license_plate package parking_space from users WHERE role = customer AND complete = 0 ", {
  type: Sequelize.QueryTypes.SELECT
}).then(function (results) {
  console.log(results)
})*/