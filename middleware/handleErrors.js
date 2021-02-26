const { GeneralError } = require('../utils/errors')

const handleErrors = (err, req, res, nesxt) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: err.getCode(),
      message: err.message
    })
  }

  return res.status(err.getCode()).json({
    status: err.getCode(),
    message: err.message
  })
}

module.exports = handleErrors;
