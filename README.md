# Phil Antiporda's and Simon Curran's Curtain Co Marketplace

<!-- The app: [thecurtain.co]()   -->

Link to live app in development  
Front-End Source code: [FE Repo](https://github.com/SimoSultan/curtainco_fe)  
Back-End Source code: [BE Repo](https://github.com/philrussel21/curtain_co_BE)

[simonmcurran.com](https://www.simonmcurran.com/)  
![SimoSultan's GitHub](https://img.shields.io/github/followers/SimoSultan?logo=GitHub&style=for-the-badge)  
![@simo_sultan's Twitter](https://img.shields.io/twitter/follow/simo_sultan?color=%234183C4&logo=twitter&style=for-the-badge)
<!-- ![Simons's LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white) -->

[philantiporda.netlify.com](https://philantiporda.netlify.app/index.html)  
![phil's GitHub](https://img.shields.io/github/followers/philrussel21?logo=GitHub&style=for-the-badge)  
![@PeelRasel's Twitter](https://img.shields.io/twitter/follow/PeelRasel?color=%234183C4&logo=twitter&style=for-the-badge)
<!-- ![Phil's LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white) -->



---



## Index:

- [**Purpose**](#Purpose) - why the app was built
- [**Target Audience**](#Target-Audience) - what can the app do
- [**Features and Functionalities**](#Features-and-Functionalities) - what can the app do
- [**Tech Stack**](#Tech-Stack) - the languages that make up the app
- [**Dependencies and Resources**](#Dependencies-and-Resources) - the node modules used throughout the app and their resources
- [**Dataflow Diagram**](#Dataflow-Diagram) - how data flows through the app
- [**Application Architecture Diagram**](#Application-Architecture-Diagram) - how the app is connected
- [**User Stories**](#User-Stories) - how the app would behave according to different user roles
- [**Sitemap**](#Sitemap) - how the user gets around the app 
- [**Wireframes**](#Wireframes) - the look and feel of the app
- [**Development Timeline**](#Development-Timeline) - development log and Trello
- [**Copyright and Legal**](#Copyright-and-Legal) - legal information
- [**Authors**](#Authors) - who wrote this README doc



---


## Purpose

The purpose of the app is to migrate the client’s business, along with her ideas, into a dynamic website. This website embodies elegance and sophistication to bring a unique experience to its users.
It would be the client’s platform where she can share her suggestions and expertise in the industry while selling curtains and product samples. The website would also allow interested parties to communicate with the client through email thus expanding her own clientele.



---




## Target Audience

The target audience of this website are users that are willing to spend a little bit more in exchange for quality experience and designer-picked products that would help turn a house into a home.



---



## Features and Functionalities

### Current Features:

- #### Admin

  - Admin Authentication
  - Admin Authorisation
  - CRUD Actions to _Collections_
  - CRUD Actions to _Products_
  - All Users dashboard
  - Company Profile Updates

- #### Users

  - User Authentication
  - User Authorisation
  - Browsing anonymity for Casual Users
  - Filtering Categories
  - Searching Functionality
  - Secured Payment with Stripe/Paypal
  - User Profile Customization
  - Pagination Viewing Experience
  - _Collection_ Customization

### Future Features:

- #### Admin
  - Testimonial Adding Feature
- #### Users

  - Booking System for appointments
  - User Dashboard containing Booking/Appointment details
  - Anonymous casual user's ability to add to Cart before authentication
  - User's ability to leave reviews on a _Collection_ or _Product_
  - Third Party OAuth (Google, Yahoo, Facebook, Apple, Microsoft)
  - Wishlist feature for users



---




## Tech Stack

- [**ReactJS**](https://reactjs.org/) - A Javascript library used for building user interfaces and the overall Front End of the app.
  
- [**NodeJS**](https://nodejs.org/en/) - A Javascript runtime built on Chrome's V8 Javascript engine used for building the back-end API service of the app.

- [**MongoDB - Atlas**](https://www.mongodb.com/cloud/atlas) - A global cloud database service for modern applications used as the database for this app.

- [**PayPal API**](https://developer.paypal.com/docs/api/overview/) - The faster, safer way to pay online without sharing financial details used to handle payments securely for this app.

- [**Netlify**](https://www.netlify.com/) - Hosting service to be used for deploying the React Front-End side of the app.

- [**Heroku**](https://www.heroku.com/) - Hosting service to be used for deploying the Node-Express Back-End side of the app.

- [**Git**](https://git-scm.com/) - Version control system along

- [**GitHub**](https://github.com/) - The hosting service of the version control system


---



## Dependencies and Resources

- ### Back-End
  - [Express JS]() - for the server that handles requests between the client and database 
  - [Passport]() - for user authentication
  - [passport-local]() - for
  - [Mongoose]() - for connecting Express and Mongo DB Atlas
  - [Connect-mongo]() - for
  - [express-session]() - for
  - [Mongoose-bcrypt]() - for
  - [nodemon]() - a developer dependency that automatically restarts the server on a file change to save time
  - [dotenv]() - for storing environment variables that are hidden from the client

- ### Front-End
  - [Material UI](https://material-ui.com/) - for the client side styling
  - [Material UI Icons](https://material-ui.com/components/material-icons/) for the icons used throughout the app
    <!-- - [404 Page]() the page that shows when a URL is not found... -->



- ### General
  - [Trello](https://trello.com/en) - for project management
  - [Draw.io](https://app.diagrams.net/) - for the [Sitemap](#Sitemap), [DFD](#Dataflow-Diagram) and [AAD](#Application-Architecture-Diagram)
  - [Figma](https://www.figma.com/) - for the [Wireframes](#Wireframes)
  - [Stack Overflow](https://stackoverflow.com/) for the problem solving



---



## Dataflow Diagram

![Curtain Co Dataflow Diagram](/docs/DataFlow_Diagram.png)



---



## Application Architecture Diagram

![Curtain Co Application Arhictecture Diagram](/docs/Curtain_co_AAD.png)



---




## User Stories

### Current

#### Admin User Stories

- As an admin, I want to be able to put new _Products_ in the website, so I can potentially generate more income and offer more selection.
- As an admin, I want to be able set up a new _Collection_ from my existing _Products_ so I can offer more selection to my users.
- As an admin, I want to be able to view my user's details, so I can initiate communication with them.
- As the company owner, I want my users to view the links to my business' socials on every page so I can promote my business better.
- As an admin, I can upload photos to the website when listing a new _Product_ or when setting up a new _Collection_ so I can better catch my user's attention.
- As an admin, I want casual users to not have access to certain pages so I can better secure my website.
- As the company owner, I want to have a page where I can tell my potential customers about myself and my business so that I can connect and develop relationship with them.
- As the company owner, I want a seemless flow where users can float through the site so I can offer them better interface compared to other company's website.
- As the company owner, I want a clean crisp, airy but with warmth user experience so I can differentiate my website to other competitor's website.
- As an admin, I want to be able to edit my business details shown on my site so I can update my users for any changes.

#### Customer User Stories

- As a casual user, I want to remain anonymous when just casually browsing the website so I can enjoy my privacy.
- As a user, I want to be able to sign up so I can have full access to the website.
- As an existing user, I want to be able to log in, so I can fully access the website without having to register again.
- As a logged in user, I want to be able to see my details and have an option to update them.
- As a logged in user, I want to be able to see my purchase history so I can review my past purchases.
- As a user, I want to have links available throughout the website so I can easily navigate around.
- As a user, I can see a full selections of _Products_ that I can buy.
- As a user, I want to be able to sift through _Products_ in a form of numerous result pages so I don't have a cluttered page with all the products.
- As a user, I want to be able to search for a particular product in mind so I don't have to go through every single product.
- As a user, I want to be able to filter _Products_ according to their category or type so I don't have to see all _Products_ of unrelated category.
- As a user, I want to be able to pay securely when I have decided to buy something so I don't have to worry about security.
- As a user, I want to have an option to buy a _Collection_ where the owner hand picks _Products_ that goes well together so I can take advantage of the owner's expertise in the industry.
- As a user, I want to see and be able to customise items in the _Collection_ of my choice so I can better personalise according to my taste.
- As a user, I want to be redirected to a certain page when I accidentally visited an invalid or unauthorized link.
- As a user, I want to be able to add multiple items in my cart so I can pay for them all at the same time when I'm done choosing.
- As a user, I want to be able to set the quantity of the products I wish to purchase so that I can buy more than one in one transaction.
- As a user, I want to be able to communicate with the owner by providing them with my email.

### Nice-to-have User Stories

#### Admin User Stories

- As an admin, I can see the data about the types of users using my site so I can better cater their needs.
- As an admin, I have an option to set the vibe/experience (summer, spring, winter deals) of my site so I can have a more dynamic website to my users.
- As an admin, I can see in my dashboard any upcoming appointments with clients.

#### Customer User Stories

- As a user, I want to book an appointment in the website and choose a valid time for me and the owner to meet.
- As a user, I want to be able to see all my upcoming booking appointments in my profile page.
- As a user, I want to be shown different deals during different seasons or events.



---





## Sitemap

[Link to Sitemap in Draw.io](https://www.figma.com/file/UHm86rh8y2z1ELencrFId1/Sitemap?node-id=0%3A1)

![Curtain Co Sitemap](/docs/CurtainCoSitemap.png)



---



## Wireframes

[Link to Wireframes in Figma]()

![]()

---




## Development Timeline

- [Development Log](./docs/dev-log.md)
- [Trello - Part A Documentation Board](https://trello.com/b/VF6Vc7Ri/part-1-documentation)
- [Trello - Part B Development Board](https://trello.com/b/bWDaFBft/part-2-code)



---



## Copyright and Legal

Copyright © 2020 Simon Curran & Phil Antiporda


---

## Authors

© Simon Curran [simonmcurran.com](https://www.simonmcurran.com/)  
© Phil Antiporda [philantiporda.netlify.com](https://philantiporda.netlify.app/index.html)
