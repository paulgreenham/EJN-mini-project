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
    let team = []
    for(let i = 0; i < Math.min(5, dreamTeam.length); i++) {
        team.push(dreamTeam[i])
    }
    res.send(team)
})


router.post("/roster", function (req, res) {
    let player = req.body
    dreamTeam.unshift(player)
    res.send(console.log(dreamTeam))
})


router.put("/team", function (req, res) {
    let newTeam = req.body
    teamToIDs[newTeam.teamName] = newTeam.teamId
    console.log(teamToIDs)
    res.send(console.log(`Added ${newTeam.teamName} to teams`))
})


module.exports = router

