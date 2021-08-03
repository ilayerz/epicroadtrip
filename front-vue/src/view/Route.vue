<template>
  <home
    v-if="data !== null"
    :saveData="data"
  >
  </home>
</template>

<script>
import { ref, onMounted } from 'vue';
// eslint-disable-next-line import/named
import { getRoute } from '@/services/api/user';
// eslint-disable-next-line import/extensions
import Home from '@/view/Home';

export default {
  name: 'Route',
  components: {
    Home,
  },
  setup() {
    const data = ref(null);
    onMounted(async () => {
      const sessionID = window.location.href.split('/route/')[1];
      const a = await getRoute(sessionID);
      data.value = JSON.parse(a.data.save);
      console.log(data.value);
    });
    return {
      data,
    };
  },
};
</script>

<style scoped>

</style>
