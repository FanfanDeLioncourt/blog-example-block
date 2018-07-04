import Hapi from 'hapi'

const server = new Hapi.server({
  port: process.env.PORT || 8000
})

/**
 * @api {post} /helloworld helloworld service hacked from blogexample
 * @apiName CreateArticle
 * @apiParam (Body) {String} title article title
 * @apiHeader (Session) {String} [authexample-id] logged in user id
 * @apiHeader (Session) {String} [authexample-name] logged in user name
 * @apiError (Error_401) {String} errors unauthenticated error message
 * @apiSuccess (Success_200) {String} title new article title
 * @apiSuccess (Success_200) {String} username name of the user who created the article
 * @apiSuccess (Success_200) {String} userId id of the user who created the article
 */
server.route({
  method: 'POST',
  path: '/helloworld',
  handler(request, h) {
    const { title } = request.payload
    const userId = request.headers['authexample-id']
    const name = request.headers['authexample-name']
    if (!userId || !name) {
      return h.response({ error: 'You must login first' }).code(401)
    }
    return h.response({ title: "Hello my dear" + title + " How are you doing on this mighty fine day", userId, username: name })
  }
})

async function start() {
  try {
    await server.start()
  } catch (e) {
    console.log('app crashed', e)
    process.exit(1)
  }
  console.log('Server running at ', server.info.uri)
}

start()
