### Description
Starter project with a set of React Bootstrap components. Includes: redux, redux-actions, redux-promise, express
<br/>
### Technologies and libraries
The following libs and technlogies were used:
* ```react``` (0.14)
* ```react-router```
* ```redux``` (```redux-thunk```, ```react-redux```, ```redux-actions```, ```redux-promise```)
* ```react-bootstrap```
* ```express```
 
```react-bootstrap``` is a library of reuseable front-end components. You'll get the look-and-feel of Twitter Bootstrap, but with much cleaner code, via Facebook's React.js framework.
In the builder you will have an ability easily compose components right on the page using different variants of Bootstrap components.

But also you can add your own reusable components manually.
Every component has its own quick note which is accessible through "Options" -> "ReadMe"

```react-router``` is used as routing mechanizm between pages in Structor. 
Equal router is used in final application after exporting pages. 
This will be discussed below in chapter "Export pages".

```redux``` is a great implementation of Flux architechture and helps dramatically to build advanced Web apps.

```express``` used as back-end HTTP server for Web application.
<br/>
<br/>
### Start backend server
If you want to see the app in action please do the following:
* Go to folder where you unpack downloaded package.
* Run command: ```npm install```
* Run command: ```npm run build-server```
* Run command: ```npm run build-client```
* Run command: ```node ./server.js```
* Go to http://localhost:3000

### Structure of the source code
Let's start from structure of the project's folder. 
In the description of each file or directory you may find information about how it is used by the builder and how you can change it for your purpose.
```
.structor/
 |--defaults/
 |   |--...
 |--desk/
 |   |--assets/
 |   |--index.html
 |   |--model.json
 |
 |--docs/
 |   |--...
 |--generators/
 |   |--react-es6
 |   |   |--scripts/
 |   |   |--generator.json
 |   |--...
 |
 |--src/
 |   |--default.js
 |   |--index.js
 |   |--...
 |
 |--templates/
 |   |--routes.js.tpl
 |   |--{pagename}.js.tpl
 |
 |--config.json
 |--proxy.json
build-conf/
 |--gulpfile.js
 |--webpack.config.js
 |--webpack-dev.config.js
public/
 |--images/
 |   |--...
 |--resources/
 |   |--...
 |--index.html
server/
 |--data/
 |--...
src/
 |--client/
 |   |--store/ 
 |   |   |--storeManager.js
 |   |   |--...
 |   |--... 
 |   |--main.js
 |--...
server.js
```
#### Meta files
* ```.structor/``` - folder of project's metainfo for Structor.
* ```.structor/defaults/``` - a folder where data models variants of component are stored
* ```.structor/desk/index.html``` - html file of page in the Structor workspace. 
Here you can add external resources which can not be included through the webpack require() mechanizm. 
For example, jQuery library of modernizr. 
Though, don't edit any existing links and refs - they are essential for edited page's workspace look and feel.
* ```.structor/desk/model.json``` - JSON data model of entire project.
* ```.structor/docs/``` - folder where Structor stores documentation for each component. There are markdown files named each after the component name.
* ```.structor/generators/``` - folder containing scripts and settings files for source code generators. Please refer to Structor docs chapter about source code generation.
* ```.structor/generators/react-es6/``` - all generators distributed through separated folders, this is one of the generators folder. 
If you want to create the source code generator for React component of your own, you can clone this folder and modify scripts and configuration of generator. 
But ofcourse, you have to know what data is passed to generator during React component generation, that information you may find in Structor documentation.
* ```.structor/generators/react-es6/scripts/``` - this is folder where generator javascripts files are. You can modify any file according to the rules of generation. 
In this project all generators are using lodash templates. 
* ```.structor/generators/react-es6/generator.json``` - do not modify the name of this file inside of generator's folder. 
This is a configuration of generator, where paths of scripts, output files, and rules of naming are described.
* ```.structor/src/``` - files for Structor workspace. 
* ```.structor/src/index.js``` - index file of React components which are used in current project. 
Here you can add the references of third-party components which you want to see in Structor's workspace. 
Also you can add here dependent resources like css, images, etc.
* ```.structor/src/default.js``` - main entry file for Structor's webpack, includes React Router config and connection with Redux storage in current project. 
Find line: ```const store = storeManager();``` If your Redux storage is created in another way or locates in other place you have to edit this here.
* ```.structor/templates/``` - folder with page and router templates which are using for exporting workspace pages into real application.
* ```.structor/templates/routes.js.tpl``` - lodash template for React Router which will contain all routes of developed pages in Structor. 
Currently Structor works with not nested routes.
* ```.structor/templates/{pagename}.js.tpl``` - lodash template for page's React component which will contain all components in particular page.
* ```.structor/config.json``` - configuration file. Currently has only relative path of the output folder for exported pages' source code.
* ```.structor/proxy.json``` - proxy configuration. Proxy configuration is used for setting up proxy in current ptoject while you are working with pages in Structor workspace. 
So, components can make requests to backend server omiting CORS restriction.
<br/>

