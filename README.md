## README

### Description

This app is a simple form submission service to store billing addresses. Account creation and login is required to add addresses with authentication being handled through a combination of `passport` and `express` modules. `passport` was chosen for its ability to persist sessions and handle backend authentication. Additional persisting is handled by `redux-persist` to avoid the loading delays `react` sometimes introduces (when user profiles take a second to be loaded in from redux causing additional DOM rendering after page refresh). Addresses and user info are stored and accessed on `mongodb` via `mongoose`. `redux` talks to the API routes and manages state, passing it along to the `react` frontend which is written in `typescript` and styled with `react-bootstrap` and `styled-components`.

### How to run

1. run `npm i`
2. run `npm run start` to boot the backend and frontend in development mode
3. Open [http://localhost:8000](http://localhost:8000) to view it in the browser.


![image](https://user-images.githubusercontent.com/38513090/199583943-4fe835f8-12d4-4d0a-a158-532c11d4e029.png)
