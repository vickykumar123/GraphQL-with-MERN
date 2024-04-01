import {authResolver} from "./authResolver";
import {bookingResolver} from "./bookingResolver";
import {eventResolver} from "./eventResolver";
import {userResolver} from "./userResolver";
export const resolver = {
  ...authResolver,
  ...bookingResolver,
  ...eventResolver,
  ...userResolver,
};
