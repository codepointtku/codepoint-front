import {TranslateFooter} from '../../translator/translator'


export default async function Footer(req, res){
  const {city, post, phone, accessibility, report} = await TranslateFooter('ko')
  return (
    res.statusCode = 200,
    res.setHeader('Content-Type', 'application/json'),
    res.end(
      JSON.stringify({
      city: city,
      post: post,
      phone: phone,
      accessibility: accessibility,
      report: report})
    )
  )
}

