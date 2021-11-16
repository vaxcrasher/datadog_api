const app = require('./index')

app.listen(3000, (err) => {
    if (err) throw err
    console.log('Server up and running on 127.0.0.1:3000')
})