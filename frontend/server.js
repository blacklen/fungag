const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const proxy = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

app
    .prepare()
    .then(() => {
        server.use(cookieParser())
        server.use('/api', proxy({ target: process.env.BASE_URL, changeOrigin: true }))


        server.get('/p/:id', (req, res) => {
            const actualPage = '/post'
            const queryParams = { title: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
