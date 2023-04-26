AFRAME.registerComponent("markerhandler", {
    init: async function(){
        var games = await this.getGames();

        this.el.addEventListener("markerFound", () => {
            var markerId = this.el.id;
            this.handleMarkerFound(games, markerId);
        });

        this.el.addEventListener("markerLost", () => {
            this.handleMarkerLost();
        });
    },

    handleMarkerFound: function(games, markerId){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var ratingButton = document.getElementById("rating-button");
        var playButton = document.getElementById("play-button");

        ratingButton.addEventListener("click", function(){
            swal({
                icon: "warning",
                title: "Rate Game",
                text: "Work In Progress"
            });
        });

        playButton.addEventListener("click", () => {
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "Thanks for choosing to play!",
                text: "You will play shortly!"
            });
        });

        var game = games.filter(game => game.id === markerId)[0];

        var model = document.querySelector(`#model-${game.id}`);
        model.setAttribute("position", game.model_geometry.position);
        model.setAttribute("rotation", game.model_geometry.rotation);
        model.setAttribute("scale", game.model_geometry.scale);
    },

    handleMarkerLost: function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
    },

    getGames: async function(){
        return await firebase
        .firebase()
        .collection("games")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        });
    }
})