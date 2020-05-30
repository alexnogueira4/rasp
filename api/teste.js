module.exports = (app, database) => {
    app.get('/movies', (req, res, next) => {
        database.collection('rooms').doc('alice').get()
        .then((snapshot) => {
          console.log(snapshot.data());
          res.json(snapshot.data())
          
          // snapshot.forEach((doc) => {
          //   console.log(doc.id, '=>', doc.data());
          // });
        })
        .catch((err) => {
          console.log('Error getting documents', err);
          res.json({sdfsf:34})
        });
        // repository.getAllMovies((err, movies) => {
        //   if (err) return next(err)
        //   res.json(movies)
        // })
      })
  
    app.get('/movies/premieres', (req, res, next) => {
        //  repository.getMoviePremiers((err, movies) => {
        //    if (err) return next(err)
        //    res.json(movies)
        //  })
       })
  
    app.get('/movies/:id', (req, res, next) => {
        //   repository.getMovieById(req.params.id, (err, movie) => {
        //     if (err) return next(err)
        //     res.json(movie)
        //   })
        })
  }
  