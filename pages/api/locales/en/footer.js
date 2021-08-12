/* eslint-disable import/no-anonymous-default-export */
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      city: '© City of Turku',
      post: 'PO 355, 20101 Turku',
      phone: 'Phone (02) 330 000',
      accessibility: 'Accessibility Statement',
      report: 'Report a Problem',
    })
  )
}
