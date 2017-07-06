const bodyParser = require('body-parser');

module.exports = (server) => {
    const Task = server.models.Task;
    const User = server.models.User;

    return {
        list,
        create,
        remove,
        update
    };

    function list(req, res) {
        return Task.find()
            .then(tasks => res.send(tasks));
    }

    function create(req, res) {
        let task = new Task(req.body);
        task.owner = req.token.userId;

        task.save()
            .then(addToUser)
            .then(task => res.status(201).send(task))
            .catch(error => res.status(500).send(error));


        function addToUser(task) {
            return User.findById(req.token.userId)
                .then(user => {
                    user.tasks.push(task);
                    return user.save();
                })
                .then(user => {return task;});
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
};