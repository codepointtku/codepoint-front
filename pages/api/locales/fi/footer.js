/* eslint-disable import/no-anonymous-default-export */
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      city: '© Turun kaupunki',
      post: 'PL 355, 20101 Turku',
      phone: 'Puhelin (02) 330 000',
      accessibility: 'Saavutettavuusseloste',
      report: 'Ilmoita ongelmasta',
    })
  )
}
