// Fungsi untuk menampilkan film
function displayMovies(movies) {
    let cards = '';
    movies.forEach(a => {
        cards += `<div class="col-md-3 m-3">
            <div class="card" style="width: 18rem;">
                <img src="${a.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${a.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${a.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${a.imdbID}">Show Detail</a>
                </div>
            </div>
        </div>`;
    });
    $('.movie-container').html(cards);
}

// Fungsi untuk mengambil detail film dan menampilkannya di modal
function getMovieDetails(imdbID) {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=a00e3687&i=' + imdbID,
        success: a => {
            const movieDetail = `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${a.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md-9">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Title:</strong> ${a.Title}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${a.Director}</li>
                            <li class="list-group-item"><strong>Year:</strong> ${a.Year}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${a.Rated}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${a.Released}</li>
                            <li class="list-group-item"><strong>Genre:</strong> ${a.Genre}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${a.Actors}</li>
                            <li class="list-group-item"><strong>Plot:</strong> ${a.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
            $('.modal-body').html(movieDetail);
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
}

// Event untuk menampilkan detail film saat tombol Show Detail diklik
$(document).on('click', '.modal-detail-button', function() {
    const imdbID = $(this).data('imdbid');
    getMovieDetails(imdbID);
});

// Menampilkan film default saat halaman pertama kali diakses
$.ajax({
    url: 'http://www.omdbapi.com/?apikey=a00e3687&s=one piece',
    success: result => {
        displayMovies(result.Search);
    },
    error: (e) => {
        console.log(e.responseText);
    }
});

// Menampilkan hasil pencarian saat pengguna mengetik di input pencarian
$('.input-keyword').on('input', function() {
    const keyword = $(this).val();
    if (keyword) {
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=a00e3687&s=' + keyword,
            success: result => {
                if (result.Response === "True") {
                    displayMovies(result.Search);
                } else {
                    $('.movie-container').html('<p class="text-center">Movie not found!</p>');
                }
            },
            error: (e) => {
                console.log(e.responseText);
            }
        });
    } else {
        // Jika input kosong, tampilkan film default lagi
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=a00e3687&s=one piece',
            success: result => {
                displayMovies(result.Search);
            },
            error: (e) => {
                console.log(e.responseText);
            }
        });
    }
});