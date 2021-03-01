class Person {
  constructor(firstName, lastName, dateOfBirth, emailAddress, socialSecurityNumber) {
    this.firstName = firstName
    this.lastName = lastName
    this.dateOfBirth = new Date(dateOfBirth)
    this.emailAddress = emailAddress
    this.socialSecurityNumber = socialSecurityNumber
  }

  validate() {
    let letters = /^[a-zA-Z]+$/
    let socials = /^(\d{3}-\d{2}-\d{4})+$/

    if (this.firstName && this.lastName && this.dateOfBirth && this.emailAddress && this.socialSecurityNumber) {
      if (letters.test(this.firstName) && letters.test(this.lastName)) {
        if (this.dateOfBirth != "Invalid Date" && this.dateOfBirth < new Date()) {
          if (this.emailAddress.indexOf('@') > -1) {
            if (socials.test(this.socialSecurityNumber))
              return true
          }
        }
      }
    }
  }
}

module.exports = Person