$(".articleContent a").click(function() {
    //$( this ).slideUp();
    $("#popUp").removeClass("hidden");
    $('#popUp.loader .container').css('display', 'block');
});
$(".closePopUp").click(function() {
    //$( this ).slideUp();
    $("#popUp").addClass("hidden");
    $('#popUp.loader .container').css('display', 'none');
});

$(document).ready(function() {
    $('#timePeriod').css('display', 'none');
    $('#maxLength').css('display', 'none');
    $('#movieChoice').css('display', 'none');
    $('#averageRating h1').css('display', 'none');
});

let $movieGenres = $.getJSON('https://api.themoviedb.org/3/genre/movie/list?api_key=6abd7b14a235142a19b71c67ec165bb6');

$movieGenres.done(function(data) {
    if ($movieGenres.status !== 200) {
        return;
    }
    console.log(data);

    let movieGenre = data.genres;
    for (i = 0; i < movieGenre.length; i++) {
        var genreList = document.createElement("li");
        var genreLinks = document.createElement("a");
        genreLinks.textContent = data.genres[i].name;
        $(genreList).attr('id', data.genres[i].id);
        $('#main ul').append(genreList);
        $(genreList).append(genreLinks);
    }
});

setTimeout(function() {
    $("#main li").click(function() {
        let currentGenre = $(this).attr('id');
        localStorage.setItem('genre', currentGenre);
        $('#timePeriod').css('display', 'block');
        $('#main').css('display', 'none');
    });
}, 1000);

setTimeout(function() {

    $("#sixty").click(function() {
        var year = Math.floor((Math.random() * 9) + 1960);
        console.log(year);
        localStorage.setItem('year', year);
    });

    $("#seventy").click(function() {
        var year = Math.floor((Math.random() * 9) + 1970);
        console.log(year);
        localStorage.setItem('year', year);
    });

    $("#eighty").click(function() {
        var year = Math.floor((Math.random() * 9) + 1980);
        console.log(year);
        localStorage.setItem('year', year);
    });

    $("#ninety").click(function() {
        var year = Math.floor((Math.random() * 9) + 1990);
        console.log(year);
        localStorage.setItem('year', year);
    });

    $("#twenties").click(function() {
        var year = Math.floor((Math.random() * 9) + 2000);
        console.log(year);
        localStorage.setItem('year', year);
    });

    $("#twentyTens").click(function() {
        var year = Math.floor((Math.random() * 9) + 2010);
        console.log(year);
        localStorage.setItem('year', year);

    });
    $("#twentyTwenties").click(function() {
        var year = Math.floor((Math.random() * 1) + 2020);
        console.log(year);
        localStorage.setItem('year', year);

    });
}, 1000);

setTimeout(function() {
    $("#timePeriod ul").click(function() {
        $('#timePeriod').css('display', 'none');
        $('#maxLength').css('display', 'block');
    });
}, 1000);

setTimeout(function() {
    $('#maxLength').css('display', 'none');
    $("#ninetyMinutes").click(function() {
        var time = Math.floor((Math.random() * 19) + 70);
        console.log(time);
        localStorage.setItem('time', time);
    });
    $("#oneTwenty").click(function() {
        var time = Math.floor((Math.random() * 29) + 90);
        console.log(time);
        localStorage.setItem('time', time);
    });
    $("#oneTwentyHalf").click(function() {
        var time = Math.floor((Math.random() * 59) + 90);
        console.log(time);
        localStorage.setItem('time', time);
    });
    $("#threeHours").click(function() {
        var time = Math.floor((Math.random() * 59) + 120);
        console.log(time);
        localStorage.setItem('time', time);
    });
}, 1000);

