import { computed, ref, watchEffect } from 'vue';
import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

const tokenId = `${process.env.VUE_APP_INSTANCE_NAME}-${process.env.VUE_APP_JWT_TOKEN_NAME}`;

// Used as a store for user
const state = ref({
  loading: false,
  isAuthenticated: false,
  user: {},
  error: false,
  token: null,
  tokenExpired: false,
});

// Once logged, store the information
const loggedIn = (token): void => {
  state.value.token = token;
  localStorage.setItem(tokenId, token);
  state.value.user = jwtDecode(token);
  state.value.isAuthenticated = true;
  state.value.error = false;
  state.value.tokenExpired = false;
};

// Get rid of everything
const logout = (): void => {
  localStorage.removeItem(tokenId);
  state.value.loading = false;
  state.value.user = {};
  state.value.isAuthenticated = false;
  state.value.token = null;
  state.value.error = false;
  state.value.tokenExpired = false;
};

// Check if user is authenticated
const isUserAuthenticated = (): boolean => {
  const localToken = localStorage.getItem(tokenId);
  try {
    loggedIn(localToken);
    return true;
  } catch (e) {
    return false;
  }
};

// Log the user in
const login = (response: AxiosResponse): void => {
  state.value.loading = true;

  try {
    loggedIn(response.data);
  } catch (e) {
    state.value.error = true;
    if (process.env.NODE_ENV !== 'prod') {
      console.log(`Login action failed: ${e.message}`);
    }
  } finally {
    state.value.loading = false;
  }
};

const tokenHasExpired = (): void => {
  localStorage.removeItem(tokenId);
  state.value.token = null;
  state.value.tokenExpired = true;
  state.value.isAuthenticated = false;
};

const authPlugin = {
  isAuthenticated: computed(() => isUserAuthenticated()),
  loading: computed(() => state.value.loading),
  user: computed(() => state.value.user),
  token: computed(() => state.value.token),
  tokenExpired: computed(() => state.value.tokenExpired),
  error: computed(() => state.value.error),
  login,
  logout,
  isUserAuthenticated,
  tokenHasExpired,
};

// eslint-disable-next-line consistent-return
const routeGuard = (): string|boolean => {
  const { isAuthenticated, loading } = authPlugin;
  // eslint-disable-next-line consistent-return, @typescript-eslint/explicit-function-return-type
  const verify = () => {
    if (isAuthenticated.value) {
      return true;
    }
    return '/login';
  };

  if (!loading.value) {
    return verify();
  }
  // Watch for the loading property to change before we check isAuthenticated
  // eslint-disable-next-line consistent-return
  watchEffect(() => {
    if (loading.value === false) {
      return verify();
    }
  });
};

export {
  authPlugin,
  routeGuard,
};
