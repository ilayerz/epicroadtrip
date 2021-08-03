<template>
  <div v-if="!auth.isUserAuthenticated()"  class="main-user">
    <div id="userContent" v-if="!auth.isUserAuthenticated()" :class="register ? 'user' : 'user-close'">
      <div id="userReduce" v-on:click="close" class="user-reduce">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path
              d="M8.91643 8.50003C8.90085 8.70042 8.96175 8.90509 9.11543 9.05805L15.4337 15.3657C15.7127 15.644 16.1645 15.644 16.4436 15.3657C16.7226 15.0874 16.7226 14.6363 16.4436 14.3573L10.5764 8.50003L16.4436 2.64274C16.7226 2.36446 16.7226 1.91333 16.4436 1.63502C16.1645 1.35673 15.7127 1.35673 15.4337 1.63502L9.1154 7.94271C8.96175 8.09567 8.90154 8.2996 8.91643 8.50003ZM0.547248 9.05805L8.29391 16.7913C8.57295 17.0696 9.02476 17.0696 9.30377 16.7913C9.5828 16.513 9.5828 16.0612 9.30377 15.7836L2.0082 8.50003L9.3038 1.2172C9.58283 0.938886 9.58283 0.487792 9.3038 0.208757C9.02476 -0.0695579 8.57295 -0.0695579 8.29394 0.208757L0.547993 7.94196C0.394316 8.09492 0.334128 8.2996 0.349715 8.50001C0.333382 8.70042 0.394288 8.90509 0.547248 9.05805Z"
              fill="#05B98C"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="17" height="17" fill="white" transform="translate(17 17) rotate(-180)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div v-if="register" style="display: contents;">
        <!--  Title  -->
        <h1 v-if="!actionUser">Rester serein et</h1>
        <h1 v-if="!actionUser">connectez-vous !</h1>
        <h1 v-if="actionUser && !signUser">Register</h1>
        <h1 v-if="actionUser && signUser">Sign In</h1>
        <h1 id="backTo" v-if="actionUser" v-on:click="back">Back to</h1>

        <!--  Button  -->
        <div v-if="!actionUser" class="user-btn-container">
          <div id="signIn" v-on:click="signInAction" class="user-btn">
            <h3>Sign In</h3>
          </div>
          <div id="register" v-on:click="registerAction" class="user-btn">
            <h3>Register</h3>
          </div>
        </div>

        <div class="user-action" v-if="actionUser">
          <div class="actions" v-if="!signUser">
            <div class="user-input">
              <h3>Email: </h3>
              <input placeholder="Email...." type="email" v-model="user.mail">
            </div>
            <div class="user-input">
              <h3>Password: </h3>
              <input placeholder="Password...." type="password" v-model="user.password">
            </div>
            <div class="user-input">
              <h3>Confirm Password: </h3>
              <input placeholder="Confirm Password...." type="password" v-model="user.passwordConfirm">
            </div>
            <h4 v-if="user.password !== null && user.passwordConfirm !== null && !passwordConfirmed">Passwords are different</h4>
            <div id="registerButton" v-on:click="sendRegister" class="user-btn">
              <h3>Register</h3>
            </div>
          </div>
          <div class="actions" v-if="signUser">
            <div class="user-input">
              <h3>Email: </h3>
              <input placeholder="Email...." type="email" v-model="user.mail">
            </div>
            <div class="user-input">
              <h3>Password: </h3>
              <input placeholder="Password...." type="password" v-model="user.password">
            </div>
            <div id="signInButton" v-on:click="sendSignIn" class="user-btn">
              <h3>Sign In</h3>
            </div>
          </div>
        </div>

        <!--  Icon Zen  -->
        <img :src="Zen" alt="zen">
      </div>
      <div v-else>
        <h2>?</h2>
      </div>
    </div>
  </div>
  <div v-on:click="openConnectUser" v-else class="connected-user">
    <div class="btn-user" v-if="auth.isUserAuthenticated()">
      <svg class="info-only" v-if="!connectUser" width="32" height="32" viewBox="0 0 32 32">
        <path d="M16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM18.039 20.783c-0.981 1.473-1.979 2.608-3.658 2.608-1.146-0.187-1.617-1.008-1.369-1.845l2.16-7.154c0.053-0.175-0.035-0.362-0.195-0.419-0.159-0.056-0.471 0.151-0.741 0.447l-1.306 1.571c-0.035-0.264-0.004-0.7-0.004-0.876 0.981-1.473 2.593-2.635 3.686-2.635 1.039 0.106 1.531 0.937 1.35 1.85l-2.175 7.189c-0.029 0.162 0.057 0.327 0.204 0.379 0.16 0.056 0.496-0.151 0.767-0.447l1.305-1.57c0.035 0.264-0.024 0.726-0.024 0.902zM17.748 11.439c-0.826 0-1.496-0.602-1.496-1.488s0.67-1.487 1.496-1.487 1.496 0.602 1.496 1.487c0 0.887-0.67 1.488-1.496 1.488z"></path>
      </svg>
      <div class="btn-user" v-else>
        <svg class="info" width="32" height="32" viewBox="0 0 32 32">
          <path d="M16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM18.039 20.783c-0.981 1.473-1.979 2.608-3.658 2.608-1.146-0.187-1.617-1.008-1.369-1.845l2.16-7.154c0.053-0.175-0.035-0.362-0.195-0.419-0.159-0.056-0.471 0.151-0.741 0.447l-1.306 1.571c-0.035-0.264-0.004-0.7-0.004-0.876 0.981-1.473 2.593-2.635 3.686-2.635 1.039 0.106 1.531 0.937 1.35 1.85l-2.175 7.189c-0.029 0.162 0.057 0.327 0.204 0.379 0.16 0.056 0.496-0.151 0.767-0.447l1.305-1.57c0.035 0.264-0.024 0.726-0.024 0.902zM17.748 11.439c-0.826 0-1.496-0.602-1.496-1.488s0.67-1.487 1.496-1.487 1.496 0.602 1.496 1.487c0 0.887-0.67 1.488-1.496 1.488z"></path>
        </svg>
        <div v-on:click="openAllRoute" class="btn">
          <h3>See your routes</h3>
        </div>
        <div v-on:click="disconnectUser" class="btn-disconnect">
          <h3>Disconnect</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
  inject,
} from 'vue';
// eslint-disable-next-line import/named
import { postRegister, postLogin } from '@/services/api/user';
import Zen from '../assets/svg/zen.svg';

