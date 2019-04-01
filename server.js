const express = require("express")
const requestMod = require("request")
const path = require("path")
const app = express()

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

// const filterPlayers = function(player, teamID) {
//     if(player.teamID)
// }



app.get("/teams/:teamName", function(request, response) {
    let teamID = teamToIDs[request.params.teamName]
    requestMod("http://data.nba.net/10s/prod/v1/2018/players.json", function(error, data, body) {
        let dataObject = JSON.parse(data.body || "{}")
        let teamPlayers = dataObject.league.standard.filter(s => s.teamId == teamID && s.isActive)
        let roster = teamPlayers.map(t => { return {
                firstName: t.firstName,
                lastName: t.lastName,
                jersey: t.jersey,
                pos: t.pos
            }
        })
        response.send(roster)
    })
    
})


const port = 3000
app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})