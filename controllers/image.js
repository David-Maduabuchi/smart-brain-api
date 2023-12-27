//we are moving the clarifai api from the front end because the API key gets shown in the console in the front end and the best way
//tackle that is to move it to the back end. So we first installed clarifai api



const handleImage = (req, res, db) => {
    const { id } = req.body;
    //we have to update using knex update syntax
    db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        res.json(entries[0].entries);
      })
      .catch(err => {
        res.status(400).json("errror getting entries");
      })
  }
  module.exports = {
    handleImage: handleImage
  }