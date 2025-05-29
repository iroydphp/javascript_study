const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzI0YjU5MmE5ZjVmY2E1YTg2NGZlNGJhZjI4YmQ5YyIsIm5iZiI6MTc0ODM5MzgwMC4zMzc5OTk4LCJzdWIiOiI2ODM2NWY0OGQ5ZmViOGQyOWNhODc1ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.khs15z929KxlNjZPfG-1-EBsj4P3hqWsT2051vzNJEs',
   },
}

const urlParams = new URLSearchParams(location.search)
const dramaId = urlParams.get('tvResult')
const dramaDetailUrl = `https://api.themoviedb.org/3/tv/${dramaId}?language=ko-KR`

const mainContainer = document.querySelector('main .container')

const getDetailDrama = async (dramaDetailUrl) => {
   try {
      const response = await fetch(dramaDetailUrl, options)
      const data = await response.json()
      console.log(data)

      const imgSrc = `https://image.tmdb.org/t/p/w400/${data.poster_path}`
      const rowHtml = `
    <div class="row">
        <div class="col-sm-3">
            <img src="${imgSrc}" alt="${data.name}"/>
        </div>
        <div class="col-sm-9">
            <h2>${data.name}</h2>
            <p><strong>원제:</strong> ${data.original_name}, ${data.original_language}</p>
            <p><strong>평점:</strong> ${data.vote_average}</p>
            <p><strong>처음 방영일:</strong> ${data.first_air_date}</p>
            <p><strong>최근 방영일:</strong> ${data.last_air_date}</p>

            <p><strong>개요:</strong> ${data.overview}</p>
        </div>
    </div>`

      mainContainer.innerHTML += rowHtml

      //getCreditsDrama(dramaCreditsUrl)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailDrama(dramaDetailUrl)
