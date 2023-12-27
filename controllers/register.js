const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body

    if(!name || !email || !password ) {
       return res.status(400).json("Please fill in the required credentials")
    }
    const hash = bcrypt.hashSync(password);//storing the password in an encrypted format
    //YOU CREATE A TRANSACTION WHEN YOU WANT TO DO TWO THINGS AT ONCE.
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*') //this means that it should return whatever it is inserting after its done. and that is the db response
            .insert({
              name: name,
              email: loginEmail[0].email,
              joined: new Date()
            })
            .then(db_response => {
              res.json(db_response[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
      .catch(err => res.status(400).json('unable to register'))
  }


export default handleRegister;