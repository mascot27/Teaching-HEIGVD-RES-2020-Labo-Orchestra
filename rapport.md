# RES - laboratoire orchestra



## Task 1: design the application architecture and protocols

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | How can we represent the system in an **architecture diagram**, which gives information both about the Docker containers, the communication protocols and the commands? |
|          | ![image-20210622235043594](/Users/czeller/Documents/GitHub/Teaching-HEIGVD-RES-2020-Labo-Orchestra/images/01_diagram.png) |
| Question | Who is going to **send UDP datagrams** and **when**?         |
|          | The musician application will send UDP datagrams every second to the auditor's application |
| Question | Who is going to **listen for UDP datagrams** and what should happen when a datagram is received? |
|          | The auditor application should listen for UDP datagrams coming from the musicians. Every  active musician will be then stored as `uuid`, `instrument` and have an `activeSince` status. Then they should be published to the thid-party application by TCP on port 2205 |
| Question | What **payload** should we put in the UDP datagrams?         |
|          | The UDP datagrams used for communication between the musicians and the auditor should be constructed as follow: `{ "uuid": _unique id of musician_, "sound": _sound as specified_ } |
| Question | What **data structures** do we need in the UDP sender and receiver? When will we update these data structures? When will we query these data structures? |
| ⚠️⚠️⚠️      | *Enter your response here...* TODO?????                      |

## Task 2: implement a "musician" Node.js application

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | In a JavaScript program, if we have an object, how can we **serialize it in JSON**? |
|          | JSON is a natural partner in crime for javascript, we can do this magically b using `JSON.stringify(MyHyperCoolObject)` |
| Question | What is **npm**?                                             |
|          | NPM stand for *Node package manager*, very cool yeah ? It's something used to call the nasa to get if a number is odd or not. (half joking here as this seriously exist).<br />It's a full library ecosystem for js based languages, it's a **registry** with (too much) existing packages it's also a **cli** used to build, run, develop our applications based on node.js |
| Question | What is the `npm install` command and what is the purpose of the `--save` flag? |
|          | `npm install` stand for "fill up my `node_modules`", it's fetching all the packages used by our application. the `--save` is useless as node already add the new dependencies to the manifest `package.json` |
| Question | How can we use the `https://www.npmjs.com/` web site?        |
|          | It's the marketplace for the npm package, you can have a monthly subscription for 49$, if you dont need to debug you can have it for only 25$ by month. No it's **free** and very usefull to get the latest trendy packages or search the old but not rusty ones. Better to be in the very cool packages Gucci gang.<br />If you want to publish private packages, you have a subscription tho, better write unreadable broken code and make it public since its free. |
| Question | In JavaScript, how can we **generate a UUID** compliant with RFC4122? |
|          | step 1:<br />![image-20210623001730970](/Users/czeller/Library/Application Support/typora-user-images/image-20210623001730970.png)<br />step 2:<br />![image-20210623001818856](/Users/czeller/Library/Application Support/typora-user-images/image-20210623001818856.png) |
| Question | In Node.js, how can we execute a function on a **periodic** basis? |
|          | step 1<br />![image-20210623002125096](/Users/czeller/Library/Application Support/typora-user-images/image-20210623002125096.png)<br />step 2<br />![image-20210623002157957](/Users/czeller/Library/Application Support/typora-user-images/image-20210623002157957.png) |
| Question | In Node.js, how can we **emit UDP datagrams**?               |
|          | step 1<br />![image-20210623002231876](/Users/czeller/Library/Application Support/typora-user-images/image-20210623002231876.png)<br />RTFM |
| Question | In Node.js, how can we **access the command line arguments**? |
|          | step 1<br />![image-20210623002342632](/Users/czeller/Library/Application Support/typora-user-images/image-20210623002342632.png)<br /> Step 2:![image-20210623002410862](/Users/czeller/Library/Application Support/typora-user-images/image-20210623002410862.png)<br /> |

## 

