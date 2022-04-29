const items = require('../assets/data')

exports.handler = async function handler(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(items),
    }
}