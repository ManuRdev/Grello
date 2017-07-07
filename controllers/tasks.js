const bodyParser = require('body-parser');

module.exports = (server) => {
    const Task = server.models.Task;
    const User = server.models.User;
    const Project = server.models.Project;

    return {
        list,
        create,
        remove,
        update,
        infoTask,
        assign
    };

    function list(req, res) {
        return Task.find()
            .then(tasks => res.send(tasks));
    }

    function create(req, res) {
        let user;
        return User.findById(req.token.userId)
            .then(createTask)
            .then(addToTask)
            .then(task => res.status(201).send(task))
            .catch(error => res.status(500).send(error));

        function createTask(data) {
            user = data;
            return new Task(req.body);
        }

        function addToTask(task) {
            task.creator = req.token.userId;
            task.project = req.params.id;
            return task.save();
        }
    }
    // function create(req, res) {
    //     let project;
    //     let task = new Task(req.body);
    //     task.owner = req.token.userId;
    //
    //     addToUser(task)
    //         .then(addToProject)
    //         .then(task.save())
    //         .then(task => res.status(201).send(task))
    //         .catch(error => res.status(500).send(error));
    //
    //
    //     function addToUser(task) {
    //         return User.findById(req.token.userId)
    //             .then(user => {
    //                 user.tasks.push(task.id);
    //                 return user.save();
    //             })
    //             .then(user => {return task;});
    //     }
    //
    //     function addToProject(task) {
    //         project= Project.findById(req.params.idProject)
    //         project.tasks.push(task.id);
    //         return project.save();
    //     }
    // }

    function remove(req, res) {
        return Task.findByIdAndRemove(req.params.id)
            .then(() => res.status(204).send())
    }

    function update(req, res) {
        return Task.findByIdAndUpdate(req.params.id, req.body)
            .then(task => res.status(204).send());
    }

    function infoTask(req,res) {

    }
    function assign(req, res) {

    }
};