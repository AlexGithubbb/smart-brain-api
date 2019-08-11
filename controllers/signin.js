const handleSignin = (req, res, db, bcrypt) => {
  // hash password (sync way)
  // Load hash from your password DB.
  // const same = bcrypt.compareSync(password, "$2b$10$1jXLaYfVVXSpNz8F1DCzLekJdDMDlI5lpudo/BegsSFuHOB5KUnQC"); // true
  // console.log(same);

  // const diff = bcrypt.compareSync(someOtherPlaintextPassword, "$2b$10$1jXLaYfVVXSpNz8F1DCzLekJdDMDlI5lpudo/BegsSFuHOB5KUnQC"); // false
  // console.log(diff);

  db.select('*').from('login').where('email', "=", req.body.email)
    .then(
      data => {
        const {email, password} = req.body;
        if (data.length) {
          if(!email || !password) {
            return res.status(400).json('wrong input')
          }
          // console.log(data[0].hash);
          //compare the hash
          const isValid = bcrypt.compareSync(password, data[0].hash);
          // console.log(isValid);
          if (isValid) {
            db.select('*').from('users')
              .where('email', '=', email)
              .then(user => {
                // console.log(user);
                res.json(user[0])
              })
              .catch(err => res.status(400).json('unable to get user'))
          }
          // if the password is wrong, means isValid is false
          else {
            res.status(400).json('Oooops, wrong crendentials')
          }
        } else {
          res.status(400).json('Ooops, wrong crendentials')
        }
      })
  // res.status(400).json('email or password is wrong'))

  // if(req.body.email === database.users[0].email &&
  //   req.body.password === database.users[0].password 
  //   ){
  //     res.json(database.users[0])
  //   }else{
  //     res.status(400).json('error logning in')
  //   }
}

module.exports ={
  handleSignin : handleSignin
}