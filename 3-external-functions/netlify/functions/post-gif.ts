import { Handler } from "@netlify/functions";
import { ConvexClient, Id } from "@convex-dev/browser";
import fetch from "node-fetch";

import convexConfig from "../../convex.json";
const convex = new ConvexClient(convexConfig.origin);

// Replace this with your own GIPHY key obtained at
// https://developers.giphy.com/ -> Create Account.
const GIPHY_KEY = "QrXTp0FioARhBHalPs2tpA4RNOTLhFYs";

function giphyUrl(query: string) {
  return (
    "https://api.giphy.com/v1/gifs/translate?api_key=" +
    GIPHY_KEY +
    "&s=" +
    encodeURIComponent(query)
  );
}

// Post a GIF chat message corresponding to the query string.
const handler: Handler = async (event, context) => {
  const params = JSON.parse(event.body!);
  const channelId = Id.fromJSON(params.channel);
  const name = params.name;

  // Fetch GIF url from GIPHY.
  const gif = await fetch(giphyUrl(params.query))
    .then((response) => response.json())
    .then((json) => json.data.embed_url);

  // Write GIF url to Convex.
  await convex.mutation("sendMessage").call(channelId, "giphy", gif, name);

  return {
    statusCode: 200,
    body: JSON.stringify(gif),
  };
};

export { handler };
