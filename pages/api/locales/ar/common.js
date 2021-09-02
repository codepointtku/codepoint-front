import {TranslateCommon} from '../../translator/translator'


export default async function Common(req, res){
  const {members, projects, aboutus, about} = await TranslateCommon('ar')
  return (
    res.statusCode = 200,
    res.setHeader('Content-Type', 'application/json'),
    res.end(
      JSON.stringify({
        en: 'Englanti',
        fi: 'Suomi',
        members: members,
        projects: projects,
        aboutus: aboutus,
        about:about})
    )
  )
}

