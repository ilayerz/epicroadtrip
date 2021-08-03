<template>
  <div class="tutorial-modal">
    <div v-if="step === 0" class="case-0">
      <div class="square"></div>
      <Arrow></Arrow>
      <div class="card">
        <h3>Define your dates for your trip !</h3>
        <div v-on:click="step += 1" class="card-btn">
          <h4>Next step</h4>
        </div>
      </div>
    </div>
    <div v-if="step === 1" class="case-1">
      <div class="square"></div>
      <Arrow></Arrow>
      <div class="card">
        <h3>Define your radius for points A or B !</h3>
        <div v-on:click="step += 1" class="card-btn">
          <h4>Next step</h4>
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="case-2">
      <div class="card">
        <h3>Define your road trip (point A and point B) !</h3>
        <div v-on:click="step += 1" class="card-btn">
          <h4>Next step</h4>
        </div>
      </div>
      <Arrow></Arrow>
      <div class="square"></div>
    </div>
    <div v-if="step === 3" class="case-3">
      <div class="square">
        <div class="infos">
          <h4>Paris, France</h4>
          <div class="infos-svg">
            <svg width="15" height="9" viewBox="0 0 15 9">
              <path d="M9.30763 7.41388C9.30763 7.12145 9.41882 6.82901 9.64271 6.60665L10.8444 5.40494L1.14243 5.40494C0.511878 5.40494 0.000125929 4.89319 0.000125936 4.26263C0.000125944 3.63208 0.511878 3.12033 1.14243 3.12033L10.8444 3.12033L9.67317 1.9491C9.4508 1.72671 9.33809 1.4343 9.33809 1.14187C9.33809 0.849438 9.44928 0.557007 9.67317 0.334638C10.1194 -0.111623 10.8429 -0.111623 11.2892 0.334638C11.3714 0.416868 11.4552 0.500638 11.5374 0.582899C11.74 0.785468 11.9441 0.986515 12.1451 1.19061C12.4056 1.45256 12.666 1.71302 12.928 1.97345C13.1869 2.22933 13.4382 2.49434 13.7002 2.7487C13.953 2.99544 14.2013 3.24522 14.4389 3.5087C14.6856 3.78285 14.8075 4.14077 14.7206 4.50936C14.6993 4.60379 14.6628 4.70431 14.6155 4.7896C14.4724 5.04396 14.2363 5.24652 14.0322 5.45214C13.7839 5.70345 13.5311 5.95019 13.2798 6.19997C12.9813 6.49697 12.6843 6.79702 12.3873 7.09554C12.1345 7.34532 11.8816 7.59815 11.6288 7.84946C11.507 7.97131 11.3866 8.09315 11.2648 8.215C11.2633 8.21652 11.2602 8.21957 11.2587 8.22109C10.8124 8.66735 10.089 8.66735 9.64271 8.22109C9.41882 7.99874 9.30763 7.70631 9.30763 7.41388Z" fill="black"/>
            </svg>
          </div>
        </div>
        <div class="infos">
          <h4>Montpellier, France</h4>
          <div class="infos-svg">
            <svg width="15" height="9" viewBox="0 0 15 9">
              <path d="M9.30763 7.41388C9.30763 7.12145 9.41882 6.82901 9.64271 6.60665L10.8444 5.40494L1.14243 5.40494C0.511878 5.40494 0.000125929 4.89319 0.000125936 4.26263C0.000125944 3.63208 0.511878 3.12033 1.14243 3.12033L10.8444 3.12033L9.67317 1.9491C9.4508 1.72671 9.33809 1.4343 9.33809 1.14187C9.33809 0.849438 9.44928 0.557007 9.67317 0.334638C10.1194 -0.111623 10.8429 -0.111623 11.2892 0.334638C11.3714 0.416868 11.4552 0.500638 11.5374 0.582899C11.74 0.785468 11.9441 0.986515 12.1451 1.19061C12.4056 1.45256 12.666 1.71302 12.928 1.97345C13.1869 2.22933 13.4382 2.49434 13.7002 2.7487C13.953 2.99544 14.2013 3.24522 14.4389 3.5087C14.6856 3.78285 14.8075 4.14077 14.7206 4.50936C14.6993 4.60379 14.6628 4.70431 14.6155 4.7896C14.4724 5.04396 14.2363 5.24652 14.0322 5.45214C13.7839 5.70345 13.5311 5.95019 13.2798 6.19997C12.9813 6.49697 12.6843 6.79702 12.3873 7.09554C12.1345 7.34532 11.8816 7.59815 11.6288 7.84946C11.507 7.97131 11.3866 8.09315 11.2648 8.215C11.2633 8.21652 11.2602 8.21957 11.2587 8.22109C10.8124 8.66735 10.089 8.66735 9.64271 8.22109C9.41882 7.99874 9.30763 7.70631 9.30763 7.41388Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      <Arrow></Arrow>
      <div class="card">
        <h3>Choice a point for event with arrow !</h3>
        <div v-on:click="step += 1" class="card-btn">
          <h4>Next step</h4>
        </div>
      </div>
    </div>
    <div v-if="step === 4" class="case-4">
      <div class="square">
        <transition name="slide-fade">
          <div
            id="modalMap"
            class="modal-map"
          >
            <div class="modal-top">
              <div class="modal-title">
                <div
                  v-for="icon in icons"
                  :key="icon"
                  :class="icon.active ? 'modal-icon-active' : 'modal-icon'"
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
            <div class="no-card">
              <h3>Select a category</h3>
            </div>
            <div class="close">
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
      </div>
      <Arrow class="svg"></Arrow>
      <div class="card">
        <h3>Select a category and view or add your element !</h3>
        <div v-on:click="step += 1" class="card-btn">
          <h4>Next step</h4>
        </div>
      </div>
    </div>
    <div v-if="step === 5" class="case-5">
      <div class="card">
        <h3>Print your road trip and view your resume !</h3>
        <div v-on:click="$emit('finish')" class="card-btn">
          <h4>Finish</h4>
        </div>
      </div>
      <Arrow></Arrow>
      <div class="square"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Arrow from '@/components/Icons/Arrow.vue';
import IconEvent from '@/components/Icons/IconEvent.vue';
import IconFood from '@/components/Icons/IconFood.vue';
import IconBar from '@/components/Icons/IconBar.vue';
import IconTransport from '@/components/Icons/IconTransport.vue';
import IconHotel from '@/components/Icons/IconHotel.vue';

export default {
  name: 'Tutorial',
  components: {
    Arrow,
    IconEvent,
    IconFood,
    IconBar,
    IconTransport,
    IconHotel,
  },
  setup() {
    const tutorial = ref(false);
    const step = ref(0);
    const icons = ref([
      {
        type: 'food',
        label: 'Restaurants',
        active: false,
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
    return {
      tutorial,
      step,
      icons,
    };
  },
};
</script>

<style scoped>

</style>
