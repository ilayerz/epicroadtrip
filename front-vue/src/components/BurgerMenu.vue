<template>
  <div v-on:click="modal" id="burger" class="menu-toggle-btn">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div v-show="openBurger" class="slide" id="slide">
    <div class="burger-contain">
      <div id="planning-block" class="planning-block">
        <div class="line"></div>
        <div class="block-container">
          <div class="block">
            <h3>Dates planner:</h3>
            <div class="date">
              <input name="dateStart" v-model="inputData.dateStart" type="date"/>
            </div>
            <div class="switch">
              <img :src="Switch" alt="switch" v-on:click="reverseData('date')">
            </div>
            <div class="date">
              <input name="dateEnd" v-model="inputData.dateEnd" type="date"/>
            </div>
          </div>
          <div class="block-infos">
            <h3>Open Infos</h3>
            <Slider
              v-model="radius"
              v-bind="sliderValue"
            />
            <div v-if="originMap !== null" class="infos">
              <h4>{{originMap.origin.label}}</h4>
              <div class="infos-svg" v-on:click="openModalInfos(originMap.origin)">
                <svg width="15" height="9" viewBox="0 0 15 9">
                  <path d="M9.30763 7.41388C9.30763 7.12145 9.41882 6.82901 9.64271 6.60665L10.8444 5.40494L1.14243 5.40494C0.511878 5.40494 0.000125929 4.89319 0.000125936 4.26263C0.000125944 3.63208 0.511878 3.12033 1.14243 3.12033L10.8444 3.12033L9.67317 1.9491C9.4508 1.72671 9.33809 1.4343 9.33809 1.14187C9.33809 0.849438 9.44928 0.557007 9.67317 0.334638C10.1194 -0.111623 10.8429 -0.111623 11.2892 0.334638C11.3714 0.416868 11.4552 0.500638 11.5374 0.582899C11.74 0.785468 11.9441 0.986515 12.1451 1.19061C12.4056 1.45256 12.666 1.71302 12.928 1.97345C13.1869 2.22933 13.4382 2.49434 13.7002 2.7487C13.953 2.99544 14.2013 3.24522 14.4389 3.5087C14.6856 3.78285 14.8075 4.14077 14.7206 4.50936C14.6993 4.60379 14.6628 4.70431 14.6155 4.7896C14.4724 5.04396 14.2363 5.24652 14.0322 5.45214C13.7839 5.70345 13.5311 5.95019 13.2798 6.19997C12.9813 6.49697 12.6843 6.79702 12.3873 7.09554C12.1345 7.34532 11.8816 7.59815 11.6288 7.84946C11.507 7.97131 11.3866 8.09315 11.2648 8.215C11.2633 8.21652 11.2602 8.21957 11.2587 8.22109C10.8124 8.66735 10.089 8.66735 9.64271 8.22109C9.41882 7.99874 9.30763 7.70631 9.30763 7.41388Z" fill="black"/>
                </svg>
              </div>
            </div>
            <div v-if="destinationMap !== null" class="infos">
              <h4>{{destinationMap.destination.label}}</h4>
              <div class="infos-svg" v-on:click="openModalInfos(destinationMap.destination)">
                <svg width="15" height="9" viewBox="0 0 15 9">
                  <path d="M9.30763 7.41388C9.30763 7.12145 9.41882 6.82901 9.64271 6.60665L10.8444 5.40494L1.14243 5.40494C0.511878 5.40494 0.000125929 4.89319 0.000125936 4.26263C0.000125944 3.63208 0.511878 3.12033 1.14243 3.12033L10.8444 3.12033L9.67317 1.9491C9.4508 1.72671 9.33809 1.4343 9.33809 1.14187C9.33809 0.849438 9.44928 0.557007 9.67317 0.334638C10.1194 -0.111623 10.8429 -0.111623 11.2892 0.334638C11.3714 0.416868 11.4552 0.500638 11.5374 0.582899C11.74 0.785468 11.9441 0.986515 12.1451 1.19061C12.4056 1.45256 12.666 1.71302 12.928 1.97345C13.1869 2.22933 13.4382 2.49434 13.7002 2.7487C13.953 2.99544 14.2013 3.24522 14.4389 3.5087C14.6856 3.78285 14.8075 4.14077 14.7206 4.50936C14.6993 4.60379 14.6628 4.70431 14.6155 4.7896C14.4724 5.04396 14.2363 5.24652 14.0322 5.45214C13.7839 5.70345 13.5311 5.95019 13.2798 6.19997C12.9813 6.49697 12.6843 6.79702 12.3873 7.09554C12.1345 7.34532 11.8816 7.59815 11.6288 7.84946C11.507 7.97131 11.3866 8.09315 11.2648 8.215C11.2633 8.21652 11.2602 8.21957 11.2587 8.22109C10.8124 8.66735 10.089 8.66735 9.64271 8.22109C9.41882 7.99874 9.30763 7.70631 9.30763 7.41388Z" fill="black"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div id="addHistory" v-if="addHistory !== null">
          <div class="history" v-for="(history, index) in addHistory" :key="history.name">
            <div class="history-icon">
              <IconFood v-if="history.data.type === 'restaurant'" class="svg-active"></IconFood>
              <IconEvent v-if="history.data.type === 'event'" class="svg-active"></IconEvent>
              <IconBar v-if="history.data.type === 'bar'" class="svg-active"></IconBar>
              <IconTransport v-if="history.data.type === 'transport'" class="svg-active"></IconTransport>
              <IconHotel v-if="history.data.type === 'hotel'" class="svg-active"></IconHotel>
            </div>
            <div class="history-card">
              <p>{{history.data.name}}</p>
              <p v-if="history.data.type !== 'event'">{{history.data.address}}</p>
              <p v-else>{{history.data.venues[0].address.line1}}</p>
              <div v-on:click="$emit('removeHistory', index)" id="mdiv">
                <div class="mdiv">
                  <div class="md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Switch from '@/assets/svg/switch.svg';
