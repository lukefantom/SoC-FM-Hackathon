export const client_id = "e75f118de4624c43bede99894b2522bd"; // Your client id
export const client_secret = "e9b4f023a2d94ff0a290b61d31584824"; // Your secret

// your application requests authorization
export const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};
