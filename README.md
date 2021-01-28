# Soc FM

## School of Code - Hackathon Week 7

The app is designed to randomise different playlists based on set genres for different School of Code activities. Each activity becomes it's own radio station.

[!Homepage](https://github.com/lukefantom/SoC-FM-Hackathon/blob/main/public/Screen%20Shot%202021-01-28%20at%2012.27.19.png)

Our brief was to create a web experience using data from an API. This was our first time working remotely in a group of four rather the pair-programming, we spent the morning researching various API's and picked out 3 potential favourites as a group.

We used Disney Ideation to come up with our idea for the hackathon and worked through the Dreamer, Realist and Critic.
We decided on an MVP which could be achieved by lunchtime and then set some stretch goals which we could work on in the afternoon.
We used Trello to make a Kanban board - to map out our tasks and delegate the workload.
We broke down our idea in component parts and prioritised our tasks.

## Component Tree
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

## App Details

The Spotify component is the main component and manages the state.

There is a playlist state which contains the playlist information pulled from the Spotify API. There is a URL state which is the URL sliced form the Spotify Playlist URI.

There is a genre state, this is used when performing the fetch to the API. It searches for playlists of a specified genre.

Lastly there is a station state, that contains the string of the current radio station playing

- Authorisation

The authorisation requires users to create an app in the Spotify developer, create a client ID and secret for their own app
