import {TranslateCommon} from '../../translator/translator'

export default async function Common(req, res){
  return (
    res.statusCode = 200,
    res.setHeader('Content-Type', 'application/json'),
    res.end(
      JSON.stringify(
        await TranslateCommon('ko')
        )
    )
  )
}

