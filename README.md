# Bingo Bigul
Famous Bingo game built with [JavaScript](https://www.javascript.com/). It has a back office app built with [ReactJS](https://reactjs.org/) and uses [MongoDB](https://www.mongodb.com/) for database.

![Main login screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/main-login-screen.png)
![Lobby screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/lobby-screen.png)
![Start screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/start-screen.png)
![Game screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/game-screen.png)
![Back office login screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/back-office-login-screen.png)
![Back office screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/back-office-screen.png)
![Back office edit screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/back-office-edit-screen.png)
![Discoverer screen](https://github.com/mihailgaberov/bingo/blob/master/screenshots/discoverer-screen.png)

## Running The App

To run the app, follow these steps:

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed globally. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
  > **Note:** Gulp must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.

4. Make sure you have `.env` file in your main project directory, containing the correct values for the following:

```dotenv
DB_SECRET=<yourdatabasepassword>
DB_URI=mongodb://127.0.0.1/<your database name>
```

5. Make sure you have [MongoDB](https://www.mongodb.com/download-center/community) installed and you are able to use [MongoDB shell version v4.0.0](https://docs.mongodb.com/manual/mongo/index.html)

6. To start MongoDB server, execute the following command:

```
mongod
```

> The default `dbpath` for MongoDB is `/data/db`, which means that if you have installed MongoDB in your `C:\` drive `mongod` with use it implicitly. But if you have your database installed on different path, you need to use `--dbpath=/path/to/your/db` parameter to specify it. It could be for example like this: `mongod --dbpath d:\mongodb\data\db`. For more info on this you may take a look [here](https://docs.mongodb.com/manual/reference/configuration-options/).

7. After you have your database running, you need to start the game server. You can do it by executing the following command in the project main directory:

  ```shell
  node server.js
  ```

8. To run the app, execute the following command:

  ```shell
  gulp
  ```
  
9. To run only the game client + unit tests, execute the following command:

  ```shell
  gulp fe
  ```
  
10. To run only the back office app + unit test for it, execute the following command:

  ```shell
  gulp bo
  ```

11. Browse to [http://localhost:8000](http://localhost:8000) to see the app.
