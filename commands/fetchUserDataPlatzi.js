const axios = require('axios')

const PLATZI_URL = 'https://platzi.com'

// Request
// const fetchUserDataPlatzi = require('./fetchUserDataPlatzi')
// const { status, error, data } = await fetchUserDataPlatzi(userPlatzi)

// Logs:
// fetchUserDataPlatzi() // user: undefined
// fetchUserDataPlatzi('@404') // 404
// fetchUserDataPlatzi('@privado') // privado
// fetchUserDataPlatzi('@userValido') // OK

module.exports = async function fetchUserDataPlatzi(user) {
  if (!user) {
    return {
      status: 'No User',
      error: true,
      data: {},
    }
  }

  try {
    const res = await axios.get(`${PLATZI_URL}/@${user}/`)
    const dataBody = await res.data

    // perfil es privado
    if (dataBody.includes('PrivateProfile')) {
      return {
        status: 'PrivateProfile',
        error: true,
        data: {},
      }
    }

    // si el perfil es publico
    let data = dataBody.match(/window.data(.|\n)*?};/g)
    if (data && data.length > 0) {
      data = data[0].replace('window.data =', '').replace('};', '}')
      const userData = JSON.parse(JSON.stringify(eval('(' + data + ')')))
      const userDataFormatted = {
        name: userData.name,
        username: userData.username,
        avatar: userData.avatar,
        profile_url: userData.profile_url,
        platzi_rank: userData.points,
        description: userData.bio,
        flag: userData.flag,
        answers: userData.answers,
        socials: userData.socials,
        website: userData.url,
        careers: userData.careers.map(obj => filterCareers(obj)),
        contributions: userData.contributions.map(obj =>
          filterContributions(obj)
        ),
        courses: userData.courses.map(obj => filterCourses(obj)),
        inactive_courses: userData.deprecated.map(obj => filterCourses(obj)),
      }

      return {
        status: 'OK',
        error: false,
        data: userDataFormatted,
      }
    }
  } catch (error) {
    // Error 404
    return {
      status: error.message,
      error: true,
      data: {},
    }
  }
}

function filterCourses(obj) {
  delete obj.slug
  delete obj.color
  delete obj.image
  delete obj.approved
  delete obj.diploma
  delete obj.deprecated
  delete obj.completed
  delete obj.exam_url
  delete obj.material_seen
  delete obj.total_material
  delete obj.has_exam
  return obj
}
function filterCareers(obj) {
  delete obj.slug
  delete obj.color
  delete obj.approved
  delete obj.diploma
  delete obj.percentage
  return obj
}
function filterContributions(obj) {
  delete obj.content
  delete obj.author_id
  delete obj.type
  return obj
}
