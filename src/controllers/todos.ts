import { RequestHandler } from 'express'
import { Todo } from '../models/todo'

const TODOS: Todo[] = []

type TodoRequestParams = {
	id: string
}

type TodoRequestBody = {
	text: string
}

type TodoResponseBody = {
	message: string
	data?: Todo | Todo[]
}

export const getTodos: RequestHandler = (_, res) => {
	res.json({ todos: TODOS })
}

export const createTodo: RequestHandler = (req, res) => {
	const text = (req.body as TodoRequestBody).text
	const newTodo = new Todo(Math.random().toString(), text)

	TODOS.push(newTodo)

	res.status(201).json({
		message: 'Added new todo.',
		data: newTodo,
	})
}

export const updateTodo: RequestHandler<TodoRequestParams, TodoResponseBody, TodoRequestBody> = (
	req,
	res
) => {
	const targetTodoId = req.params.id
	const text = req.body.text

	const targetTodo = TODOS.find((todo) => todo.id === targetTodoId)

	if (!targetTodo) {
		res.status(404).json({
			message: 'Todo not found',
		})
	} else {
		targetTodo.text = text
		res.json({
			message: 'Updated todo.',
			data: targetTodo,
		})
	}
}

export const deleteTodo: RequestHandler<TodoRequestParams, TodoResponseBody> = (req, res) => {
	const targetTodoId = req.params.id
	const targetTodoIndex = TODOS.findIndex((todo) => todo.id === targetTodoId)

	if (targetTodoIndex < 0) {
		res.status(404).json({
			message: 'Todo not found',
		})
	} else {
		TODOS.splice(targetTodoIndex, 1)
		res.json({
			message: 'Deleted todo.',
		})
	}
}
