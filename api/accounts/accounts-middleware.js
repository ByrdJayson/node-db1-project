const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const errorMessage = { status: 400 }
  const { name, budget } = req.body
  if(name === undefined || budget === undefined) {
    errorMessage.message = 'name and budget are required'
    next(errorMessage)
  } else if(typeof name !== 'string') {
    errorMessage.message = 'name of account must be a string'
    next(errorMessage)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errorMessage.message = 'name of account must be between 3 and 100'
    next(errorMessage)
  } else if (typeof budget !== 'number' || typeof budget === isNaN(budget)) {
    errorMessage.message = 'budget of account must be a number'
    next(errorMessage)
  } else if (budget < 0 || budget > 1000000) {
    errorMessage.message = 'budget of account is too large or too small'
    next(errorMessage)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  next()
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({status: 404, message: 'Account Not Found'})
    } else {
      req.account = account
      next()
    }
  } catch(err) {
    next(err)
  }
}
