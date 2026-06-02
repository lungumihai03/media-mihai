async function loadAwards(lang) {

    const response = await fetch('https://media.mihailungu.com/resources/xml/awards.xml');
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const awards = xml.getElementsByTagName("award");

    let html = "";

    for (let i = 0; i < awards.length; i++) {

        const award = awards[i];

        const year =
            award.getElementsByTagName("year")[0].textContent;

        const link =
            award.getElementsByTagName("link")[0].textContent.trim();

        const title =
            award.getElementsByTagName("title_" + lang)[0].textContent;

        const description =
            award.getElementsByTagName("description_" + lang)[0].textContent;

        let titleHtml;

        if (link) {
            titleHtml = `
                <a href="${link}" target="_blank" class="premii">
                    <u>${title}</u>
                </a>
            `;
        } else {
            titleHtml = `${title}`;
        }

        html += `
            <p>
                ${year} -
                ${titleHtml}
                ${description}
            </p>
        `;
    }

    document.getElementById("awards-container").innerHTML = html;
}
