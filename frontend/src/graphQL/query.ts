export const login = (email: string, password: string) => {
  const requestBody = {
    query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            email
          }
        }
      `,
    variables: {
      email: email,
      password: password,
    },
  };
  return requestBody;
};

export const signup = (email: string, password: string) => {
  const requestBody = {
    query: `
            mutation CreateUser($email: String!, $password: String!) {
              createUser(userInput: {email: $email, password: $password}) {
                _id
                email
              }
            }
          `,
    variables: {
      email: email,
      password: password,
    },
  };
  return requestBody;
};

export const createEvent = (
  title: string,
  description: string,
  price: number,
  date: Date | string
) => {
  const requestBody = {
    query: `mutation CreateEvent($title: String!,$description:String!,$price:Float!, $date:String!) {
      createEvent(eventInput: {title: $title, description: $description, price:$price, date: $date}) {
        title
        description
        price
        date
      }
    }
    `,
    variables: {
      title,
      description,
      price,
      date,
    },
  };
  return requestBody;
};

export const getAllEvents = () => {
  const requestBody = {
    query: `query Events {
      events {
        _id
        title
        date
        price
        creator {
          _id
          email
        }
      }
    }`,
  };
  return requestBody;
};

export const bookEvent = (eventId: string) => {
  const requestBody = {
    query: `
    mutation BookingEvent($eventId:String!) {
      bookEvent(eventId: $eventId) {
        _id
        user {
          email
        }
        event {
          title
        }
      }
    }
    `,
    variables: {
      eventId,
    },
  };
  return requestBody;
};
