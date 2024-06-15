# Home Library API

Welcome to the Home Library API, a service for managing artists, albums, tracks, and user favorites in a home library system.

## Endpoints

### Users

- **GET /users**: Retrieve all users.
- **GET /users/:id**: Retrieve a user by ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update a user's password.
- **DELETE /users/:id**: Delete a user.

### Artists

- **GET /artists**: Retrieve all artists.
- **GET /artists/:id**: Retrieve an artist by ID.
- **POST /artists**: Create a new artist.
- **PUT /artists/:id**: Update an artist's information.
- **DELETE /artists/:id**: Delete an artist.

### Albums

- **GET /albums**: Retrieve all albums.
- **GET /albums/:id**: Retrieve an album by ID.
- **POST /albums**: Create a new album.
- **PUT /albums/:id**: Update an album's information.
- **DELETE /albums/:id**: Delete an album.

### Tracks

- **GET /tracks**: Retrieve all tracks.
- **GET /tracks/:id**: Retrieve a track by ID.
- **POST /tracks**: Create a new track.
- **PUT /tracks/:id**: Update a track's information.
- **DELETE /tracks/:id**: Delete a track.

### Favorites

- **GET /favorites**: Retrieve all favorite artists, albums, and tracks.
- **POST /favorites/artists/:id**: Add an artist to favorites.
- **DELETE /favorites/artists/:id**: Remove an artist from favorites.
- **POST /favorites/albums/:id**: Add an album to favorites.
- **DELETE /favorites/albums/:id**: Remove an album from favorites.
- **POST /favorites/tracks/:id**: Add a track to favorites.
- **DELETE /favorites/tracks/:id**: Remove a track from favorites.

## Usage

1. Install dependencies:

2. Start the server:

3. Use API endpoints to manage users, artists, albums, tracks, and favorites.

## Notes

- The API uses in-memory data storage for now. Future versions will include database integration.
- Ensure requests are validated according to API documentation to avoid errors.
- Default port for the API is 4000, which can be configured in the .env file.


