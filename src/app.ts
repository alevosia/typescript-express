import express, { Request, Response, NextFunction } from 'express'

import todoRoutes from './routes/todos'

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/todos', todoRoutes)

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
	res.json({ message: error.message })
})

app.listen(PORT, () => {
	console.log(`App is now listening to port ${PORT}.`)
})