export default defineComponent({
  name: 'User',
  setup(props, { emit }) {
    const auth = inject('$auth');
    const failedLogin = ref(false);
    const register = ref(true);
    const connectUser = ref(false);
    const user = ref({
      mail: null,
      password: null,
      passwordConfirm: null,
    });
    const close = () => {
      register.value = !register.value;
      if (!register.value) {
        document.getElementsByClassName('main-user')[0].style.height = '35px';
        document.getElementsByClassName('main-user')[0].style.width = '35px';
      } else {
        document.getElementsByClassName('main-user')[0].style.height = '100%';
        document.getElementsByClassName('main-user')[0].style.width = '100%';
      }
    };
    watch(
      () => register.value,
      () => {
        if (register.value) {
          document.getElementsByClassName('user-action')[0].style.height = '75%';
        } else {
          document.getElementsByClassName('user-action')[0].style.height = '90%';
        }
      },
    );
    const passwordConfirmed = ref(false);
    watch(
      () => user.value,
      () => {
        if (user.value.password !== null && user.value.passwordConfirm !== null && user.value.passwordConfirm === user.value.password) {
          passwordConfirmed.value = true;
        }
      },
      { deep: true },
    );

    const actionUser = ref(false);
    const registerAction = () => {
      actionUser.value = true;
      document.getElementsByClassName('user-action')[0].style.height = '50%';
      document.getElementsByClassName('user-reduce')[0].style.display = 'none';
      document.getElementsByClassName('main-user')[0].style.height = '50%';
    };

    const signUser = ref(false);
    const error = ref(false);

    const signInAction = async () => {
      actionUser.value = true;
      signUser.value = true;
      document.getElementsByClassName('user-action')[0].style.height = '50%';
      document.getElementsByClassName('user-reduce')[0].style.display = 'none';
      document.getElementsByClassName('main-user')[0].style.height = '50%';
    };

    const sendRegister = async () => {
      if (user.value.mail !== null && user.value.mail !== '' && passwordConfirmed.value) {
        const data = {
          email: user.value.mail,
          password: user.value.password,
        };
        const response = await postRegister(data);
        auth.login(response);
        if (auth.isUserAuthenticated()) {
          actionUser.value = false;
          signUser.value = false;
          document.getElementsByClassName('user-action')[0].style.height = '95%';
          document.getElementsByClassName('user-reduce')[0].style.display = 'flex';
          document.getElementsByClassName('main-user')[0].style.height = '25%';
        }
        if (auth.error.value) {
          failedLogin.value = true;
        }
      } else {
        error.value = true;
      }
    };
    const sendSignIn = async () => {
      if (user.value.mail !== null && user.value.mail !== '' && user.value.password !== null && user.value.password !== '') {
        const data = {
          email: user.value.mail,
          password: user.value.password,
        };
        const response = await postLogin(data);
        auth.login(response);
        if (auth.isUserAuthenticated()) {
          actionUser.value = false;
          signUser.value = false;
          document.getElementsByClassName('user-action')[0].style.height = '95%';
          document.getElementsByClassName('user-reduce')[0].style.display = 'flex';
          document.getElementsByClassName('main-user')[0].style.height = '25%';
        }
        if (auth.error.value) {
          failedLogin.value = true;
        }
      } else {
        error.value = true;
      }
    };

    const openConnectUser = () => {
      connectUser.value = !connectUser.value;
      if (connectUser.value) {
        document.getElementsByClassName('connected-user')[0].style.width = '100%';
        document.getElementsByClassName('connected-user')[0].style.height = '15%';
      } else {
        document.getElementsByClassName('connected-user')[0].style.width = '20%';
        document.getElementsByClassName('connected-user')[0].style.height = '5%';
      }
    };

    const disconnectUser = () => {
      auth.logout();
      setTimeout(() => {
        document.getElementsByClassName('user-action')[0].style.height = '75%';
        document.getElementsByClassName('user-reduce')[0].style.display = 'flex';
        document.getElementsByClassName('main-user')[0].style.width = '100%';
      }, 1000);
    };

    watch(
      () => auth,
      () => {
        if (!auth.isUserAuthenticated()) {
          user.value.passwordConfirm = null;
          user.value.mail = null;
          user.value.password = null;
        }
      },
      { deep: true },
    );

    const back = () => {
      actionUser.value = !actionUser.value;
      signUser.value = false;
      register.value = true;
      document.getElementsByClassName('user-reduce')[0].style.display = 'flex';
      document.getElementsByClassName('user-action')[0].style.height = '75%';
    };

    const openAllRoute = () => {
      emit('allRoute');
    };

    return {
      Zen,
      auth,
      connectUser,
      close,
      register,
      user,
      passwordConfirmed,
      actionUser,
      signUser,
      registerAction,
      signInAction,
      sendRegister,
      sendSignIn,
      openConnectUser,
      disconnectUser,
      back,
      openAllRoute,
    };
  },
});
</script>
