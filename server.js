const app = require('./index')

app.listen(8081, (err) => {
    if (err) throw err
    console.log('Server up and running on 127.0.0.1:8080')
})