const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzI0YjU5MmE5ZjVmY2E1YTg2NGZlNGJhZjI4YmQ5YyIsIm5iZiI6MTc0ODM5MzgwMC4zMzc5OTk4LCJzdWIiOiI2ODM2NWY0OGQ5ZmViOGQyOWNhODc1ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.khs15z929KxlNjZPfG-1-EBsj4P3hqWsT2051vzNJEs',
   },
}

const urlParams = new URLSearchParams(location.search)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

// 1. 영화 상세정보 바인딩
const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w400${data.poster_path} ?`
      const rowHtml = `<div class="row">
                  <div class="col-sm-3" style="text-align: center">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width: 100%"/>
                  </div>
                  <div class="col-sm-9 movie-detail" style="padding: 20px">
                     <h2 style="font-weight: bold">${data.title}</h2>
                     <h4 style="color:#aaa">${data.original_title}</h4>
                     <ul class="movie-info">
                        <li>${data.release_date}</li>
                        <li>${data.genres.map((genres) => genres.name)}</li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1) + '점'}</p>
                     <p>${data.overview}</p>
                  </div>
               </div>`
      mainContainer.innerHTML += rowHtml

      getCreditsMovie(movieCreditsUrl)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)

// 2. 출연 배우 상세정보 바인딩

const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      const container = document.querySelector('main .container')
      let rowHtml = '<div class="row" style="margin-top:30px">'

      // 최대 6명만 출력
      for (let i = 0; i < Math.min(6, data.cast.length); i++) {
         const credit = data.cast[i]
         const profilePath = credit.profile_path ? `https://image.tmdb.org/t/p/w185${credit.profile_path}` : './images/person.png'
         const actorName = credit.name

         rowHtml += `
          <div class='col-sm-2 p-3'>
            <div class="card">
               <img src="${profilePath}" class="card-img-top" alt="${actorName}">
               <div class="card-body">
                 <p class="card-text"><b>${actorName}</b></p>
                 <p class="card-text">${credit.character ? credit.character : '&nbsp;'}</p>
               </div>
            </div>
          </div>`
      }

      rowHtml += '</div>'
      container.innerHTML += rowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}
