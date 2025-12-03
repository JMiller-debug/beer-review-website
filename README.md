This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
First, run pnpm install to install all the dependencies.

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
website locally. Note not guarranteed to work without proper support from
backend dataserver and database.

## About

This website was developed to be an interface into the beer review database. The
goal was to be able to add beers and review them with my friends. Eventually
building up a catalog of beers we liked and disliked. In addition it was to be a
good place to learn about next.js and tailwindcss for use in future job searches
to supplement my angular knowledge.

## Current State

The current state of the project is very early days, it has basic navigation and
can only access a few of the endpoints that that the dataserver provides.

## Features

- Dashboard Page: Currently shows the latest beers that have been updated/added
  to the database. 
- Beers List: Currently lists all the beers in the database and allows for Fuzzy
  searching over the beers either by brewery or name to sort.
- Beer Page: When a beer from either the dashboard or beers page is clicked on,
  you are taken to their page (Minimmal at the moment). Here you can see the
  reviews that have been posted for this beer and even create your own review
- Review Form: Once you click "Create Reveiw", a dialog box pops up allowing you
  to fill out your review. This is the section I am working on at the moment and
  as such doesn't do anything if you press post at the moment.


## Future Features
Things that are planned to come up in the future
- Breweries page: Much like the beers page except allows you to search for
  breweries, as well as a Brewery page that shows information about a given
  brewery
- User Accounts: Minimal user accounts to allow my friends to be able to post
  reviews so we can track who has said what
- Images for the beers and company logo
- More cards on the dashboard page to show highest rated beers, recent reviews,
  new breweries, etc.
- Tidy up the css styling, make it more consistent and themed. Add support for
  dark mode and responsive viewports such as mobile/desktop