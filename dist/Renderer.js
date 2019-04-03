class Renderer {
    _postTeam(roster, container) {
        const source = $("#team-template").html()
        const template = Handlebars.compile(source)
        const hbText = template({roster})
        $(container).append(hbText)
    }

    renderTeam(roster) {
        $("#team-container").empty()
        $("#message").text("Click on a player to add them to your dream team")
        this._postTeam(roster, "#team-container")
    }

    renderDreamTeam(roster) {
        $("#dreamteam-container").empty()
        this._postTeam(roster, "#dreamteam-container")
    }
}