// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
    res.render("index")
    }
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
    res.render("login");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    
    if (req.user.role === "customer") {
      
      res.render("customerDash");
    } else if (req.user.role === "employee") {
      db.Task.findAll({where:{complete:0}}).then(data => {
        res.render("employeeDash", data)
      })
      

    
    }

  });
  app.get("/services", isAuthenticated, (req, res) => {
    res.render("services");
  });

  app.get("/support", isAuthenticated, (req, res) => {
    res.render("support");
  });

  app.get("/members", isAuthenticated, (req, res) => {
    res.render("customerDash");
  });

  app.get("/park", isAuthenticated, (req, res) => {
    res.render("park");
  });

  app.get("/faq", isAuthenticated, (req, res) => {
    res.render("faq");
  });
  app.get("/refer", isAuthenticated, (req, res) => {
    res.render("refer");
  });
  app.get("/thankyou", isAuthenticated, (req, res) => {
    res.render("thankyou");
  });

  app.get("/employee", isAuthenticated, (req, res) => {
    
    db.Task.findAll({where:{complete:0}}).then(data => {
      const tasks = data.map( (task) => {
        
      return task.dataValues

      });
      
      res.render("employeeDash", {tasks: tasks})
        
      
      ;
    })
    
  });

};
