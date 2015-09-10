## User Services

Services to handle user login and data, for ProjectJLOR.


### Setup
```
npm install
```

### Development

Make sure mongo is running locally and run `node src/server.js`.


### Routes

#### GET /api/user/

Retrieve all users userData

#### GET /api/user/:fbId

Retrieve all userData for user with facebook id `:fbId`.

#### GET /api/user/:fbId/fields/:fields

Retrieve all userData for user with facebook id `:fbId` limited to `:fields`, where `:fields` is a comma-separated list.

#### POST /api/user

Pass an access token, a user's Facebook ID and email.  The DB schema will grow to match any fields included in userData.

```
{
  "token": "testToken",
  "userData": {
    "id": "718325719",
    "name": "James Conkling",
    "gender": "male",
    "location": {
      "id": "110184922344060",
      "name": "Washington, District of Columbia"
    },
    "likes": {
      "data": [
        {
          "name": "The Forests Dialogue",
          "id": "113670252007668",
          "created_time": "2015-07-18T23:44:50+0000"
        },
        {
          "name": "Bearcat Wildcat",
          "id": "1686033758292206",
          "created_time": "2015-06-22T20:43:20+0000"
        },
        ...
      ],
      "paging": {
        "cursors": {
          "before": "MTEzNjcwMjUyMDA3NjY4",
          "after": "MjAzMzU0ODM2MzU2NTAz"
        },
        "next": "https://graph.facebook.com/v2.4/718325719/likes?access_token={{access_token}}&pretty=0&limit=25&after=MjAzMzU0ODM2MzU2NTAz"
      }
    },
    "link": "http://www.facebook.com/718325719",
    "feed": {
      "data": [
        {
          "story": "James Conkling shared a link.",
          "created_time": "2015-08-07T05:29:34+0000",
          "id": "718325719_10155854330400720"
        },
        {
          "message": "fyi",
          "created_time": "2015-08-03T14:48:15+0000",
          "id": "718325719_10204730491603625"
        },
        ...
      ],
      "paging": {
        "previous": "https://graph.facebook.com/v2.4/718325719/feed?since=1438925374&access_token={{access_token}}&limit=25&__paging_token=enc_AdCJOAYm7jnpD5HqMFeNbmqJxjqJZB2C3gvt6tefh5GYZA7DA9AKRBA94eaEPfrvzKg2ou4vWYVyyGILj7ImdkzIsX&__previous=1",
        "next": "https://graph.facebook.com/v2.4/718325719/feed?access_token={{access_token}}&limit=25&until=1420070750&__paging_token=enc_AdBRe5r5ACbT2ZCbOZCNlL7R2w6flLrArZCZBZCU9b43ZCUIhniZBrQWWsmk5i154XcfJXjZBAkCUwFJ4KQam50TZBagco16ZA"
      }
    }
  }
}

```
