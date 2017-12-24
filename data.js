const age = require("./src/age")
const location = "Delft, The Netherlands"

module.exports = {
  name: `Carlos Precioso`,
  location,
  age,
  description: `Hi! I'm a <span class="age">${age}</span>-year old student in ${location}. I'm currently pursuing a degree in Industrial Design & Product Development Engineering. My passions are User Experience design, and how programming and Computer Sciences can fit into it.`,
  shortDescription: `${age}-year old student in ${location} doing a degree in Industrial Design & Product Development Engineering. User Experience and Design.`,
  keywords: `carlos,precioso,industrial,design,user,experience,delft,netherlands,valencia,spain,student,young,job,degree`,
  buttons: [
    {
      name: "GitHub",
      id: "github",
      url: "https://github.com/cprecioso",
      image: "img/github.svg",
      backColor: "white",
      frontColor: "#231e1b",
    },
    {
      name: "GitLab",
      id: "gitlab",
      url: "https://gitlab.com/cprecioso",
      image: "img/gitlab.svg",
      backColor: "white",
      frontColor: "#e24329",
    },
    {
      name: "LinkedIn",
      id: "linkedin",
      url: "https://www.linkedin.com/in/carlosprecioso",
      image: "img/linkedin.svg",
      backColor: "#0077b5",
      frontColor: "white",
    },
    {
      name: "RedBubble",
      id: "redbubble",
      url: "http://www.redbubble.com/people/kalprestito/shop/popular",
      image: "img/redbubble.svg",
      backColor: "red",
      frontColor: "white",
    },
    {
      name: "Telegram",
      id: "telegram",
      url: "https://telegram.me/cprecioso",
      image: "img/telegram.svg",
      backColor: "#38b0e3",
      frontColor: "white",
    },
    {
      name: "Email",
      id: "email",
      url: "mailto:carlos@carlosprecioso.com",
      image: "img/email.png",
      backColor: "#fdac2a",
      frontColor: "white",
    },
  ]
}
