const express = require('express')
const routes = express.Router()

const Profile = {
  data: {
    name: "Luciano Weslen",
    avatar: "https://github.com/lweslen.png",
    monthlyBudget: 3000,
    hoursPerDay: 5,
    daysPerWeek: 6,
    vacationPerYear: 4,
    valueHour: 45
  },
  controllers: {
    index(request, response){
      return response.render("profile.ejs", { profile: Profile.data })
    },
    update(request, response){
      const profileData = request.body
      const weeksPerYear = 52
      const weeksPerMonth = (weeksPerYear - profileData.vacationPerYear) / 12
      const weekTotalHours = profileData.hoursPerDay * profileData.daysPerWeek
      const monthlyTotalHours = weeksPerMonth * weekTotalHours

      const valueHour = profileData.monthlyBudget / monthlyTotalHours

      profileData.valueHour = valueHour

      Profile.data = profileData

      return response.redirect("/profile")
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      dailyHours: 2,
      totalHours: 1,
      budget: 4200,
      createdAt: Date.now()
    },
    {
      id: 2,
      name: "OneTwo Project",
      dailyHours: 2,
      totalHours: 47,
      budget: 5200,
      createdAt: Date.now()
    }
  ],  
  controllers: {
    index(request, response) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? "done" : "progress"
        const budget = Job.services.calculateBugdet(job, Profile.data.valueHour)
    
        return { ...job, remaining, status, budget }
      })
    
      return response.render("index.ejs", { jobs: updatedJobs })
    },
    create(request, response){
      return response.render("job.ejs")
    },
    save(request, response) {
      const { name, dailyHours, totalHours } = request.body
      const lastId = Job.data[Job.data.length - 1] ? Job.data[Job.data.length - 1].id : 1
    
      const jobData = {
        id: lastId + 1,
        name,
        dailyHours,
        totalHours,
        createdAt: Date.now()
      }
    
      Job.data.push(jobData)
    
      return response.redirect("/")
    },
    show(request, response) {
      const jobId = request.params.id
      
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      
      if(!job){
        return response.send("Job not found")
      }
      
      job.budget = Job.services.calculateBugdet(job, Profile.data.valueHour)

      return response.render("job-edit.ejs", { job })
    },
    update(request, response) {
      const jobId = request.params.id
      
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      
      if(!job){
        return response.send("Job not found")
      }
      
      const updatedJob = {
        ...job,
        name: request.body.name,
        totalHours: request.body.totalHours,
        dailyHours: request.body.dailyHours
      }
      
      Job.data = Job.data.map((job) => {
        if(Number(job.id) === Number(jobId)){
          job = updatedJob
        }
        
        return job
      })
      
      console.log(Job.data, updatedJob)
      
      response.redirect("/")
    },
    delete(request, response) {
      const jobId = request.params.id
      
      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      response.redirect("/")
    }
  },
  services: {
    remainingDays(job){
      const jobDays = (job.totalHours / job.dailyHours).toFixed()
        
      const createdDate = new Date(job.createdAt)
      const dueDay = createdDate.getDate() + Number(jobDays)
      const dueDate = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDate - Date.now()
      const dayInMs = 1000 * 60 * 60 * 24
    
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
      return dayDiff
    },
    calculateBugdet(job, valueHour){
      return valueHour * job.totalHours
    }
  }
}

routes.get("/", Job.controllers.index)

routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)
routes.get("/job/:id", Job.controllers.show)
routes.post("/job/:id", Job.controllers.update)
routes.post("/job/delete/:id", Job.controllers.delete)

routes.get("/profile", Profile.controllers.index)
routes.post("/profile", Profile.controllers.update)

module.exports = routes