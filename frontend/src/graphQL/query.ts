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
    query: `mutation CreateEvent {
      createEvent(eventInput: {$title: "Cool", $description: "Cool Desc", price: $1000, $date: "2024-03-23T14:42:08.629Z"}) {
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
        creator {
          _id
          email
        }
      }
    }`,
  };
  return requestBody;
};
