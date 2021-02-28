function findPerson(key, persons) {
  let person = persons.find((per, index) => {
    if (per.socialSecurityNumber == key)
    return true
  })
  return person
}

function findIndex(key, persons) {
  let index = persons.findIndex((per, index) => {
    if (per.socialSecurityNumber == key)
    return true
  })
  return index
}

function validSocial(key) {
  let socials = /^(\d{3}-\d{2}-\d{4})+$/
  return socials.test(key)
}

module.exports = {
  findPerson,
  findIndex,
  validSocial
}