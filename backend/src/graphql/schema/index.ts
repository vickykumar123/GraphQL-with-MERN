import {buildSchema} from "graphql";
export const schema = buildSchema(`
type Booking{
    _id:String
    event:Event!
    user:User!
    createdAt:String
    updatedAt:String
}
type Event{
  _id:ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator:User
}
type User{
  _id:String!
  email:String!
  password:String
  createdEvents: [Event!]
}

type AuthData{
    userId:ID!
    token:String!
    tokenExpiration:Int!
    email:String!
}

input EventInput{
  title: String!
  description: String!
  price: Float!
  date: String!
}
input UserInput{
  email:String!
  password:String!
}

type RootQuery{
    events:[Event!]!
    getEventById(_id:String!):Event
    getUser(_id:String!):User
    booking:[Booking!]
    login(email:String!,password:String!):AuthData
}

type RootMutation{
    createEvent(eventInput:EventInput):Event
    createUser(userInput:UserInput):User
    bookEvent(eventId:ID):Booking!
    cancelBooking(bookingId:ID):Event!
    
}
schema{
    query:RootQuery,
    mutation:RootMutation
}
`);
