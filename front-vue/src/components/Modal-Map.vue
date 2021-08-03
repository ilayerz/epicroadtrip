<template>
  <transition name="slide-fade">
    <div
      v-if="modalMap && !reduceModal"
      id="modalMap"
      class="modal-map"
    >
      <div class="modal-top">
        <div id="activitiesList" class="modal-title">
          <div
            v-for="icon in icons"
            :key="icon"
            :class="icon.active ? 'modal-icon-active' : 'modal-icon'"
            v-on:click="changeSelect(icon.type)"
          >
            <IconFood v-if="icon.type === 'food'" :class="icon.active ? 'svg-active' : ''"></IconFood>
            <IconEvent v-if="icon.type === 'event'" :class="icon.active ? 'svg-active' : ''"></IconEvent>
            <IconBar v-if="icon.type === 'bar'" :class="icon.active ? 'svg-active' : ''"></IconBar>
            <IconTransport v-if="icon.type === 'transport'" :class="icon.active ? 'svg-active' : ''"></IconTransport>
            <IconHotel v-if="icon.type === 'hotel'" :class="icon.active ? 'svg-active' : ''"></IconHotel>
          </div>
        </div>
        <div class="modal-line"></div>
      </div>
      <div v-if="card" class="modal-card">
        <p v-if="dataTrip === null">Rentrez une date de début et de fin pour affiner vos recherches</p>
        <div id="activitiesCard">
          <CardModal
            v-for="cardData in fixtureCard"
            :key="cardData.name"
            :data="cardData"
            v-on:viewPoint="$emit('viewPoint', $event)"
            v-on:addHistory="$emit('addHistory', $event)"
          ></CardModal>
        </div>
      </div>
      <div v-else class="no-card">
        <h3>Select a category</h3>
      </div>
      <div class="close" v-on:click="closeModal">
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
    </div>
  </transition>
  <div id="openModal" v-on:click="closeModal" v-if="reduceModal" class="reduce">
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
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import IconEvent from '@/components/Icons/IconEvent.vue';
import IconFood from '@/components/Icons/IconFood.vue';
import IconBar from '@/components/Icons/IconBar.vue';
import IconTransport from '@/components/Icons/IconTransport.vue';
import IconHotel from '@/components/Icons/IconHotel.vue';
import CardModal from '@/components/Card-Modal.vue';
import getHostels from '@/services/api/hostels';
import getBars from '@/services/api/bars';
import getRestaurants from '@/services/api/restaurants';
import getAddress from '@/services/api/address';
import getTransports from '@/services/api/transports';
import getEvents from '@/services/api/events';

export default defineComponent({
  name: 'Modal-Map',
  components: {
    CardModal,
    IconEvent,
    IconFood,
    IconBar,
    IconTransport,
    IconHotel,
  },
  props: {
    modalMap: {
      required: true,
      default: null,
    },
    openSlide: {
      type: Boolean,
      required: true,
      default: false,
    },
    dataTrip: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const icons = ref([
      {
        type: 'food',
        label: 'Restaurants',
        active: true,
      },
      {
        type: 'bar',
        label: 'Bars',
        active: false,
      },
      {
        type: 'hotel',
        label: 'Hôtels',
        active: false,
      },
      {
        type: 'transport',
        label: 'Transports',
        active: false,
      },
      {
        type: 'event',
        label: 'Évènements',
        active: false,
      },
    ]);
    const reduceModal = ref(false);
    const card = ref(false);

    const fixtureCard = ref(null);

    const callData = (elt) => {
      switch (elt.type) {
        case 'food': {
          const data = {
            radius: props.modalMap.radius,
            lat: props.modalMap.data.coordinate[1],
            long: props.modalMap.data.coordinate[0],
          };
          console.log(props);
          getRestaurants(data).then((response) => {
            fixtureCard.value = response.data;
            fixtureCard.value.forEach((restaurant) => {
              // eslint-disable-next-line no-param-reassign
              restaurant.type = 'restaurant';
              getAddress(restaurant.position.lng, restaurant.position.lat).then((rep) => {
                // eslint-disable-next-line no-param-reassign
                restaurant.address = rep.data.results[0].formatted;
              });
            });
          });
          break;
        }
        case 'bar': {
          const data = {
            radius: props.modalMap.radius,
            lat: props.modalMap.data.coordinate[1],
            long: props.modalMap.data.coordinate[0],
          };
          getBars(data).then((response) => {
            fixtureCard.value = response.data;
            fixtureCard.value.forEach((bar) => {
              // eslint-disable-next-line no-param-reassign
              bar.type = 'bar';
              getAddress(bar.position.lng, bar.position.lat).then((rep) => {
                // eslint-disable-next-line no-param-reassign
                bar.address = rep.data.results[0].formatted;
              });
            });
          });
          break;
        }
        case 'hotel': {
          const data = {
            radius: props.modalMap.radius,
            lat: props.modalMap.data.coordinate[1],
            long: props.modalMap.data.coordinate[0],
          };
          getHostels(data).then((response) => {
            fixtureCard.value = response.data;
            fixtureCard.value.forEach((hotel) => {
              // eslint-disable-next-line no-param-reassign
              hotel.type = 'hotel';
              getAddress(hotel.position.lng, hotel.position.lat).then((rep) => {
                // eslint-disable-next-line no-param-reassign
                hotel.address = rep.data.results[0].formatted;
              });
            });
          });
          break;
        }
        case 'transport': {
          const data = {
            radius: props.modalMap.radius,
            lat: props.modalMap.data.coordinate[1],
            long: props.modalMap.data.coordinate[0],
          };
          getTransports(data).then((response) => {
            fixtureCard.value = response.data;
            fixtureCard.value.forEach((transport) => {
              // eslint-disable-next-line no-param-reassign
              transport.type = 'transport';
              getAddress(transport.position.lng, transport.position.lat).then((rep) => {
                // eslint-disable-next-line no-param-reassign
                transport.address = rep.data.results[0].formatted;
              });
            });
          });
          break;
        }
        case 'event': {
          if (props.dataTrip !== null && props.dataTrip.dateStart !== null
            && props.dataTrip.dateEnd !== null) {
            const data = {
              radius: props.modalMap.radius,
              lat: props.modalMap.data.coordinate[1],
              long: props.modalMap.data.coordinate[0],
              start: props.dataTrip.dateStart,
              end: props.dataTrip.dateEnd,
            };
            getEvents(data).then((response) => {
              fixtureCard.value = response.data;
              fixtureCard.value.forEach((event) => {
                // eslint-disable-next-line no-param-reassign
                event.type = 'event';
              });
            });
          }
          break;
        }
        default: {
          console.log('error');
        }
      }
    };

    const changeSelect = (elt) => {
      icons.value.forEach((icon) => {
        // eslint-disable-next-line no-param-reassign
        icon.active = false;
        if (icon.type === elt) {
          callData(icon);
          // eslint-disable-next-line no-param-reassign
          icon.active = true;
          card.value = true;
        }
      });
    };

    const closeModal = () => {
      reduceModal.value = !reduceModal.value;
    };

    watch(() => props.modalMap, () => {
      changeSelect();
      card.value = false;
    });

    watch(() => props.openSlide, () => {
      if (props.openSlide) {
        emit('changeOpenSlide', false);
        reduceModal.value = false;
      }
    });

    return {
      icons,
      card,
      reduceModal,
      changeSelect,
      closeModal,
      fixtureCard,
    };
  },
});
</script>

<style scoped>

</style>
