const handleRegister = (db, bcrypt, saltRounds) => (req, res) => {

  const { name, email, password } = req.body
  if(!email || !password|| !name){
    return res.status(400).json('wrong input')
  }
  // // hash password sync way
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  // Store hash in your password DB.
  // console.log("the hash code: ",hash);
  db.transaction(trx => {
    trx.insert({ 
      email: email,
      hash: hash
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports ={
  handleRegister: handleRegister
}