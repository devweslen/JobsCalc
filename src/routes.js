const express = require('express')
const routes = express.Router()

const profile = {
  name: "Luciano Weslen",
  avatar: "https://avatars.githubusercontent.com/u/36344130?v=4",
  monthlyBudget: 3000,
  hoursPerDay: 5,
  daysPerWeek: 6,
  vacationPerYear: 4
}

routes.get("/", (request, response) => response.render("index.ejs"))
routes.get("/job", (request, response) => response.render("job.ejs"))
routes.get("/job/edit", (request, response) => response.render("job-edit.ejs"))
routes.get("/profile", (request, response) => response.render("profile.ejs", { profile }))

module.exports = routes