setTimeout(function() {
    $("#maxLength ul").click(function() {
        $('#maxLength').css('display', 'none');
        $('#averageRating h1').css('display', 'block');
        $('#averageRating').css('display', 'block');
        let movieRating = 0;
        for (i = 0; i < 10; i++) {
            movieRating++;
            var ratingList = document.createElement("li");
            var ratingLinks = document.createElement("a");
            ratingList.textContent = movieRating;
            $('#averageRating ul').append(ratingList);
            $(ratingList).append(ratingLinks);
            $('#averageRating h1').css('display', 'block');
        }
        setTimeout(function() {
            $("#averageRating li").click(function() {
                $('#movieChoice').css('display', 'block');
                $('#averageRating').css('display', 'none');
            });
        }, 1000);

        setTimeout(function() {
            $("#averageRating li").click(function() {
                let currentRating = $(this).text();
                localStorage.setItem('rating', currentRating);
                setTimeout(function() {
                    var finalRating = parseInt(localStorage.rating);
                    var finalGenre = parseInt(localStorage.genre);
                    var finalYear = parseInt(localStorage.year);
                    var finalTime = parseInt(localStorage.time);
                    var randomPage = Math.floor((Math.random() * 1) + 1);
                    let $finalMoviePick = $.getJSON('https://api.themoviedb.org/3/discover/movie?api_key=6abd7b14a235142a19b71c67ec165bb6&language=en-US&vote_count.gte=10&vote_average.gte=' + finalRating + '&with_genres=' + finalGenre + '&primary_release_year=' + finalYear + '&with_runtime.lte=' + finalTime + '&with_original_language=en&page=' + randomPage);
                    console.log($finalMoviePick);

                    $finalMoviePick.done(function(data) {
                        if ($finalMoviePick.status !== 200) {
                            return;
                        }
                        console.log(data);
                        var noResults = data.total_results;
                        if (noResults === 0) {
                            $('#popUp').removeClass('hidden');
                            $('#movieChoice').css('display', 'none');
                            $('#averageRating').css('display', 'block');
                            console.log(noResults);
                        }
                        let finalMovieTitle = document.getElementsByTagName('h2');
                        let finalMovieDescription = $('p');
                        let finalMoviePoster = document.getElementsByTagName('img');
                        var movieArray = data.results[Math.floor(Math.random() * data.results.length)];
                        console.log(movieArray);
                        $(finalMovieTitle).text('You\'ll be watching ' + movieArray.original_title + '!');
                        $(finalMovieDescription).text(movieArray.overview);
                        $(finalMoviePoster).attr('src', 'https://www.themoviedb.org/t/p/w500/' + movieArray.poster_path);
                        $(finalMovieTitle).after(finalMovieDescription);
                        $('#averageRating').css('display', 'none');
                        localStorage.clear();
                        console.log(data);
                        let finalMovieId = movieArray.id;
                        let $finalMovieActors = $.getJSON('https://api.themoviedb.org/3/movie/' + finalMovieId + '/credits?api_key=6abd7b14a235142a19b71c67ec165bb6');
                        console.log($finalMovieActors);

                        $finalMovieActors.done(function(dataTwo) {
                            if ($finalMovieActors.status !== 200) {
                                return;
                            }
                            console.log(dataTwo);
                            let movieActor = dataTwo.cast;
                            for (i = 0; i < 5; i++) {
                                var actorList = document.createElement("li");
                                var actorTitle = document.createElement("p");
                                var actorImage = document.createElement("img");
                                $(actorImage).attr('src', 'https://www.themoviedb.org/t/p/w500' + movieActor[i].profile_path)
                                actorTitle.textContent = movieActor[i].name;
                                $(actorList).append(actorTitle);
                                $(actorList).attr('id', movieActor[i].id);
                                $('#movieChoice ul').append(actorList);
                                $(actorList).append(actorImage);
                            }
                        });

                        let $finalMovieTrailer = $.getJSON('https://api.themoviedb.org/3/movie/' + finalMovieId + '/videos?api_key=6abd7b14a235142a19b71c67ec165bb6&=Trailer');
                        console.log($finalMovieTrailer);

                        $finalMovieTrailer.done(function(dataThree) {
                            if ($finalMovieTrailer.status !== 200) {
                                return;
                            }
                            console.log(dataThree);
                            let movieTrailer = dataThree.results;
                            let movieFrame = document.getElementsByTagName('iframe');
                            $(movieFrame).attr('src', 'https://www.youtube.com/embed/' + movieTrailer[0].key);
                            $(movieFrame).after(finalMovieDescription);
                            //$(finalMoviePoster).after(movieFrame);  
                        });

                    });

                }, 1000);
            });
        }, 1000);
    });
}, 1000);


/*
const genreCollection = firebase.database().ref();
$("li").click(function() {
    genreCollection.push({
        genre: $('li').closest.text(),
      });
  
});
*/