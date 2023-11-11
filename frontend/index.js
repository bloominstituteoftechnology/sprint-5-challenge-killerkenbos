async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  let learnersWebsite = await axios.get('http://localhost:3003/api/learners');
  let mentorsWebsite = await axios.get('http://localhost:3003/api/mentors');

  let learners = learnersWebsite.data;
  let mentors = mentorsWebsite.data;
  let newLearners = learners.map(learner => {
    return { ...learner, mentors: mentors.filter(mentor => learner.mentors.includes(mentor.id)) }
  })
  document.querySelector('.info').textContent = 'No learner is selected';
  console.log(newLearners)
  const cardSelector = document.querySelector('.cards')
  for (let learner of newLearners) {
    const learnerCard = createLearnerCard(learner)
    cardSelector.appendChild(learnerCard)
  }
  function createLearnerCard(learner) {
    const div = document.createElement('div')
    div.classList.add('card')
    const h3 = document.createElement('h3');
    h3.textContent = learner.fullName
    div.appendChild(h3)
    const div2 = document.createElement('div')
    div2.classList.add('closed')
    div2.textContent = learner.email
    div2.addEventListener('click', () =>{
      div2.classList.toggle('closed')
      div2.classList.toggle('open')
    })
    div.appendChild(div2)
    const h4 = document.createElement('h4');
    h4.classList.add('closed')
    h4.textContent = 'Mentors'
    h4.addEventListener('click', (e) => {
      if (div.classList.contains('selected')) {
        e.stopPropagation()
      }
      h4.classList.toggle('closed');
      h4.classList.toggle('open')
    })
    div.appendChild(h4)
    const mentorList = document.createElement('ul')

    for (let mentor of learner.mentors) {
      const li = document.createElement('li')
      li.textContent = `${mentor.firstName} ${mentor.lastName}`
      mentorList.appendChild(li)
    }
    div.appendChild(mentorList)

    div.addEventListener('click', () => {
      const cards = document.querySelectorAll('.card')
      const isSelected = div.classList.contains('selected')
      const headerInfo = document.querySelector('.info')
      for (let card of cards) {
        card.classList.remove('selected');
        const name = card.querySelector('h3')
        name.textContent = name.textContent.split(',')[0];

      }
      if (!isSelected) {
        div.classList.add('selected')
        headerInfo.textContent = `The selected learner is ${learner.fullName}`;
        h3.textContent = `${learner.fullName}, ID ${learner.id}`

      } else {
        headerInfo.textContent = 'No learner is selected';
        h3.textContent = learner.fullName

      }
    })


   return div
  }
 
}
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
