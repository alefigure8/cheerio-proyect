const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

//INIT
const app = express();

//API RESPONSE
const newspapers = [{
        name: 'whashingtonpost',
        address: 'https://www.washingtonpost.com/climate-solutions/?itid=nb_climate-solutions',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'theguardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: ''
    },
    {
        name: 'thetelegraph',
        address: 'https://www.telegraph.co.uk/climate-change/',
        base: 'https://www.telegraph.co.uk'
    }
]
const articles = []

//ROUTE
app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API')
})

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then((response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("climate")', html).each((i, el) => {
                const title = $(el).text()
                const url = $(el).attr('href')
                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        }))
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
})