#### Build scripts
* ```build-conf/gulpfile.js``` - this is gulp's config file for production & development build tasks. 
* ```build-conf/webpack.config.js``` - this is webpack's config file for production. 
The output of this config will be the minimized files in ```public/``` folder.
* ```build-conf/webpack-dev.config.js``` - this is webpack's config file for development stage of the project.
<br/>

#### Output Web app files
* ```public/``` - folder where static compiled files are.
* ```public/index.html``` - index file of our Web app. If you have included manually resources into meta file ```.structor/desk/index.html``` don't forget to include them here as well.
* ```public/images/``` ```public/resources/``` - due to rewriting rules in express.js we need to separate resources from index file.
<br/>

#### Data for backend server
* ```server/data``` - folder where various data files are resided in order to use them in backend server for testing purposes.
<br/>

#### Source code 
* ```src/``` - folder in which the source code of application is. 
Folders are created using examples from Redux documentation.
* ```src/client/store/storeManager.js``` - file which is used as connection point of Redux store for Structor and for real app.
* ```src/client/main.js``` - entry point of Web app. 
If you add manually React components into metainfo index.js you have to add them here as well.

```server.js``` - express backend server for current Web app.
<br/>
<br/>
### Starting Structor 
If you still didn't start the backend server please do the following: 
* Run command: ```npm install```
* Run command: ```node ./server.js```

Now you can start Structor from command line. To recognise the path of current project's folder Structor has 
to be started in the root directory of current project or started with command argument ```-d``` pointing to project's folder. 
* in project root dir: ```structor```
* in any other dir: ```structor -d <path to project directory>```

Once you have started Structor you will see the project's workspace. Now you can try to combine components with each other, 
or generate new React components from the combination, or add new pages, or whatever you want.

<br/>
<br/>
### Proxy setup
We need to setup proxy because of CORS restriction, it means that Structor runs on 2222 port on localhost, 
and our application may require to request REST service on 3000 port. That is restricted by browser policy.

To omit that Structor has embedded http proxy, which you can setup while you are working in workspace. 
So, if your application will work with REST service running on ```http://localhost:3000/service```, setup proxy to: ```http://localhost:3000``` 
and then application has to use the following pattern for requests ```/service/...```.

Current project already has proxy setup to http://localhost:3000.
But if you want to direct request from components into another REST or HTTP server you can setup new value in Structor menu:
<br/>
<br/>
### Exporting pages with routes
In any moment of work with Structor you can export existing pages into real pages with routes.
This can be done by selecting option "Export project". 

After that you will get a list of generated files of pages' components. And one more additional file for router configuration.
In current project these files will be generated into ```src/routes/``` folder. But, you can change this path in ```.structor/config.json``` file. 

Also you may edit templates for output React components in ```.structor/templates/``` or add your own new with ".tpl" extension.
<br/>
<br/>
### Building and trying a real Web app
Having exported pages and routes you can run webpack's build script:
* ```npm run build-client```

Then, if everything were built and you didn't stop backend server, just go to http://localhost:3000
<br/>
<br/>
### License
MIT
