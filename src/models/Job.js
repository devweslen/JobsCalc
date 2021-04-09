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
  get(){
    return data
  },
  update(newData){
    data = newData
  },
  delete(id){
    data = data.filter(job => Number(job.id) !== Number(id))
  }
}