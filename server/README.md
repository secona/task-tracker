# Server

### Environment Variables
* `GOOGLE_CLIENT_ID` &mdash; google client id for google oauth2. [Learn more](https://developers.google.com/identity/protocols/oauth2)
* `GOOGLE_CLIENT_SECRET` &mdash; google client secret for google oauth2. [Learn more](https://developers.google.com/identity/protocols/oauth2)
* `DATABASE_URL` &mdash; postgres connection string
* `ROOT_URL` &mdash; the root url of your app e.g. `https://example.com`. (for oauth2 redirect)
* `NODE_ENV` &mdash; `production` or `development`
* `ACCESS_TOKEN_SECRET` &mdash; string to generate access token

### File Structure
* `db` &mdash; all database needs
  * `migrations` &mdash; database table migrations 
  * `seeds` &mdash; database seeds for development (don't use for production!)
* `src` &mdash; server's source code
  * `core` &mdash; server's core (where features such as `projects` and `tasks` live)
  * `config` &mdash; config objects
  * `lib` &mdash; functions
  * `middlewares` &mdash; express middlewares
  * `interfaces` &mdash; interfaces and abstract classes
  * `routes` &mdash; route definitions
* `types` &mdash; typescript types definitions
* `scripts` &mdash; folder for js scripts

### Scripts
* `yarn dev` &mdash; run app with hot reload
* `yarn build` &mdash; build app
* `yarn knex` &mdash; run knex cli with knexfile specified. [Read docs](https://knexjs.org)
* `yarn test` &mdash; run test (currently, no tests have been set)