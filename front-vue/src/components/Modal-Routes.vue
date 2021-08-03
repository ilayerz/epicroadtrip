<template>
  <div class="modal-route">
    <div id="routesModal" class="modal">
      <div v-on:click="$emit('close', false)" class="modal-cross">
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 23L12.5 12.5M23 2L12.5 12.5M2 2L12.5 12.5M12.5 12.5L23 23" stroke="black" stroke-width="3"
                stroke-linecap="round"/>
        </svg>
      </div>
      <div v-if="data !== null" class="modal-container">
        <h1>All routes</h1>
        <div v-for="row in data" :key="row.sessionId" class="modal-detail">
          <p style="margin-bottom: 20px">Go to route: {{ row.sessionId }}</p>
          <div class="btn" v-on:click="goToRoute(row.sessionId)">
            <h3>Route</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  inject,
  onMounted,
  ref,
} from 'vue';
import { getAllRoute } from '@/services/api/user';

export default defineComponent({
  name: 'Modal-Routes',
  setup(props) {
    const auth = inject('$auth');
    const data = ref(null);
    onMounted(() => {
      getAllRoute(auth.token.value).then((response) => {
        data.value = response.data;
      });
    });
    const goToRoute = (value) => {
      window.location.href = `${window.location.href.split('route/')[0]}route/${value}`;
    };
    return {
      data,
      goToRoute,
    };
  },
});
</script>
