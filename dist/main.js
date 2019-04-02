let renderer = new Renderer

const getRoster = function (team) {
    $.get(`./teams/${team}`, function (response) {
        let players = response
        renderer.render(players)
        // for(player of players) {
        //     $.get(`https://nba-players.herokuapp.com/players:${player.lastName}/:${player.firstName}`, function (image) {

        //     })
        // }
    })
}

$("button").on("click", function () {
    getRoster($("input").val())
})