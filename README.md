## README

### Description

This app is a simple email delivery service powered by SendGrid. Account creation and login is required to send emails with authentication being handled through a combination of `passport` and `express` modules. `passport` was chosen for its ability to persist sessions and handle backend authentication. Additional persisting is handled by `redux-persist` to avoid the loading delays `react` sometimes introduces (when user profiles take a second to be loaded in from redux causing additional DOM rendering after page refresh). Emails and user info are stored and accessed on MongoDB via `mongoose`. `redux` talks to the API routes and manages state, passing it along to the `react` frontend which is styled with React Bootstrap.

### How to run

1. create a .env file and add an ATLAS_URI and SENDGRID_API_KEY
2. run `npm i`
3. run `npm run start-dev` to boot the backend and frontend in development mode
4. Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

![Alt text](/public/ss-home.png?raw=true 'Home Page')

![Alt text](/public/ss-new-email.png?raw=true 'New Email Page')
