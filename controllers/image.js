const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ca84e148be6e4a74ac5de36d793d3b28'
});

const handleAPIKey = (req, res) => {
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input
    )
    .then(response => res.json(response))
    .catch(err => res.status(400).json('wrong api'))
}

const handleImage = (db) => (req, res) => {
  // get the current user id
  const { id } = req.body;
  // db.select('*').from('users').where({id})
  // .then(user =>{
  //   if(user.length){
  //      res.json(user[0].entries ++)
  //   }else{
  //     res.status(400).json('user\'s entries not found')
  //   }
  // })
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json('entries not found...'))
  // const currentUser = database.users.filter(user => user.id === id);
  // currentUser[0].entries++;
  // res.json(currentUser[0].entries)
}

module.exports ={
  handleImage : handleImage,
  handleAPIKey: handleAPIKey
}