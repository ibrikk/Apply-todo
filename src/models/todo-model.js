class TodoModel {
    constructor(task, timestamp, id) {
        this.task = task;
        this.timestamp = timestamp;
        this.id = id;
        
    }

    getTask() {
        return this.task;
    }

    setTask(task) {
        this.task = task;
    }

    getTimestamp() {
        return this.timestamp;
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

}

export default TodoModel;