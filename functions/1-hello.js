// domain/.netlify/functions/1-hello
exports.handler = async function handler(event, context) {
    console.log(event)
    return {
        statusCode: 200,
        body: 'Netlify Functions 1',
    }
}