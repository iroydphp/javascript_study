const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzI0YjU5MmE5ZjVmY2E1YTg2NGZlNGJhZjI4YmQ5YyIsIm5iZiI6MTc0ODM5MzgwMC4zMzc5OTk4LCJzdWIiOiI2ODM2NWY0OGQ5ZmViOGQyOWNhODc1ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.khs15z929KxlNjZPfG-1-EBsj4P3hqWsT2051vzNJEs',
   },
}

const tvUrl = 'https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=15&with_original_language=ko'

const getPlayingDrama = async (tvUrl) => {
   try {
      const tvDrama = await fetch(tvUrl, options)
      const tvData = await tvDrama.json()

      const tvResults = tvData.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      let i = 0
      for (; i < tvResults.length; i += 2) {
         let rowHtml = '<div class="row">'
         for (let j = 0; j < 2; j++) {
            const index = i + j
            if (index >= tvResults.length) break

            const tvResult = tvResults[index]

            rowHtml += `
           <div class="col-sm-6 p-3 texttt">
           <a href="./tvprogram_detail.html?tvResult=${tvResult.id}" target="_blank" class="text-decoration-none text-dark">
               <div class="d-flex flex-row align-items-center card" >    
                        <img src="${tvResult.poster_path ? `https://image.tmdb.org/t/p/w500${tvResult.poster_path}` : './images/person.png'}" alt="${tvResult.name ? tvResult.name : '?'}" class="poster-img" />
                   
                   <div class="card-body">
                       <h4 style="font-weight: bold">${tvResult.name}</h4>
                       <p class="card-story">
                       ${tvResult.overview && tvResult.overview !== 0 ? tvResult.overview : '줄거리 없음'}
                       </p>
                       <hr/>
                       <p><b>첫방영</b> · ${tvResult.first_air_date}</p>
                       <p><b>평　점</b> · ${tvResult.vote_average && tvResult.vote_average !== 0 ? tvResult.vote_average.toFixed(1) + '점' : '준비중'}</p>
                   </div>
               </div>
               </a>
           </div>`
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
         console.log('tvResults[i] : ', tvResults[i])
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러 코드 발생 : ', error)
   }
}

getPlayingDrama(tvUrl)
