# The Nexus

Live site: https://cjsellwood.github.io/the_nexus/

## Description

The nexus is an online marketplace where products can be bought and sold by users. Anyone can view the products on offer, but a login is required to buy and sell products. New product listings include the ability to describe the product and upload up to 3 images of it. Products are bought by organising the purchase with the messaging system between the buyer and seller. The data is retrieved and sent by fetch requests to the [backend](https://github.com/cjsellwood/the_nexus_api).

## Technologies

- React - The ability to reuse components, avoid directly working with the HTML DOM and the large quantity of complementary libraries were the major reasons to use react
- Redux - Using redux for state management meant that fetching data from the API and using this data in many different locations was simple to accomplish
- Typescript - Adding typescript to the project ensured that type errors during coding were caught before the site was ran in the browser
- Chakra UI - This CSS framework helped by enabling quick styling during development, while also being customisable when finalising the sites' design
- Jest - The site was thoroughly tested with unit and integration tests to ensure it ran in the expected way and avoided bugs
- Cypress - Running end to end tests with cypress allowed the site to be tested from the perspective of the user

## Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm test`

Launches the jest test runner in the interactive watch mode.

### `npm run test:coverage`

Run jest with code coverage table shown

### `npm run cypress`

Open cypress to run end to end tests

### `npm run predeploy`

Builds the production version of the site before it is deployed

### `npm run deploy`

Deploys site to the github pages at the address listed in the package.json homepage value

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
