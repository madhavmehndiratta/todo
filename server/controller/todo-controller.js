import Todo from '../model/Todo.js'


export const addTodo = async (request, resposne) => {
    try {
        const newTodo = await Todo.create({
            data: request.body.data,
            createdAt: Date.now()
        })
    
        await newTodo.save();
        return resposne.status(200).json(newTodo);
    } catch (error) {
        return resposne.status(500).json(error.message);
    }
}

export const getAllTodos = async (request, resposne) => {
    try {
        const todos = await Todo.find({}).sort({ 'createdAt': -1 })
        return resposne.status(200).json(todos);
    } catch (error) {
        return resposne.status(500).json(error.message);
    }
}

export const toggleTodoDone = async (request, resposne) => {
    try {
        const todoRef = await Todo.findById(request.params.id);
        const todo = await Todo.findOneAndUpdate(
            {_id: request.params.id},
            {done: !todoRef.done }
        )

        await todo.save();

        return resposne.status(200).json(todo);
    } catch (error) {
        return resposne.status(500).json(error.message);
    }
}

export const updateTodo = async (request, resposne) => {
    try {
        await Todo.findOneAndUpdate(
            {_id: request.params.id},
            {data: request.body.data }
        )

        const todo = await Todo.findById(request.params.id)

        return resposne.status(200).json(todo);
    } catch (error) {
        return resposne.status(500).json(error.message);
    }
}

export const deleteTodo = async (request, resposne) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id)

        return resposne.status(200).json(todo);
    } catch (error) {
        return resposne.status(500).json(error.message);
    }
}

