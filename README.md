## EventsApp

To run this app follow the next steps

1. Clone this repository.

### Step A: Install and Run the API

2. Run
```bash
cd events-api
```
to enter directory.

3. Run
```bash
npm install
```
to download dependencies.

4. Run 
```bash
touch .env
```
to create .env file.

5. Add 
```bash
DATABASE_URL: [YOUR POSTGRES DATABASE URL]
```
to be able to connect to your database.

6. Run 
```bash
npx prisma migrate dev
```
to run migrations.

7. Run 
```bash
npm start
```
to run the server.

8. The api will be running on [http://localhost:4000](http://localhost:4000).

9. Access [http://localhost:4000/api-docs](http://localhost:4000/api-docs) to visit documentation.

### Step B: Install and Run the Client

10. Run
```bash
cd events-client
```
to enter directory.

11. Run
```bash
npm install
```
to download dependencies.

12.. Run 
```bash
npm start
```
to run the client.

13. Access [http://localhost:3000](http://localhost:3000) to visit client.

## Testing API with JEST: 

- To test the api run:  
```bash
cd events-api
npm test
``` 

### Implemented Features: 

- CRUD operations with Users and Events.
- Search Users and Events.
- Testing with Jest.
- OpenAPI documentation.
