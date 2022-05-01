require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base('app1LVKkET0KmS2gL')
    .table('restaurants')

exports.handler = async (event, context, cb) => {
const { id } = event.queryStringParameters
    if (id) {
        try {
            const product = await airtable.retrieve(id)
            console.log(product)
            if (product.error) {
            return {
            statusCode: 404,
            body: `No product with id: ${id}`
        }
            }
             return {
            statusCode: 200,
            body: JSON.stringify(product),
        }
      } catch (error) {
             return {
            statusCode: 500,
            body: `Server Error`
        }
        }


}
    try {
        const {records} = await airtable.list()
        const products = records.map((product) => {
            const { id } = product;
            const { name, category, image, location } = product.fields
            const url = image[0].url
            return {id,name,url,category, location}
        })
         return {

        statusCode: 200,
        body: JSON.stringify(products),
    }
    } catch (error) {
         return {

        statusCode: 404,
        body: 'Server Error',
    }
    }

}