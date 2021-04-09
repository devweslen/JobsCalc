let data = {
  name: "Luciano Weslen",
  avatar: "https://github.com/lweslen.png",
  monthlyBudget: 3000,
  hoursPerDay: 5,
  daysPerWeek: 6,
  vacationPerYear: 4,
  valueHour: 45
}

module.exports = {
  get(){
    return data
  },
  update(newData){
    data = newData
  }
}