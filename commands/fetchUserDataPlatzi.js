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

const returnStatus = (status, error, data) => {
  return {
    status: status,
    error: error,
    data: data,
  }
}

module.exports = async function fetchUserDataPlatzi(user) {
  console.log(user)
  if (!user) {
    return returnStatus('No user', 404, {})  
  }

  try {
    const res = await axios.get(`${PLATZI_URL}/@${user}/`)
    const dataBody = await res.data

    // perfil es privado
    if (dataBody.includes('PrivateProfile')) {
      return returnStatus('PrivateProfile', 500, {})
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

      return returnStatus('OK', 200, userDataFormatted)
    }
  } catch (error) {
    // Error 404
    return returnStatus(error.message, error.status, {})
  }
}

function filterCourses(obj) {
  const { slug, color, image, approved, diploma, deprecated, completed, exam_url, material_seen, total_material, has_exam, ...objRes } = obj
  return objRes
}
function filterCareers(obj) {
  const { slug, color, approved, diploma, percentage, ...objRes } = obj
  return objRes
}
function filterContributions(obj) {
  const { content, author_id, type, ...objRes } = obj
  return objRes
}
