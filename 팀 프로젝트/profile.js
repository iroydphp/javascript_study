const me = {
   name: '박형준',
   age: '31',
   year: '1995',
   hobby: ['코딩', '코인 노래방', '영상 편집'],
   favoriteGames: ['World of Warcraft'],
   codding: ['HTML', 'CSS'],
   pet: ['식량이', '단풍이'],
   petcate: ['닥스훈트'],
   introduce: function () {
      return `
               안녕하세요. 제 이름은 ${me.name}이고 <Br/> 나이는 ${me.year}년생(${me.age}세) 입니다. 
               <br/> ${me.codding}와 관련된 ${me.hobby[0]} 이야기는 언제든지 환영합니다.
               <br/>
               ${me.petcate} ${me.pet} 를 키우고 있습니다.
               `
   },
   want: function () {
      return `서로 배워가는 입장에서 ${me.codding}외에도 같이 공부해요 :-)`
   },
}

document.write('<hr/>')
document.write(me.introduce())
document.write('<hr/>')
document.write(`${me.favoriteGames}라는 20년 넘은 게임합니다.`)
document.write('<hr/>')
document.write('<br/>')
document.write(me.want())
