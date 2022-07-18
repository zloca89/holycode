# holycode

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Implementation

## Login

I implemented login using localStorage. I know it is not recomended to save sensitive data to local storage, but I did it just in purpose of the fake login.
There is also register page, where user can register and use username and password for login.

Didn't have time to implement fake serer side login functionality with JWT token implementation.

authGuard is used for managing authentication with canActivate function.

## Home page

When user successufully login, home page is shown with list of the resourses. User can filter by category(Books, Houses, Characters). User can do a fuzzy search of all resources. 

## Pagination

Because only 10 resourses is return by one page, I implemented paggination functionality.

## Filter

Filter is done in a way that user can choose multiple resourse types for filter without redirecting to the other page.

## Fuzzy search

I was using Fuse.js for implementing fuzzy search. 

## Detail of resourse

Clicking on the resourse in the table new page is opened with detail of the choosen resurse.

## Test

I didn't have time to implement integreation or end-to-end tests. As I saw, when I created components with Angular CLI, test file is added automatically with one default test for creation of the component. 
