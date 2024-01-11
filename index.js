
/**
 * Generates pill element
 * @param {string} count 
 * @param {string} country 
 * @returns pill block
 */
const pillGenerator = (count, country) => {
    return `
    <div class="pill">
        <div class="count">${count}</div>
        <div class="country">${country}</div>
    </div>`
}

/**
 * Generates data template
 * @param {string} index 
 * @param {string} mainCount 
 * @param {string} type 
 * @param {country[]} countries 
 * @returns data-wrapper block with theme id
 */
const themeWrapper = (index, mainCount, type, countries) => {
    let loadHTML = ''
    let innerHtml = ''
    let pillCounter = 0;
    let row = "";
    for (let { count, country } of countries) {
        if (pillCounter == 0 || pillCounter == 2) {
            row = `<div class="row">${pillGenerator(count, country)}`
        }
        else {
            row += `${pillGenerator(count, country)}</div>`
            innerHtml += row
        }
        pillCounter++
    }
    loadHTML = innerHtml

    return `
        <div class="data-wrapper theme${index}">
            <div class="mainCount">${mainCount} <span class="type">${type}</span></div>
            <section>
                <div class="small">By country</div>
                ${loadHTML}
            </section>
        </div>`
}


const init = function () {
    const container = document.getElementById("container")
    //fetch data from the json file
    fetch('./data.json')
        .then(result => result.json())
        .then(({ data }) => {
            let loadhtml = ''
            //go thru the each data
            data.forEach(({ count, type, countries }, index) => {
                //mold data in a template
                loadhtml += themeWrapper(index + 1, count, type, countries)
            });
            container.innerHTML = loadhtml
        })
        .catch(err => console.error(err))
}

init();