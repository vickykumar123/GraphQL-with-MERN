export const login = (email: string, password: string) => {
  const requestBody = {
    query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
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
