const express = require("express")
const request = require("request")
const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const dreamTeam = []


router.get("/teams/:teamName", function(req, res) {
    let teamID = teamToIDs[req.params.teamName.toLowerCase()]
    request("http://data.nba.net/10s/prod/v1/2018/players.json", function(error, data, body) {
        let dataObject = JSON.parse(data.body || "{}")
        let teamPlayers = dataObject.league.standard.filter(s => s.teamId == teamID && s.isActive)
        let roster = teamPlayers.map(t => { return {
                firstName: t.firstName,
                lastName: t.lastName,
                jersey: t.jersey,
                pos: t.pos
            }
        })
        res.send(roster)
    })
})

router.get("/dreamTeam", function (req, res) {
    res.send(dreamTeam)
})


router.post("/roster", function (req, res) {
    let player = req.body
    if(dreamTeam.find(d => d.firstName == player.firstName && d.lastName == player.lastName)) {
        res.end()
    }
    else {
        dreamTeam.unshift(player)
        if(dreamTeam.length > 5){
            dreamTeam.splice(5)
        }
        res.end()
    }
})


router.put("/team", function (req, res) {
    let newTeam = req.body
    teamToIDs[newTeam.teamName] = newTeam.teamId
    console.log(teamToIDs)
    res.send(console.log(`Added ${newTeam.teamName} to teams`))
})


module.exports = router

