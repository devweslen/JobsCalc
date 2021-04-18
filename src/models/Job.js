const Database = require('../db/config')

let data = [
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
]

module.exports = {
  async get(){
    const db = await Database()
    
    const jobs = await db.all(`SELECT * FROM jobs`)
    
    await db.close()
    
    return jobs
  },
  async update(jobId, updatedJob){
    const db = await Database()

    await db.run(`
      UPDATE jobs SET    
        name = "${updatedJob.name}", 
        dailyHours = ${updatedJob.dailyHours},
        totalHours = ${updatedJob.totalHours}
      WHERE id = ${jobId}
    `)

    await db.close()
  },
  async delete(id){
    const db = await Database()
    
    await db.run(`DELETE FROM jobs WHERE id = ${id}`)
    
    await db.close()
  },
  async create(newJob){
    const db = await Database()

    await db.run(`
      INSERT INTO jobs (
        name,
        dailyHours,
        totalHours,
        createdAt
      ) VALUES (
        "${newJob.name}",
        ${newJob.dailyHours},
        ${newJob.totalHours},
        ${Date.now()}
      )
    `)
    
    await db.close()
  }
}