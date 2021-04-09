const Job = require("../models/Job")
const Profile = require("../models/Profile")
const JobUtils = require("../utils/JobUtils")

const DashboardController = {
  index(request, response) {
    const jobs = Job.get()
    console.log("jobs", jobs)
    const profile = Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    let jobTotalHours  = 0

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? "done" : "progress"

      statusCount[status] += 1

      const budget = JobUtils.calculateBugdet(job, profile.valueHour)

      jobTotalHours += status === "progress" ? Number(job.dailyHours) : 0

      return { ...job, remaining, status, budget }
    })

    const freeHours = profile.hoursPerDay - jobTotalHours 

    return response.render("index.ejs", { jobs: updatedJobs, profile, statusCount, freeHours })
  }
}

module.exports = DashboardController