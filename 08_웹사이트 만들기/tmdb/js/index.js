const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=2&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'
         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break

            const movie = results[index]

            rowHtml += `
            <div class="col-sm-3 p-3">
                <div class="card">
                    <a href="./detail.html?movie_id=${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                    </a>
                    <div class="card-body">
                        <p class="card-text title">${movie.title}</p>
                        <p class="card-text average">${Number(movie.vote_average) === 0 ? '미반영' : movie.vote_average.toFixed(1) + '점'}</p>
                    </div>
                </div>
            </div>`
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러발생:', error)
   }
}

getPlayingMovies(url)
