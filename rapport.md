# RES - laboratoire orchestra

**Auteurs:** Corentin Zeller &  Tailhade Laurent

**Date:** 27 juin 2021



## Task 1: design the application architecture and protocols

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | How can we represent the system in an **architecture diagram**, which gives information both about the Docker containers, the communication protocols and the commands? |
|          | ![image-20210622235043594](/Users/czeller/Documents/GitHub/Teaching-HEIGVD-RES-2020-Labo-Orchestra/images/01_diagram.png) |
| Question | Who is going to **send UDP datagrams** and **when**?         |
|          | The musician application will send UDP datagrams every second to the auditor's application |
| Question | Who is going to **listen for UDP datagrams** and what should happen when a datagram is received? |
|          | The auditor application should listen for UDP datagrams coming from the musicians. Every active musician will be then stored as `uuid`, `instrument` and have an `activeSince` status. Then they should be published to the thid-party application by TCP on port 2205 |
| Question | What **payload** should we put in the UDP datagrams?         |
|          | The UDP datagrams used for communication between the musicians and the auditor should be constructed as follow: `{ "uuid": _unique id of musician_, "sound": _sound as specified_ } |
| Question | What **data structures** do we need in the UDP sender and receiver? When will we update these data structures? When will we query these data structures? |
|          | json objects will be used, the auditor will query them to delete the inactives musicians |

## Task 2: implement a "musician" Node.js application

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | In a JavaScript program, if we have an object, how can we **serialize it in JSON**? |
|          | JSON is a natural partner in crime for javascript, we can do this magically b using `JSON.stringify(MyHyperCoolObject)` |
| Question | What is **npm**?                                             |
|          | NPM stand for _Node package manager_, very cool yeah ? It's something used to call the nasa to get if a number is odd or not. (half joking here as this seriously exist).<br />It's a full library ecosystem for js based languages, it's a **registry** with (too much) existing packages it's also a **cli** used to build, run, develop our applications based on node.js |
| Question | What is the `npm install` command and what is the purpose of the `--save` flag? |
|          | `npm install` stand for "fill up my `node_modules`", it's fetching all the packages used by our application. the `--save` is useless as node already add the new dependencies to the manifest `package.json` |
| Question | How can we use the `https://www.npmjs.com/` web site?        |
|          | It's the marketplace for the npm package, you can have a monthly subscription for 49$, if you dont need to debug you can have it for only 25$ by month. No it's **free** and very usefull to get the latest trendy packages or search the old but not rusty ones. Better to be in the very cool packages Gucci gang.<br />If you want to publish private packages, you have a subscription tho, better write unreadable broken code and make it public since its free. |
| Question | In JavaScript, how can we **generate a UUID** compliant with RFC4122? |
|          | We can use the uuid package https://www.npmjs.com/package/uuid<br /> and use the following line`myId = uuid.v4();` |
| Question |                                                              |
|          | `setInterval(function, interval)`                            |
| Question | In Node.js, how can we **emit UDP datagrams**?               |
|          | By using the `dgram` api, read the musian code for an example |
| Question | In Node.js, how can we **access the command line arguments**? |
|          | example: `const m = new Musician(process.argv[2]);` for a quick tutorial head over there: https://www.geeksforgeeks.org/node-js-process-argv-property/ |

## Task 3: package the "musician" app in a Docker image

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | How do we **define and build our own Docker image**?         |
|          | Using a `Dockerfile` that define a image buildable by using `docker build` |
| Question | How can we use the `ENTRYPOINT` statement in our Dockerfile? |
|          | it's used to define the default command to run at container startup |
| Question | After building our Docker image, how do we use it to **run containers**? |
|          | `docker run myBestDockerImage`                               |
| Question | How do we get the list of all **running containers**?        |
|          | simply by using the amazing command `docker ps`              |
| Question | How do we **stop/kill** one running container?               |
|          | `docker kill` do the job                                     |
| Question | How can we check that our running containers are effectively sending UDP datagrams? |
|          | `wireshark` go brrrrr, yea you can use this tool for that    |

## Task 4: implement an "auditor" Node.js application

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | With Node.js, how can we listen for UDP datagrams in a multicast group? |
|          | by using `dgram` and the `bind` method to subscribe to the multicast address |
| Question | How can we use the `Map` built-in object introduced in ECMAScript 6 to implement a **dictionary**? |
|          | The `Map`available is a standard key-value store that we use with uuid as key and store related data as value |
| Question | How can we use the `Moment.js` npm module to help us with **date manipulations** and formatting? |
|          | `Moment.js` is the greatest package by our lord npm. it's do all the job for addition, time difference, format etc...<br />see `substract`and `format` or `diff`. |
| Question | When and how do we **get rid of inactive players**?          |
|          | We can check if the last time that we had a player/musician playing a nice sound is more than 5secs ago and remove it from the list in this case. look-up the map and filter it. |
| Question | How do I implement a **simple TCP server** in Node.js?       |
|          | The `Net`package is here for that. Lot of documentation is available |

## Task 5: package the "auditor" app in a Docker image

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | How do we validate that the whole system works, once we have built our Docker image? |
|          | there is a validation image to make integrations tests, thats why we had constraint during this lab. |
