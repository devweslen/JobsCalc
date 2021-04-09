const Profile = require('../models/Profile')


const ProfileController = {
  index(request, response){
    return response.render("profile.ejs", { profile: Profile.get() })
  },
  update(request, response){
    const profileData = request.body
    const WEEKS_PER_YEAR = 52
    const MONTHS_PER_YEAR = 12
    const weeksPerMonth = (WEEKS_PER_YEAR - profileData.vacationPerYear) / MONTHS_PER_YEAR
    const weekTotalHours = profileData.hoursPerDay * profileData.daysPerWeek
    const monthlyTotalHours = weeksPerMonth * weekTotalHours

    const valueHour = profileData.monthlyBudget / monthlyTotalHours

    const updatedProfile = {
      ...Profile.get(),
      ...profileData,
      valueHour
    }

    Profile.update(updatedProfile)

    return response.redirect("/profile")
  }
}

module.exports = ProfileController