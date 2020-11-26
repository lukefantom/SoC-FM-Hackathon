Documentation

Your task is to choose a project you or your partner have coded in the previous weeks (for scale, think hackathon or workshop rather than week eight project!).

Write the best documentation you can for it in this README. Remember that good documentation includes (but isn't limited to!) the following:

- Purpose - what problem is it solving?

The purpose of the app is to randomise different playlists based on set genres for different School of Code activities. Each activity becomes it's own radio station.

- What your components do and how they fit together - component tree

- App

  - Nav
  - Spotify Component

    - Authorization Helper Function
      - Heading
      - Button Component
      - Media Player Component
        - Iframe (Renders Media Player)

- How to start it and instructions for use

Once opened in terminal type

    npm start

This will open the app in your Localhost

- Examples showing your software in use

  soc-fm.mov

- Dependencies list and what each dependency does in your code

Created with create-react-app - for more information check the react docs

https://create-react-app.dev/docs/getting-started/
https://reactjs.org/docs/create-a-new-react-app.html

    "jest-dom": "^5.11.5",
    "@testing-library/react": "^11.1.1",
    "@testing-library/user-event": "^12.2.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.0",
    "web-vitals": "^0.2.4"

- Any other information users and developers might need to know

The Spotify component is the main component and keeps all the state.

There is a playlist state which contains the playlist information pulled from the Spotify API. There is a URL state which is the URL sliced form the Spotify Playlist URI.

There is a genre state, this is used when performing the fetch to the API. It searches for playlists of a specified genre.

Lastly there is a station state, that contains the string of the current radio station playing

- Authorisation

The authorisation requires users to create an app in the Spotify developer, create a client ID and secret for their own app
