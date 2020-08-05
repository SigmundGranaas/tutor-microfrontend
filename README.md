# edX-frontend-application

<!-- Introduction -->

# Table of Contents

- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Developer's Guide](#developers-guide)
  - [Tutor and Edx-platform Configuration](#tutor-and-edx-platform-configuration)
  - [Edx Platform APIs](#edx-platform-apis)
  - [Application Structure and Redux](#application-structure-and-redux)
  - [Edx Frontend Platform](#edx-frontend-platform)
  - [Edx Frontend Apps](#edx-frontend-apps)
  - [Edx Frontend Components](#edx-frontend-components)
  - [Wordpress API](#wordpress-rest-api)
  - [SSO with Feide and LinkedIn](#sso)
- [License](#license)

## Getting Started
This configuration applies to starting the project in devstack. 

Clone Repo \
`git clone https://github.com/NTNUbeta/edX-frontend-application.git`

Start Devstack \
`cd devstack && make dev.up.lms`

Start and Configure Wordpress \
`cd edX-frontend-application && docker-compose up` \
Goto http://localhost:8000/ and follow the instructions. Make sure to [enable pretty permalinks](https://wordpress.org/support/article/using-permalinks/) from the settings to make the API work as expected.

Start Devserver \
`cd edX-frontend-application && npm install` \
`npm start`

Visit http://localhost:8080/

## Deployment

## Developer's Guide

This project has aimed to explore how to use various frontend applications and components developed by the edX team with the APIs that comes with the edx-platform. The edx-platform itself is a massive application and with the various frontend applications and limited documentation on how to use them it is easy to get lost. Because of this we have documented our experiences and implementations, however we refer to the official documentations as the source of truth:

- [edx-platform: https://docs.edx.org/](https://docs.edx.org/)
- [tutor: https://docs.tutor.overhang.io/](https://docs.tutor.overhang.io/)
- [edx/frontend-platform: https://edx.github.io/frontend-platform/](https://edx.github.io/frontend-platform/)
- [wordpress/rest-api: https://developer.wordpress.org/rest-api/](https://developer.wordpress.org/rest-api/)

### Tutor and Edx-platform Configuration


#### Running the application in tutor


### Edx-platform APIs
New in the juniper release of openEdx is the ontroduction of REST-API's which is the foundation of our frontend application. Each service for OpenEdx has it's own api you can connect to. Currently we only use Discovery's and the LMS' API. Using API's to retrieve information allows us to create a standalone application independent of our installation of the OpenEdx platform, which won't be affected by new updates to the platform. 

Many of the API endpoints have restricted user acccess, few of which are documented. Most basic endpoints have been added. Information about courses, users and enrollments are availible. For more complex actions and access to information, you have to chain together several API calls which can be inefficient. Using these API calls for complex analytics is not yet suitable, as the amount of information you receive is still limited. 

#### LMS REST-API
The LMS base REST-API is the richest API

##### Courses
As a part of the marketing site, we need a full list of all current courses in the catalouge.

###### Course search

##### course enrollment

##### User
 

#### Discovery REST_API


##### Courses


### Application Structure and Redux

We've chosen to group files by type then feature, meaning all React Components are placed in /src/components and all redux actions and reducers are placed in /src/data, as opposed to grouping by feature where each feature would contain a set of components, reducers, static assets etc.

We use a redux store as the primary source for containing application state. To get an idea of all the different states look at the `rootReducer` in /src/data/reducers/index.js. There are however some parts of the application's state that reside in other places such as `AppContext` (see edx-frontend-platform documentation below), and some components may have their own state defined that is not reachable from the redux store.

The redux implementation is mostly straight forward. The redux store combines all the reducers and is created in /src/data/configureStore.js and it is passed to the application in /src/index.js. A component can access the store by using the `connect()` function, and can change the state by calling upon a specific `action` that in return triggers a `reducer` that will return the new state. Some actions (specifically those related to the Profile components) triggers several middlewares such as `sagas` and `services`. This is implementation uses more seperation of logic and is inherited by the [edx/frontend-app-profile](https://github.com/edx/frontend-app-profile).

### Edx-frontend-platform

Edx has developed a [library](https://github.com/edx/frontend-platform) to make integration of frontend applications with the openedx-platform APIs easier. This library comes with several services; react components, authentication, internalization, logging, analytics and misc. By inspecting for instance the react service's index.js we find all the components that we can use:

![@edx/frontend-platform/react/index.js](/docs/readme/index_react.PNG)

See the [official documentation](https://edx.github.io/frontend-platform/) for a complete list of all the services and their functions, and take a look at the comments in the [source code](https://github.com/edx/frontend-platform) for more information on how they work.

#### Initialize

The initalization function is run before the react application renders and will handle all the configuration of the various services. It will dispatch/emit events such as `APP_READY` and `APP_INIT_ERROR` depending on the success of the function. The default template used for this application subsribes to these events and will only render the react application if `APP_READY` is emitted (see /src/index.js). This is the reason that the react application will not be rendered if it can't connect with the LMS API for instance.

#### React Components

The most essential components from this library are AppContext, AppProvider and the AuthenticatedPageRoute.

The AppProvider wraps the entire application and provides the AppContext to other components (see /src/index.js). By injecting AppContext into the useContext-hook for instance, you get access to the following two objects:

![@edx/frontend-platform/react/AppContext](/docs/readme/appcontext.PNG)

The authenticatedUser contains various user info such as username, and the config object bundles together environmental variables from .env files with whatever config you've added using 'mergeConfig' from 'frontend-platform/config'. When using AppContext in combination with the Auth-service, all of the login session logic towards the LMS is handled for you.

The AuthenticatedPageRoute works just like a Route from 'react-router', but will redirect the user to the login page if not authenticated.

#### Authentication

By default, the auth service will send requests to the LMS every few seconds to refresh the JwT used to authenticate the session.

<!-- TODO: Update this section once we've gotten login redirect to work -->

In order to use the LMS login page, use `redirectToLogin()` and `redirectToLogout()` from this library. These functions will redirect to the LMS login/logout page with a redirect url back to this application appended as a parameter. Redirecting back to this application requires some configuration of the LMS:

1. Set FEATURES('ENABLE_MICROFRONTEND_LOGIN') = true
2. Add 'localhost:8080' to LOGIN_REDIRECT_WHITELIST

Most API calls to the various openedx APIs requires basic authentication. Use `getAuthenticatedHttpClient()` to populate the request with basic authentication:

![import getAuthenticatedHttpClient](/docs/readme/import_gethttpclient.PNG)
![example of api call](/docs/readme/example_api_call.PNG)

#### Internalization (i18n)

<!-- TODO: Complete this section -->

This service is about adopting the application to different languages. The most important functions are ...

It works by storing all application messages in JSON formats and injecting them into the html document (as opposed to hard coding the messages) like this: `props.intl.formatMessage(messages['profile.viewMyRecords'])`. The `intl` class is passed to the component's props by exporting the component like this: `export default (injectIntl(ProfilePage));`

We store the default messages in /src/data/messages seperated by feature. In the figure below, the message defined as `profile.viewMyRecords` has 3 properties, and the `defaultMessage` property is what will be rendered on the page when we're using the default language (English).

![Example of profile messages](/docs/readme/messages_example.PNG)

The translations are stored in /src/i18n/messages. Each language supported will have its own .json file with translations of the default messages. We provide these files to the application by passing it as an option to the `initialize()` function in /src/index.jsx.

To change the language setting of the application ...

Check out the [official documentation](https://github.com/edx/frontend-platform/blob/02433dfb791c86f494884760c1a3dbb50bc43f02/docs/how_tos/i18n.rst).

#### Logging

#### Analytics

This service lets you easily send customized analytics data to a [Segment Data Platform](https://segment.com/). The `initialize()` function will automatically configure the analytics service, but you will need a Segment Project and paste the `SEGMENT_KEY` into your .env file for it to work. From the Segment Dashboard you can configure the platform to forward the data to analytics tools such as [Google Analytics]() and [Amplitude](). See the [Segment Getting Started documentation](https://segment.com/docs/getting-started/02-simple-install/).

The figure below is taken from the Segment Dashboard and illustrates how Segment operates as a data source platform and forwards data to 'Destinations'.

![Segment Connections](/docs/readme/segment_connections.PNG)

To configure a destination such as Google Analytics you need to enable the feature and include the `Website Tracking ID` which you get from the Google Analytics Dashboard.

![Google Analytics Settings](/docs/readme/segment_ga_settings.PNG)

To send data simply use one of the 'sendEvent' functions from the analytics service. For instance, to track that whenever a user visits the '/article' page do:

```javascript
function Articles({ getArticles, articles: { articles, isLoadingArticles } }) {
  useEffect(() => {
    getArticles();
    sendPageEvent('Articles');
  }, []);
```

### Edx-frontend-apps

#### Frontend Template Application

We used [this template](https://github.com/edx/frontend-template-application/blob/master/package.json) as a base for our application, however we updated the dependencies in package.json to newer versions, and disabled the `husky script` in package.json.

#### Frontend App Profile

We integrated [frontent-app-profile](https://github.com/edx/frontend-app-profile) directly into our application. Since this is a standalone react application it is not possible to integrate it as if it were a component out of the box. Here are some articles discussing how to implement micro-frontends:

- https://www.robinwieruch.de/react-micro-frontend
- https://medium.com/better-programming/5-steps-to-turn-a-random-react-application-into-a-micro-frontend-946718c147e7
- https://micro-frontends.org/

One of the issues we see with implementing a micro-frontend structure is the need to modify webpack configurations. The application template we used as a base depends on [edx/frontend-build](https://github.com/edx/frontend-build#readme) for setup (see "fedx-scripts" in package.json). Because of the added overhead and complexity this adds we chose to simply copy the relevant components from [frontent-app-profile](https://github.com/edx/frontend-app-profile) and make the needed adjustments.

The advantage of this approach is that it is easier to make adjustments and add our own features, however it also means we need to maintain the code ourselves. If there are many micro-frontends we wish to include in our app, looking into a micro-frontend structure might be worth considering.

### Edx-frontend-components

#### Header and Footer

We have integrated [edx/frontend-component-header](https://github.com/edx/frontend-component-header) and [edx/frontend-component-header](https://github.com/edx/frontend-component-header) in the app. While it is possible to simply install and import these components with npm, we wanted to make our own adjustments to the components. The default components don't support customization, so again we chose to fork/copy the source code.

### Wordpress REST API

The Wordpress REST API is great for simple content management and the wordpress docker image comes with a practical GUI. Once the wordpress container is running and configured you can get a list of all the endpoints available by sending a GET request to http://localhost:8000/wp-json/. They are also documented [here](https://developer.wordpress.org/rest-api/reference/).

The application uses posts as the main form for siaply articles on the landing page and the article page. Articles on the landing page are differentiated from the regular articles with specific categories. ![Wordpress categories](/docs/readme/wordpress_categories.png) The articles page lists all posts from wordpress as articles. 

#### Wordpress REST API search and categories

The search functionality of the article page is powered by the wordpress rest api. Currently, all requests to the wordpress api uses the same function, with different parameters according to each use case. All calls to the api also chains together a another call, to get the featured image of all the posts. The application uses offset parameters for pagination results from the api. ![Wordpress search](/docs/readme/wordpress_api_search.png)

The search component used is from [edx/paragon](https://edx.github.io/paragon/) a library of react components created for OpenEdx. It supports OnChange functionality which means it will search continously as you type, which is convenient, because the clear button currently does not work. 

#### Wordpress Styling from raw HTML

The content of all wordpress posts are retrieved as pure html code. Styling for this code is applied only inside the single article page. Currently we have manually configured the css to each applicable html tag. This solution is not final as we are considering using SCSS to import styling from the wordpress. ![Wordpress styling](/docs/readme/wordpress_styling.png)

### SSO

## License
