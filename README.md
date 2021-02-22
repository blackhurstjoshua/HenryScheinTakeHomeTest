# HenryScheinTakeHomeTest

Henry Schein Developer Candidate 
Take Home Test V1
Using best practices complete the following task:

Create a restful web service that manages people.  You don’t need to store the people in a database.  When your web service starts, you can start with an empty set of people.  A person has the following properties:
 
firstName, lastName, dateOfBirth, emailAddress, socialSecurityNumber

Create the following REST endpoints:

GET /person
Return all of the person objects in the running app

GET /person/:socialSecurityNumber
Return the single person in the running app (if a person with that socialSecurityNumber exists)

POST /person
Create a new person in the running app and return that person as JSON in the POST result
All person fields are required.  
Don’t allow missing or badly formatted fields.  (dateOfBirth cannot be “dog”) (email address has a @) etc
Don’t create duplicate persons with the same socialSecurityNumber.

PUT /person/:socialSecurityNumber
Update an existing person (if a person with that social security number exists) and return the person as JSON.
Don’t allow updating the socialSecurityNumber.
Don’t allow badly formatted fields.

DELETE /person/:socialSecurityNumber
Delete the existing person (if a person with that socialSecurityNumber exists)


Return appropriate http response codes
200 – success for GET, PUT and DELETE
201 – success for POST
400 – client side errors.  Include a message to the user about what the error is
500 – unknown server side errors.  Probably use try/catch


Use best practices for you code.  The code you work with at Henry Schein will be a robust REST API.  
Please use NodeJS and ExpressJS for this REST API.
Please upload your application to github or something similar.  Code email attachments are problematic.
