let renderer = new Renderer

const getRoster = function (team) {
    $.get(`./teams/${team}`, function (response) {
        renderer.renderTeam(response)
    })
}

const getDreamTeam = function () {
    $.get("./dreamTeam", function (response) {
        renderer.renderDreamTeam(response)
    })
}

const updateDreamTeam = function (player) {
    $.post("./roster", player, function () {
        getDreamTeam()
    })
}

$("#roster").on("click", function () {
    getRoster($("input").val())
})

$("#dream-team").on("click", function () {
    getDreamTeam()
})

$("#team-container").on("click", ".player", function () {
    let player = {
        firstName: $(this).find(".name").data("name").firstName,
        lastName: $(this).find(".name").data("name").lastName,
        jersey: $(this).find(".number").data("jersey"),
        pos: $(this).find(".position").data("pos")
    }
    console.log($(this).find(".name").find("first-child"))
    console.log(player)
    updateDreamTeam(player)
})