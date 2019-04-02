class Renderer {
    _postTeam(roster) {
        $("#team-container").empty()
        const source = $("#team-template").html()
        const template = Handlebars.compile(source)
        const hbText = template({roster})
        $("#team-container").append(hbText)
    }

    // _postPlayerImage(image) {
    //     $("#team-container").empty()
    //     const source = $("#team-template").html()
    //     const template = Handlebars.compile(source)
    //     const hbText = template({roster})
    //     $("#team-container").append(hbText)
    // }

    render(roster) {
        this._postTeam(roster)
    }
}