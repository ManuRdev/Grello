module.exports = (server) => {
    const Team = server.models.Team;
    const User = server.models.User;

    return {
        list,
        listTeam,
        create,
        remove,
        update,
        invite,
        kick
    };

    function list(req, res) {
        Team.find()
            .then(teams => res.send(teams))
    }

    function listTeam(req, res) {
        //TODO
    }

    function create(req, res) {
        const userId = req.token.userId;
        let team = new Team(req.body);
        team.users.push(userId);

        team.save()
            .then(team => res.status(201).send(team))
            .catch(err => res.status(500).send(err));
    }

    function remove(req, res) {
        findTeam(req)
            .then(ensureExist)
            .then(remove)
            .then(() => res.status(204).send())
    .catch(err => res.status(err.code || 500).send(err.reason || err));

        function remove() {
            return Team.findByIdAndRemove(req.params.id)
        }
    }

    function update(req, res) {
        findTeam(req)
            .then(ensureExist)
            .then(update)
            .then(() => res.status(204).send())
    .catch(err => res.status(err.code || 500).send(err.reason || err));

        function update() {
            return Team.findByIdAndUpdate(req.params.id, req.body)
        }
    }

    function invite(req, res) {
        let team;

        findTeam(req)
            .then(ensureExist)
            .then(instance => team = instance)
            .then(findUser)
            .then(ensureExist)
            .then(ensureNotAlreadyMember)
            .then(addMember)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findById(req.params.userId)
        }

        function ensureNotAlreadyMember(user) {
            return team.users.some(member => member === user._id.toString()) ? Promise.reject({code: 403, reason: 'user.already.member'}) : user;
        }

        function addMember(user) {
            team.users.push(user);
            return team.save();
        }
    }

    function kick(req, res) {
        let team;

        findProject(req)
            .then(ensureExist)
            .then(instance => team = instance)
    .then(findUser)
            .then(ensureExist)
            .then(ensureIsMember)
            .then(removeMember)
            .then(() => res.status(204).send())
    .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findById(req.params.userId)
        }

        function ensureIsMember(user) {
            return team.users.some(member => member.toString() === user._id.toString()) ? user : Promise.reject({code: 403, reason: 'user.not.member'});
        }

        function removeMember(user) {
            team.users.remove(user);
            return team.save();
        }
    }

    // Globals
    function findTeam(req) {
        return Team.findById(req.params.id)
    }

    function ensureExist(data) {
        return data ? data : Promise.reject({code: 422, reason: 'unprocessable.entities'});
    }
};




