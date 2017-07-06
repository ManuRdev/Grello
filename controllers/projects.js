module.exports = (server) => {
    const Project = server.models.Project;
    const User = server.models.User;

    return {
        list,
        create,
        remove,
        update,
        invite,
        kick
    };

    function list(req, res) {
        Project.find()
            .then(projects => res.send(projects))
    }

    function create(req, res) {
        const userId = req.token.userId;

        let project = new Project(req.body);
        project.creator = userId;
        project.members.push(userId);

        project.save()
            .then(project => res.status(201).send(project))
            .catch(err => res.status(500).send(err));
    }

    function remove(req, res) {
        findProject(req)
            .then(ensureExist)
            .then(ensureCreator)
            .then(remove)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function remove() {
            return Project.findByIdAndRemove(req.params.id)
        }
    }

    function update(req, res) {
        findProject(req)
            .then(ensureExist)
            .then(ensureCreator)
            .then(update)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function update() {
            return Project.findByIdAndUpdate(req.params.id, req.body)
        }
    }

    function invite(req, res) {
        let project;

        findProject(req)
            .then(ensureExist)
            .then(ensureCreator)
            .then(instance => project = instance)
            .then(findUser)
            .then(ensureExist)
            .then(ensureNotAlreadyMember)
            .then(addMember)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findById(req.params.userId)
        }

        function ensureCreator(project) {
            return project.creator.toString() === req.token.userId ? project : Promise.reject({code: 403, reason: 'not.allowed'});
        }

        function ensureNotAlreadyMember(user) {
            return project.members.some(member => member === user._id.toString()) ? Promise.reject({code: 403, reason: 'user.already.member'}) : user;
        }

        function addMember(user) {
            project.members.push(user);
            return project.save();
        }
    }

    function kick(req, res) {
        let project;

        findProject(req)
            .then(ensureExist)
            .then(ensureCreator)
            .then(instance => project = instance)
            .then(findUser)
            .then(ensureExist)
            .then(ensureIsMember)
            .then(removeMember)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findById(req.params.userId)
        }

        function ensureCreator(project) {
            return project.creator.toString() === req.token.userId ? project : Promise.reject({code: 403, reason: 'not.allowed'});
        }

        function ensureIsMember(user) {
            return project.members.some(member => member.toString() === user._id.toString()) ? user : Promise.reject({code: 403, reason: 'user.not.member'});
        }

        function removeMember(user) {
            project.members.remove(user);
            return project.save();
        }
    }

    // Globals
    function findProject(req) {
        return Project.findById(req.params.id)
    }

    function ensureExist(data) {
        return data ? data : Promise.reject({code: 422, reason: 'unprocessable.entities'});
    }
};




