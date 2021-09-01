const footerStrEn = {
    city: '© City of Turku',
    post: 'PO 355, 20101 Turku',
    phone: 'Phone (02) 330 000',
    accessibility: 'Accessibility Statement',
    report: 'Report a Problem',
}


const commonStrEn = {
    members: 'Members',
    projects: 'Projects',
    aboutus: 'About us',
    about:
        'ENGLISH Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus blanditiis odit necessitatibus, rerum voluptates modi recusandae maiores doloribus. Itaque, ex! Aspernatur, recusandae voluptate. Quas similique, vero neque deserunt officiis in!',
    }

export async function TranslateCommon(ln){
    const translations = {}
    for (let item in commonStrEn){
        translations[item] = await TranslateString(ln, commonStrEn[item])
    }
    return translations
}

export async function TranslateFooter(ln){
    const translations = {}
    for (let item in footerStrEn){
        translations[item] = await TranslateString(ln, footerStrEn[item])
    }
    return translations
}

async function TranslateString(ln, string){
    const res = await fetch("http://192.168.1.102:5000/translate", {
	method: "POST",
	body: JSON.stringify({
		q: string,
		source: "en",
		target: ln
	}),
	headers: { "Content-Type": "application/json" }
    });
    // console.log(await res.json());
    let translation = await res.json()
    return JSON.stringify(translation.translatedText).replaceAll('"', '')
}
