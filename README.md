## README

### Description

This app is a simple email delivery service powered by SendGrid. Account creation and login is required to send emails with authentication being handled through a combination of Passport and Express modules. Emails and user info are stored and accessed on MongoDB via Mongoose. Redux talks to the API routes and manages state, passing it along to the React frontend which is styled with React Bootstrap.

### How to run

1. create a .env file and add your MongoDB URI and SendGrid API key
2. run `npm i`
3. run `npm run start-dev` to boot the backend and frontend in development mode
4. Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
