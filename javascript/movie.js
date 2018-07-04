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
    axios.get('http://www.omdbapi.com?s='+searchtext+'&apikey=2baf180')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        console.log(movies);
        let output = '';
        $.each(movies, (index, movie) => {
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

