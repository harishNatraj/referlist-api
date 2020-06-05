To install node modules for the react app (Folder name: refer-list), execute the following command:

### yarn 

To run the react application, execute the following command:

### npm start

To install node modules for the backend (Folder name: api), execute the following command:

### yarn

To run the backend server, execute the following command:

### npm run dev

## Application Description

* A new User can join the waitlist by giving his/her email id. The user will be registered.
* Once a user joins he/she will be redirected to the dashboard page, where the waiting list position of the user and the option to invite a friend via invite link will be available.
* If the user has been already registered and he/she tries to join waitlist, a new entry wont be made in the database. The user's details will be shown in the dashboard.
* On clicking the view waitlist, the users who have joined the waiting list and their position is displayed.
* A registered user can send invite link via email to his/her friend.
* If a new user joins the waitlist via referral link, the referrer will move a position up in the waitlist.
* If a user reaches the top of the list, the user will receive a welcome email.

* The database used is mongodb. The collection is available on the cloud (MongoDB Atlas) to use.
* Email is sent using SendGrid.