import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';
import IconEvent from '@/components/Icons/IconEvent.vue';
import IconFood from '@/components/Icons/IconFood.vue';
import IconBar from '@/components/Icons/IconBar.vue';
import IconTransport from '@/components/Icons/IconTransport.vue';
import IconHotel from '@/components/Icons/IconHotel.vue';

export default defineComponent({
  name: 'BurgerMenu',
  components: {
    Slider,
    IconEvent,
    IconFood,
    IconBar,
    IconTransport,
    IconHotel,
  },
  props: {
    inputDataParent: {
      required: true,
    },
    originMap: {
      type: Object,
      default: null,
      required: true,
    },
    destinationMap: {
      type: Object,
      default: null,
      required: true,
    },
    addHistory: {
      type: Array,
      default: null,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openBurger = ref(false);
    const inputData = ref(props.inputDataParent);
    const radius = ref(0);
    const sliderValue = {
      value: 500,
      min: 500,
      max: 10000,
    };

    const modal = () => {
      if (openBurger.value) {
        document.getElementById('burger').className = 'menu-toggle-btn';
        document.getElementById('planning-block').style.display = 'none';
        document.getElementById('addHistory').style.opacity = '0';
        document.getElementById('slide').className = 'slideOut';
        setTimeout(() => {
          document.getElementById('slide').className = 'slide';
          openBurger.value = false;
        }, 1000);
      } else {
        document.getElementById('burger').className = 'menu-toggle-btn open';
        openBurger.value = true;
        setTimeout(() => {
          document.getElementById('addHistory').style.opacity = '1';
          document.getElementById('planning-block').style.display = 'flex';
        }, 500);
      }
    };

    const reverseData = (data) => {
      const save = inputData.value[`${data}Start`];
      inputData.value[`${data}Start`] = inputData.value[`${data}End`];
      inputData.value[`${data}End`] = save;
    };

    const openModalInfos = (data) => {
      const infos = {
        data,
        radius: radius.value,
      };
      modal();
      emit('modalMap', infos);
    };

    return {
      reverseData,
      inputData,
      openBurger,
      radius,
      sliderValue,
      openModalInfos,
      modal,
      Switch,
    };
  },
});
</script>
