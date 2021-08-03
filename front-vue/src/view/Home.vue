<template>
  <div class="home">
    <UserSide
      v-on:modalMap="changeModal"
      :originMap="originMap"
      :destinationMap="destinationMap"
      :addHistory="addHistory"
      v-on:removeHistory="removeHistory"
      v-on:dataTrip="dateTrip = $event"
      v-on:tutorial="openTutorial = true"
      v-on:openModal="openSlide = true"
      v-on:allRoute="allRoute = true"
      :saveData="saveData"
    >
    </UserSide>
    <MapSide
      :modalMap="modalMap"
      :modalPrint="openModalPrint"
      :dataTrip="dateTrip"
      v-on:openModalPrint="openModalPrint = $event"
      v-on:originMap="originMap = $event"
      v-on:destinationMap="destinationMap = $event"
      v-on:addHistory="manageHistory($event)"
      v-on:img="img = $event"
      v-on:steps="steps = $event"
      :openSlide="openSlide"
      v-on:changeOpenSlide="openSlide = false"
      :saveData="saveData"
    >
    </MapSide>
  </div>
  <ModalPrint
    v-if="openModalPrint"
    v-on:close="openModalPrint = $event"
    :open="openModalPrint"
    :originMap="originMap"
    :destinationMap="destinationMap"
    :addHistory="addHistory"
    :img="img"
    :steps="steps"
    :dateTrip="dateTrip"
  ></ModalPrint>
  <ModalRoutes
    v-if="allRoute"
    v-on:close="allRoute = false"
  ></ModalRoutes>
  <Tutorial
    v-if="openTutorial"
    v-on:finish="openTutorial = false"
  >
  </Tutorial>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
} from 'vue';
import UserSide from '@/components/User-Side.vue';
import MapSide from '@/components/Map-Side.vue';
import ModalPrint from '@/components/Modal-Print.vue';
import Tutorial from '@/components/Tutorial.vue';
import ModalRoutes from '@/components/Modal-Routes.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ModalRoutes,
    Tutorial,
    ModalPrint,
    MapSide,
    UserSide,
  },
  props: {
    saveData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const originMap = ref(null);
    const openSlide = ref(false);
    const openTutorial = ref(false);
    const dateTrip = ref(null);
    const img = ref(null);
    const steps = ref(null);
    const destinationMap = ref(null);
    const modalMap = ref(false);
    const openModalPrint = ref(false);
    const addHistory = ref([]);
    const allRoute = ref(false);

    const changeModal = (e) => {
      modalMap.value = e;
    };

    const removeHistory = (index) => {
      if (index > -1) {
        addHistory.value.splice(index, 1);
      }
    };

    const manageHistory = (event) => {
      addHistory.value.push({
        data: event,
      });
    };

    onMounted(() => {
      if (props.saveData !== null) {
        dateTrip.value = props.saveData.date;
        destinationMap.value = {
          destination: props.saveData.destination,
        };
        originMap.value = {
          origin: props.saveData.origin,
        };
        addHistory.value = props.saveData.history;
      }
    });

    return {
      originMap,
      openTutorial,
      dateTrip,
      openSlide,
      img,
      steps,
      destinationMap,
      modalMap,
      openModalPrint,
      changeModal,
      addHistory,
      removeHistory,
      manageHistory,
      allRoute,
    };
  },
});
</script>
