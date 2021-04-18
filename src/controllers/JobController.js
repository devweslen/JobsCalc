const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

const JobController = {
  create(request, response) {
    return response.render("job.ejs")
  },
  async save(request, response) {
    const newJob = request.body

    Job.create(newJob)

    return response.redirect("/")
  },
  async show(request, response) {
    const jobId = request.params.id
    const jobs = await Job.get()
    const profile = await Profile.get()

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return response.send("Job not found")
    }

    job.budget = JobUtils.calculateBugdet(job, profile.valueHour)

    return response.render("job-edit.ejs", { job })
  },
  async update(request, response) {
    const jobId = request.params.id
    const { name, totalHours, dailyHours } = request.body

    const updatedJob = {
      name: name,
      totalHours: totalHours,
      dailyHours: dailyHours
    }

    await Job.update(jobId, updatedJob)

    response.redirect("/")
  },
  async delete(request, response) {
    const jobId = request.params.id

    await Job.delete(jobId)

    response.redirect("/")
  }
}

module.exports = JobController