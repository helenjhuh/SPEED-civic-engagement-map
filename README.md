# civic-engagement-map

## What is it?

This project was proposed by **Denise Crossan**, who is a Lang Visiting Professor, of the Lang Center for Civic & Social Responsibility at Swarthmore College as part of the 2019 Swarthmore Projects for Educational Exploration & Development ([SPEED](https://www.swarthmore.edu/its/swarthmore-projects-educational-exploration-and-development-speed-program)) Program. The project is led by **Doug Willen** of Swarthmore College, as well as **Steven Ferenandez ('20)** and **Helen Huh ('21)**.

The Eugene M. Lang Center for Civic and Social Responsibility (https://www.swarthmore.edu/lang-center/about-lang-center) facilitates Swarthmore College’s commitment to intellectual rigor, ethical engagement, and social responsibility by connecting what we call the three C’s: curriculum, campus, and communities. The Lang Center connects the College’s curricular excellence with engagement in all of those communities using an approach that we identify as “Engaged Scholarship.”

## Why?

The Civic Engagement Map is a platform that allows the entire campus community to 
1) visualize,  through pins,  the variety of civic engagement activities on campus for Faculty, Staff, Students and Community Partners, 
2) seize the opportunity to see and support new partnerships, and 
3) measure our civic engagement social impact.  

## Goals

We wanted to upgrade the current civic engagement map [site](http://mapmyorg.net/), which had limited functionatlity, using Mapbox's API for a more solid interface as well as streamline the process of adding pins to the map. Additionally, we wanted to expand the website's functions in order to make the user's experience on the site much more interactive. 

## Deployment

1. Clone the repository 
```
git clone git@github.com:Swarthmore/civic-engagement-map.git civapp
```

2. Install npm dependencies
```
cd client && npm install
cd server && npm install
```

3. Copy the `example.env` files within the `server` and `client` directories.

```
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Once your `.env` files are set up
- Start the server by running `npm start` within the `server` directory.
- Start the client by running `npm start` within the `client` directory.

5. You can login with the credentials provided in `server/.env`

## Acknowledgements

We would like to thank Denise for proposing the civic engagement project in order to help all faculty, staff, alumni, and students understand and better communicate their passions and interests through a collaborative platform. It has shown us the power of creating a tool for everyone to use in order to make positive impact locally as well as globally.

We are incredibly grateful to our project as well as SPEED program supervisor, **Doug Willen**, project contributor, **Anthony Weed**, our associates at Mapbox, **Megan Danielson** and **Mikel Maron**, and our associates at the Lang Cneter for Civic and Social Responsibility, **Brenna Leary** and **Nimesh Ghimire** for their constant support and considerate insight. All provided us with their own expertise and encouragement as we learned how to navigate through designing, implementing, and deploying the civic engagement map. Thank you also to the Swarthmore College Librarians and ITS for all their support behind the scenes through the whole process.

Additionally, we would like to thank all of our fellow SPEED members, **Alice Huang ('22)**, **Bilal Soukouna ('22)**, and **Katie Knox ('21)**, for providing us with supportive feedback and constant support during the duration of this project.

This project was funded by the Swarthmore Projects for Educational Exploration and Development (SPEED) Program at Swarthmore College.
