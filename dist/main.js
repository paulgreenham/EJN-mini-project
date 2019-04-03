let renderer = new Renderer

const getRoster = function (team) {
    $.get(`./teams/${team}`, function (response) {
        let players = response
        renderer.render(players)
    })
}

$("button").on("click", function () {
    getRoster($("input").val())
})