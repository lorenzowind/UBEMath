[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
![size-shield]
![commit-shield]

<br />
<p align="center">
  <a href="https://github.com/lorenzowind/UBEMath">
    <img src="logo.png" alt="Logo" width="180" height="180">
  </a>

  <h3 align="center">UBEMath Project</h3>

  <p align="center">
    Game Software to help the Elementary School students in Mathematics' learning!
    <br />
    <a href="https://app.swaggerhub.com/apis/lorenzowind/UBEMath/1.0.0"><strong>Explore the API Spec »</strong></a>
    <br />
    <br />
    <a href="https://ubemath.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/lorenzowind/UBEMath/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/lorenzowind/UBEMath/issues/new">Request Feature</a>
  </p>
</p>

## Table of Contents
* [About the Project](#about-the-project)
* [How to install?](#how-to-install)
* [Built With](#built-with)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project
This project intends to provide an equal opportunity to learn the 9th-grade Mathematics of the elementary school, based on an interpretation of a series of researches about the factors, difficulties, and various coefficients that are associated with the partiality of Brazilian students. 

Therefore, investigates that has a weakness in the current scenario, since the need for change and the long-term perspective, represent a distant pattern from what is consistent with the capacity for intellectual strengthening. Consequently, the country’s technical progress becomes infeasible, as well as the development of individual skills. 

The exposed syllogism allows the comprehension of a particular line of reasoning, which demonstrates the deficit of society, precisely because it ignores the importance of the foundation of logical and structured knowledge, mainly due to the disharmony with Mathematics. 

Essentially, the project is related to the methodology of progress through gamification, where there will be a journey to be completed. 

The student will have a long way to go, with several obstacles, being represented by 9th-grade mathematics segments. Also, covering scenarios, characters, and resources, essential for the advancement and reflection of what is considered attractive to young people of this age group. 

Overall, the game will be integrated into a platform with several associated features, allowing the constant interaction of the student and favoring a consequent greater understanding of these fundamental areas of Mathematics.

## How to install?
1. To run the backend, follow these steps:
- Navigate to the backend folder and install the dependencies:
```bash
// Navigate to the backend folder
$ cd backend

// Install application dependencies
$ yarn
```
- Install MySQL, MongoDB, Redis and Adminer Docker images using docker-compose:
```bash
// Run the Docker images
$ docker-compose up -d
```
- Create a file called .env based on .env.example and enter your AWS credentials;
- Create a file called .ormconfig.json based on .ormconfig.example.json and insert the MySQL host and port according to the previously installed Docker images, in addition to exchanging the src recipient for dist and .ts for .js;
- Configure the credentials of the MySQL Docker image using the following commands:
```bash
// Enter the MySQL image bash
$ docker exec -it IMAGE_NAME bash
// Enter the MySQL image root
$ mysql -u root -p
// Change the password
$ ALTER USER root IDENTIFIED WITH mysql_native_password BY ‘ROOT_USER_PASSWORD’;
```
- Run the database migrations using the command:
```bash
// Run the migrations
$ node_modules/.bin/typeorm migration:run
```
- Add a no-restart configuration for each Docker image using the command:
```bash
// Change the configuration of the Docker images
$ docker update --restart=unless-stopped ID_DA_IMAGEM
```
- Start the server using the command:
```bash
// Start the server
$ yarn dev:server
```
2. To run the frontend, follow these steps:
- Navigate to the frontend folder and install the dependencies:
```bash
// Navigate to the frontend folder
$ cd frontend

// Install application dependencies
$ yarn
```
- Start the application using the command:
```bash
// Start the application
$ yarn start
```

## Built With
* Framework for platform frontend: [React.js](https://reactjs.org/)
* Engine for game creation: [Unity](https://unity.com)
* Backend Framework: [Node.js](https://nodejs.org)
* Database technology: [MySQL](https://www.mysql.com/), [MongoDB](https://www.mongodb.com/), and [Redis](https://redis.io/)
* Backend data processing technology: [TypeORM](https://typeorm.io)
* Technology for testing implementation: [Jest](https://jestjs.io/)
* API documentation tool: [SwaggerHUB](https://swagger.io/tools/swaggerhub/)
* Prototyping tool: [Adobe XD](https://www.adobe.com/br/products/xd/features.html)
* Diagram creation tool: [LucidChart](https://www.lucidchart.com/pages/pt)

## Contact
Lorenzo Windmoller Martins - [LinkedIn](https://www.linkedin.com/in/lorenzo-windmoller-martins/) - lorenzomart01@gmail.com

Samuel Albuquerque de Paiva - samycaaa@gmail.com

Vinícius Andrade Perrone - [LinkedIn](https://www.linkedin.com/in/vin%C3%ADcius-perrone-2484001b1/) - perronevinicius2018@gmail.com

## Acknowledgements
* [README Template by othneildrew](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

[contributors-shield]: https://img.shields.io/github/contributors/lorenzowind/UBEMath?style=flat-square
[contributors-url]: https://github.com/lorenzowind/UBEMath/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/lorenzowind/UBEMath?style=flat-square
[issues-url]: https://github.com/lorenzowind/UBEMath/issues

[size-shield]: https://img.shields.io/github/repo-size/lorenzowind/UBEMath?style=flat-square

[commit-shield]: https://img.shields.io/github/last-commit/lorenzowind/UBEMath?style=flat-square