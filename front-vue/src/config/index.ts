const DATA = 'data';

const API_URLS = {
  HOSTELS: {
    GET_HOSTELS: 'find/hostels',
  },
  RESTAURANTS: {
    GET_RESTAURANTS: 'find/restaurants',
  },
  BARS: {
    GET_BARS: 'find/drinks',
  },
  TRANSPORTS: {
    GET_TRANSPORTS: 'find/transports',
  },
  EVENTS: {
    GET_EVENTS: 'find/events',
  },
  DETAIL: {
    GET_DETAIL: 'detail/',
  },
  USER: {
    POST_REGISTER: 'user/register',
    POST_LOGIN: 'user/login',
    POST_ROUTE: 'user/save',
    GET_ROUTE: 'user/get/save',
    GET_ALL_ROUTES: 'user/get/usersave',
  },
};

interface GetType {
  radius?: number,
  lat: number,
  long: number,
}
interface GetTypeEvent {
  radius?: number,
  lat: number,
  long: number,
  start: string,
  end: string,
}
interface GetStaticImg {
  long: number,
  lat: number,
  zoom: number,
  size: number,
  token: number,
}

interface UserData {
  email: string,
  password: string,
}

export {
  API_URLS,
  DATA,
  GetType,
  GetStaticImg,
  GetTypeEvent,
  UserData,
};
