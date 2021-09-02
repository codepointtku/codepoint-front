import {TranslateFooter} from '../../translator/translator'

export default async function Footer(req, res){
  return (
    res.statusCode = 200,
    res.setHeader('Content-Type', 'application/json'),
    res.end(
      JSON.stringify(
        await TranslateFooter('ko')
      )
    )
  )
}

