require('dotenv').config();
const fastify = require('fastify')({ logger: true });

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const scope = "user-read-private user-read-email user-read-recently-played";
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// Declare a route
fastify.get('/auth', async (request, reply) => {
    const state = generateRandomString(16);

    const params = {
        state,
        response_type: "code",
        client_id: clientId,
        scope,
        redirect_uri: redirectUri
    };
    
    const queryParams = new URLSearchParams(params);
    console.log('redirecting to', queryParams.toString());
    return reply.redirect('https://accounts.spotify.com/authorize?' + queryParams.toString());
});

fastify.get('/oauth/spotify', async (request, reply) => {
    const code = request.query.code;
    
});

const port = process.env.APP_PORT || 3000;

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

const generateRandomString = (size) => {
    const result = [];
    for (let i = 0; i < size; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("");
};