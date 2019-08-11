const handleProfile = (db) => (req, res) => {
  const {id}  = req.params;
  // forEach way
  // let found = false;
  // database.users.forEach(user => {
  //   if(user.id === id){
  //      found = true;
  //      return res.json(user);
  //   }
  // })
  // if (!found) {
  //   res.status(400).json('user not found');
  // }
  // filter way
  // const foundUser = database.users.filter(user => user.id === id)
  // res.json(foundUser)
  db.select('*').from('users').where({ id }) // where({id:id})
    .then(user => {
      if (user.length) {
        // console.log(user[0]);
        res.json(user[0])
      } else {
        res.status(400).json('user not found')
      }
    })
    .catch(err => res.status(400).json('user getting error'))
}

module.exports = {
  handleProfileGet: handleProfile
}