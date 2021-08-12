/* eslint-disable import/no-anonymous-default-export */
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      en: 'Englanti',
      fi: 'Suomi',
      members: 'Jäsenet',
      projects: 'Projektit',
      aboutus: 'Meistä',
      about:
        'SUOMI Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus blanditiis odit necessitatibus, rerum voluptates modi recusandae maiores doloribus. Itaque, ex! Aspernatur, recusandae voluptate. Quas similique, vero neque deserunt officiis in!',
    })
  )
}
