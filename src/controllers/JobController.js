const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

const JobController = {
  create(request, response) {
    return response.render("job.ejs")
  },
  save(request, response) {
    const jobs = Job.get()

    const { name, dailyHours, totalHours } = request.body
    const lastId = jobs[jobs.length - 1] ? jobs[jobs.length - 1].id : 1

    const jobData = {
      id: lastId + 1,
      name,
      dailyHours,
      totalHours,
      createdAt: Date.now()
    }

    jobs.push(jobData)

    return response.redirect("/")
  },
  show(request, response) {
    const jobId = request.params.id
    const jobs = Job.get()
    const profile = Profile.get()

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return response.send("Job not found")
    }

    job.budget = JobUtils.calculateBugdet(job, profile.valueHour)

    return response.render("job-edit.ejs", { job })
  },
  update(request, response) {
    const jobId = request.params.id
    const jobs = Job.get()

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return response.send("Job not found")
    }

    const updatedJob = {
      ...job,
      name: request.body.name,
      totalHours: request.body.totalHours,
      dailyHours: request.body.dailyHours
    }

    const updatedJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob
      }

      return job
    })

    Job.update(updatedJobs)

    response.redirect("/")
  },
  delete(request, response) {
    const jobId = request.params.id

    Job.delete(jobId)

    response.redirect("/")
  }
}

module.exports = JobController