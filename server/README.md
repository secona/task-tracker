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
* `types` &mdash; typescript types definitions
* `scripts` &mdash; folder for js scripts

### Scripts
```sh
# run app with hot reload
npm run dev

# create a new migration file in `~/db/migrations`
npm run migration:new

# run new migrations that haven't been run in `~/db/migrations`
npm run migration:latest

# rollback the last batch of migrations performed
npm run migration:rollback

# list all migration files status
npm run migration:list

# create a new seed `~/db/seeds`
npm run seed:new

# run all seeds in `~/db/seeds`
npm run seed:run

# run test (currently, no tests have been set)
npm run test
```