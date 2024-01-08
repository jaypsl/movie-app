$(document).ready(()=>{
    //create an event when th form is submitted
    $('#searchform').on('submit', (e)=>{
        let searchtext = $('#searchtext').val();
        getMovies(searchtext);
        // console.log($(searchtext).val());
        e.preventDefault();
    })
});

function getMovies(searchtext){
    // console.log(searchtext);
    axios.get('https://www.omdbapi.com?s='+searchtext+'&apikey=2baf180')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        // console.log(movies);
        let output = '';
        $.each(movies, (index, movie) => {
            // console.log(movie);
            output += `
            <div class="col-md-3">
            <div class="well text-center">
            <img src = "${movie.Poster}">
            <h5>${movie.Title}</h5>
            <h6>${movie.Year}</h6>
            <a onclick="movieselected('${movie.imdbID}')" class="btn btn-primary" href="#">More details</a>
            </div>
            </div>
             `
        })
        $('#movies').html(output);
    })
    .catch((error)=> {
        console.log(error);
    })
}

// var callback = function(user){console.log(user)};
// callback(user);

function movieselected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'singlemovie.html';
    return false;
}

function getMovie(){
    let movieid =  sessionStorage.getItem('movieId');
    axios.get('https://www.omdbapi.com?i='+movieid+'&apikey=2baf180')
    .then((response) => {
        console.log(response);
        // $('#movies').html(output);
        let movie = response.data;
        let output = `
        <div class="row">
        <div class="col-md-4">
        <img src="${movie.Poster}">
        </div>
        <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
        <li class="list-group-item">Genre: ${movie.Genre}</li>
        <li class="list-group-item">Released: ${movie.Released}</li>
        <li class="list-group-item">Rated: ${movie.Rated}</li>
        <li class="list-group-item">IMDB rating: ${movie.imdbRating}</li>
        <li class="list-group-item">Director: ${movie.Director}</li>
        <li class="list-group-item">Writer: ${movie.Writer}</li>
        <li class="list-group-item">Actors: ${movie.Actors}</li>
        </ul>
        </div>
        </div>
        <br/>
        <div class="row">
        <div class="well">
        <h3>Plot</h3>
        <hr>
        <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" class="btn btn-default">Go back to search</a>
        </div>
        </div>
        `;
        $('#movie').html(output);

        })
    .catch((error)=> {
        console.log(error);
    })

}
