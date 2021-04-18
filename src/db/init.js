const Database = require('./config')

const initDb = {
  async init(){
    const db = await Database()
  
    await db.exec(`
      CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthlyBudget INT,
        hoursPerDay INT,
        daysPerWeek INT,
        vacationPerYear INT,
        valueHour INT
      )
    `)
    
    await db.exec(`
      CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        dailyHours INT,
        totalHours INT,
        budget INT,
        createdAt DATETIME
      )
    `)
    
    await db.run(`
      INSERT INTO profile (
        name, 
        avatar, 
        monthlyBudget, 
        hoursPerDay, 
        daysPerWeek, 
        vacationPerYear, 
        valueHour
      ) VALUES (
        "Luciano Weslen",
        "https://github.com/lweslen.png",
        3000,
        5,
        6,
        4,
        45
      )
    `)
    
    await db.run(`
      INSERT INTO jobs (
        name,
        dailyHours,
        totalHours,
        budget,
        createdAt
      ) VALUES (
        "Pizzaria Guloso",
        2,
        1,
        4200,
        ${Date.now()}
      )
    `)
    
    await db.run(`
      INSERT INTO jobs (
        name,
        dailyHours,
        totalHours,
        budget,
        createdAt
      ) VALUES (
        "OneTwo Project",
        2,
        47,
        5200,
        ${Date.now()}
      )
    `)
    
    Database.close()
  }
}

initDb.init()