<template>
  <div class="card-modal">
    <div v-if="data.type !== 'event'" class="card-left">
      <span>{{data.name}}</span>
      <div class="card-star-container">
        <div class="card-star" v-for="svg in 10" :key="svg" >
          <svg class="star-mid" v-if="midStar(svg)" width="10" height="18" viewBox="0 0 10 18">
            <path d="M2.63288 6.56434L0.5 0V13.1287L6.08396 17.1857L3.95108 10.6213L9.53504 6.56434H2.63288Z" fill="#C4C4C4"/>
          </svg>
          <svg width="19" height="18" viewBox="0 0 19 18">
            <path :class="rating(svg) ? 'checked' : ''" d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z" fill="#C4C4C4"/>
          </svg>
        </div>
      </div>
      <h4>{{data.rate}} / 10</h4>
    </div>
    <div v-if="data.type !== 'event'" class="card-right">
      <div class="card-line"></div>
      <div class="card-right-text">
        <span>{{data.address}}</span>
        <div v-on:click="viewPoint" class="btn-card">
          <h4>View</h4>
        </div>
        <div v-on:click="addHistory" class="btn-card">
          <h4>Add</h4>
        </div>
      </div>
    </div>
    <div v-if="data.type === 'event'" class="card-left">
      <span>{{data.name}}</span>
      <div class="date-start">
        <h3>Date: </h3>
        <span>{{data.dates.start.localDate}}</span>
      </div>
    </div>
    <div v-if="data.type === 'event'" class="card-right">
      <div class="card-line"></div>
      <div class="card-right-text">
        <span>{{data.venues[0].address.line1}}</span>
        <div v-on:click="viewPoint" class="btn-card">
          <h4>View</h4>
        </div>
        <div v-on:click="addHistory" class="btn-card">
          <h4>Add</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card-Modal',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    // eslint-disable-next-line consistent-return
    const rating = (svg) => {
      if ((props.data.rate) >= svg) {
        return true;
      }
    };
    const midStar = (svg) => (parseInt(props.data.rate.toString()[0], 10)) === svg && (props.data.rate) % 1 !== 0;
    const viewPoint = () => {
      emit('viewPoint', props.data);
    };
    const addHistory = () => {
      emit('addHistory', props.data);
    };
    return {
      rating,
      midStar,
      viewPoint,
      addHistory,
    };
  },
});
</script>

<style scoped>

</style>
