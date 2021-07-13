const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Quiz = db.Quiz;
const Item = db.Item;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getMatchup,
    recordVote,
    getResults
};

async function authenticate({ username, password }) {
    const user = await Quiz.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll(userId) {
    return await Quiz.find({userId:userId});
}

async function getById(id) {
    return await Quiz.findById(id);
}

async function create(quizParam, userId) {
    // put items into list
    itemlist = []
    for (let i = 0; i < quizParam.items.length; i++) {
        var item = {
            "name" : quizParam.items[i]["name"],
            numSuccess : 0,
            icon: quizParam.items[i]["icon"]
        }
        itemlist.push(item) 
    }
    console.log(itemlist)
    // create quiz object
    var quiz = {
        name: quizParam["name"],
        hash: "711112333",
        items : itemlist,
        userId : userId
    }

    var quizObject = new Quiz(quiz);
    await quizObject.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await Quiz.findByIdAndRemove(id);
}

async function getMatchup(quizId){
    var quiz  =  await Quiz.findById(quizId)
    var matchup = []
    for(var i=0;i<2;i++){
        var rndIdx = Math.floor(Math.random() * quiz.items.length);
        matchup.push(quiz.items[rndIdx])
    }
    return matchup
}

async function recordVote(quizId, itemId){
    var found = false
    var quiz  = await Quiz.findById(quizId)

    quiz.items.forEach((item) =>{
        if(item.id === itemId){
            found = true
            item.numSuccess += 1
        }
    })
    
    if( found){
        await quiz.save()
    }else{
        throw "Item not found!"
    }

    
}

async function getResults(quizId){
    var quiz  = await Quiz.findById(quizId)
    return quiz.items.sort(function(a,b){
        if(a.numSuccess < b.numSuccess)return 1
        if(a.numSuccess > b.numSuccess)return -1
        return 0
    });
}
