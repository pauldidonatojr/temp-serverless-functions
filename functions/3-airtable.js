require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base('app1LVKkET0KmS2gL')
    .table('restaurants')

exports.handler = async function handler(event, context) {
    try {
        const {records} = await airtable.list()
        const products = records.map((product) => {
            const { id } = product;
            const { name, category, image, location } = product.fields
            const url = image[0].url
            return {id,name,url,category, location}
        })
         return {
       headers: {
            'Access-Control-Allow-Origin':'*',
        },
        statusCode: 200,
        body: JSON.stringify(products),
    }
    } catch (error) {
         return {
          headers: {
            'Access-Control-Allow-Origin':'*',
        },
        statusCode: 200,
        body: 'Server Error',
    }
    }

}