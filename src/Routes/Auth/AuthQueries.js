import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $usernName: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    createAccount(
      usernName: $usernName
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;
