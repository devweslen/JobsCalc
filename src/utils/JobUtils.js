const JobUtils = {
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

module.exports = JobUtils