---
date: 7-29-2020
---

# Full-stack App for Authentication

## Description

App designed for authentication with access and refresh tokens

## Access token

### Client side

The objective of this token is validate the API POST requests. Access tokens are stored locally on a class called "auth".

### Server side

The access token is stored in the DB and the used to validate the access token from the client.

## Refresh token

### Client side

The refresh token is sent as cookie to the client and used to refresh the access token to keep the user logged in.

### Server side

The DB stores the version of the refresh token. Once the client requests to refresh the access token, the API validates that the version of the refresh token received is the same than the stored at the DB

## Technologies used

### Server

- Express.js
- Json Web Token
- Bcrypt
- MongoDB

### Client

- React
- Bulma CSS (styles)

## TODO

Automatic refresh when access token is expired
