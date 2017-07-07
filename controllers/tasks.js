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
        let project;
        let user;
        let task;
        return User.findById(req.token.userId)
            .then(createTask)
            .then(instance => task = instance)
            .then(addToTask)
            .then(addToUser)
            .then(findProject)
            .then(ensureExist)
            .then(addToProject)
            .then(task => res.status(201).send(task))
            .catch(error => res.status(500).send(error));

        function createTask(data) {
            user = data;
            return new Task(req.body);
        }

        function addToTask(task) {
            task.creator = req.token.userId;
            task.project = req.params.idProject;
            return task.save();
        }

        function addToUser(task) {
            user.tasks.push(task.id);
            return user.save();
        }

        function addToProject(data) {
            data.tasks.push(task.id);
            return data.save();
        }

        function ensureExist(data) {
            return data ? data : Promise.reject({code: 422, reason: 'unprocessable.entities'});
        }

        function findProject() {
            return project= Project.findById(req.params.idProject);
        }
    }

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