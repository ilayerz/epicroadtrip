<template>
  <div class="map-side">
    <ModalMap
      v-if="modalMap !== null"
      :modal-map="modalMap"
      :dataTrip="dataTrip"
      v-on:viewPoint="viewPoint"
      v-on:addHistory="$emit('addHistory', $event)"
      :openSlide="openSlide"
      v-on:changeOpenSlide="$emit('changeOpenSlide', false)"
    ></ModalMap>
    <div id="map"></div>
    <div id="openModalPrint" v-on:click="modalPrintFunction" class="modal-print">
      <svg width="38" height="35" viewBox="0 0 38 35">
        <path
          d="M34.6794 8.81063H30.5432V2.0574C30.5432 1.44066 30.0433 0.940918 29.4268 0.940918H8.21522C7.59863 0.940918 7.09874 1.44066 7.09874 2.0574V8.81063H2.96255C1.52616 8.81063 0.357422 9.97921 0.357422 11.4158V25.7402C0.357422 27.1766 1.52616 28.3454 2.96255 28.3454H7.09874V33.8835C7.09874 34.5003 7.59863 35 8.21522 35H29.4266C30.0432 35 30.5431 34.5003 30.5431 33.8835V28.3454H34.6793C36.1157 28.3454 37.2844 27.1766 37.2844 25.7402V11.4158C37.2846 9.97936 36.1158 8.81063 34.6794 8.81063ZM9.33171 3.17388H28.3101V8.81063H9.33171V3.17388ZM28.3101 32.7671H9.33171V21.691H28.3101V32.7671ZM35.0516 25.7402C35.0516 25.9419 34.8811 26.1124 34.6794 26.1124H30.5432V20.5745C30.5432 19.9577 30.0433 19.458 29.4268 19.458H8.21522C7.59863 19.458 7.09874 19.9577 7.09874 20.5745V26.1124H2.96255C2.76084 26.1124 2.59039 25.9419 2.59039 25.7402V11.4158C2.59039 11.2139 2.76084 11.0436 2.96255 11.0436H8.21522H29.4266H34.6793C34.881 11.0436 35.0514 11.2139 35.0514 11.4158V25.7402H35.0516Z"
          fill="black"/>
        <path
          d="M29.426 16.8388C30.303 16.8388 31.0141 16.1278 31.0141 15.2507C31.0141 14.3736 30.303 13.6626 29.426 13.6626C28.5489 13.6626 27.8379 14.3736 27.8379 15.2507C27.8379 16.1278 28.5489 16.8388 29.426 16.8388Z"
          fill="black"/>
        <path
          d="M23.9006 23.894H13.7415C13.1249 23.894 12.625 24.3938 12.625 25.0105C12.625 25.6273 13.1249 26.127 13.7415 26.127H23.9006C24.5172 26.127 25.0171 25.6273 25.0171 25.0105C25.0171 24.3939 24.5173 23.894 23.9006 23.894Z"
          fill="black"/>
        <path
          d="M23.9006 28.3303H13.7415C13.1249 28.3303 12.625 28.8301 12.625 29.4468C12.625 30.0635 13.1249 30.5633 13.7415 30.5633H23.9006C24.5172 30.5633 25.0171 30.0635 25.0171 29.4468C25.0171 28.8301 24.5173 28.3303 23.9006 28.3303Z"
          fill="black"/>
      </svg>
    </div>
    <div class="colapse-itinerary" v-on:click="showDestination">
      <div class="arrow"><span></span><span></span></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, defineComponent } from 'vue';
import getDetails from '@/services/api/detail';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import ModalMap from '@/components/Modal-Map.vue';
import axios from 'axios';

export default defineComponent({
  name: 'Map-Side',
  components: {
    ModalMap,
  },
  props: {
    modalMap: {
      required: true,
      default: null,
    },
    modalPrint: {
      type: Boolean,
      required: true,
    },
    openSlide: {
      type: Boolean,
      required: true,
    },
    dataTrip: {
      required: true,
    },
    saveData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const screenShot = ref(null);
    const modalPrintFunction = () => {
      emit('openModalPrint', true);
    };
    const accessToken = 'pk.eyJ1IjoiZGFtc3RyeSIsImEiOiJja3FsMWxuMDEwbWx0MnFwaHZyaXRsbXd3In0.PX7PDMjMMfDJE8q3MkuOAg';
    const directions = new MapboxDirections({
      accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: 'true',
      geometries: 'geojson',
    });
    const map = ref(null);
    const origin = ref(null);
    const destination = ref(null);
    onMounted(() => {
      map.value = new mapboxgl.Map({
        accessToken,
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [2, 46], // starting position
        zoom: 5.5, // starting zoom
        preserveDrawingBuffer: true,
      });
      map.value.scrollZoom.enable();
      map.value.addControl(directions, 'top-right');
      map.value.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          map.value.addImage('custom-marker', image);
        },
      );
      if (props.saveData !== null) {
        map.value.on('load', () => {
          directions.setOrigin([props.saveData.origin.coordinate[0], props.saveData.origin.coordinate[1]]); // can be address in form setOrigin("12, Elm Street, NY")
          directions.setDestination([props.saveData.destination.coordinate[0], props.saveData.destination.coordinate[1]]); // can be address
          setTimeout(() => {
            screenShot.value = map.value.getCanvas().toDataURL();
            emit('img', screenShot.value);
          }, 5000);
        });
      }
    });
    // TODO add real img map
    directions.on('destination', async (e) => {
      destination.value = {
        coordinate: e.feature.geometry.coordinates,
        label: document.getElementsByClassName('mapbox-directions-destination')[0].children[1].children[0].children[1].value,
      };
      emit('destinationMap', { destination: destination.value });
    });
    directions.on('origin', async (e) => {
      origin.value = {
        coordinate: e.feature.geometry.coordinates,
        label: document.getElementsByClassName('mapbox-directions-origin')[0].children[1].children[0].children[1].value,
      };
      emit('originMap', { origin: origin.value });
    });
    directions.on('route', async (e) => {
      const { steps } = e.route[0].legs[0];
      setTimeout(() => {
        screenShot.value = map.value.getCanvas().toDataURL();
        emit('img', screenShot.value);
      }, 5000);
      emit('steps', steps);
    });
    let popUp = null;
    const viewPoint = async (data) => {
      let detail = null;
      if (popUp !== null) {
        popUp.remove();
      }
      if (data.type !== 'event') {
        await getDetails(data.xid).then((response) => {
          detail = response.data;
        });
      }
      let description = null;
      if (detail !== null && 'preview' in detail) {
        description = `
        <div class="popUp-map">
            <div class="popUp-img">
                <img src="${detail.preview.source}">
            </div>
            <div class="popUp-text">
              <span class="title">${data.name}</span>
              <span class="address">${data.address}</span>
              <a style="display: ${detail.url ? 'flex' : 'none'}" href="${detail.url}" target="_blank">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#05B98C"/>
                  <path d="M19.9669 9.29903C19.8633 7.80547 19.4383 6.38953 18.7039 5.09032L18.6067 4.91821H7.37693C5.92775 4.91821 4.74902 6.09714 4.74902 7.54632V9.6612H19.9922L19.9669 9.29903ZM5.42652 8.9836V7.54632C5.42652 6.47072 6.30143 5.59581 7.37693 5.59581H18.2092C18.778 6.65245 19.1303 7.78979 19.2591 8.9836H5.42652Z" fill="#EAF7F3"/>
                  <path d="M7.28929 6.27319C6.63541 6.27319 6.10352 6.80529 6.10352 7.45897C6.10352 8.11264 6.63541 8.64474 7.28929 8.64474C7.94316 8.64474 8.47506 8.11264 8.47506 7.45897C8.47506 6.80529 7.94316 6.27319 7.28929 6.27319ZM7.28929 7.96714C7.0091 7.96714 6.78111 7.73916 6.78111 7.45897C6.78111 7.17877 7.0091 6.95079 7.28929 6.95079C7.56948 6.95079 7.79746 7.17877 7.79746 7.45897C7.79746 7.73916 7.56948 7.96714 7.28929 7.96714Z" fill="#EAF7F3"/>
                  <path d="M10.0002 6.27319C9.34635 6.27319 8.81445 6.80529 8.81445 7.45897C8.81445 8.11264 9.34635 8.64474 10.0002 8.64474C10.6541 8.64474 11.186 8.11264 11.186 7.45897C11.186 6.80529 10.6541 6.27319 10.0002 6.27319ZM10.0002 7.96714C9.72003 7.96714 9.49205 7.73916 9.49205 7.45897C9.49205 7.17877 9.72003 6.95079 10.0002 6.95079C10.2804 6.95079 10.5084 7.17877 10.5084 7.45897C10.5084 7.73916 10.2804 7.96714 10.0002 7.96714Z" fill="#EAF7F3"/>
                  <path d="M12.7101 6.26758C12.053 6.26758 11.5186 6.80205 11.5186 7.4591C11.5186 8.11616 12.053 8.65063 12.7101 8.65063C13.3671 8.65063 13.9016 8.11616 13.9016 7.4591C13.9015 6.80205 13.3671 6.26758 12.7101 6.26758ZM12.7101 7.96152C12.4332 7.96152 12.2077 7.73622 12.2077 7.4591C12.2077 7.18199 12.4332 6.95669 12.7101 6.95669C12.987 6.95669 13.2125 7.18199 13.2125 7.4591C13.2125 7.73622 12.987 7.96152 12.7101 7.96152Z" fill="#EAF7F3"/>
                  <path d="M19.9671 9.29887L19.9453 8.98364H4.74902V18.5047L4.91517 18.6032C6.4514 19.5132 8.20966 19.994 10.0001 19.994C15.5109 19.994 19.9941 15.5106 19.9941 9.99999C19.9942 9.78838 19.9856 9.56546 19.9671 9.29887ZM10.0002 19.3165C8.39537 19.3165 6.81834 18.9022 5.42662 18.1164V9.66124H19.3093C19.3141 9.78134 19.3167 9.8925 19.3167 9.99999C19.3167 15.1371 15.1373 19.3165 10.0002 19.3165Z" fill="#EAF7F3"/>
                  <path d="M9.83043 11.0164C8.52277 11.0164 7.45898 12.0801 7.45898 13.3878C7.45898 14.6955 8.52277 15.7592 9.83043 15.7592C11.1381 15.7592 12.2019 14.6955 12.2019 13.3878C12.2019 12.0801 11.1382 11.0164 9.83043 11.0164ZM9.83043 15.0817C8.89636 15.0817 8.13648 14.3219 8.13648 13.3878C8.13648 12.4537 8.89636 11.6939 9.83043 11.6939C10.7645 11.6939 11.5244 12.4537 11.5244 13.3878C11.5244 14.3219 10.7645 15.0817 9.83043 15.0817Z" fill="#EAF7F3"/>
                  <path d="M13.7969 16.8751L11.5948 14.673C11.4627 14.5407 11.2479 14.5407 11.1158 14.673C10.9835 14.8053 10.9835 15.0197 11.1158 15.152L13.3179 17.3541C13.384 17.4203 13.4707 17.4533 13.5574 17.4533C13.6442 17.4533 13.7309 17.4203 13.7969 17.3541C13.9292 17.2218 13.9292 17.0074 13.7969 16.8751Z" fill="#EAF7F3"/>
                </svg>
              </a>
            </div>
        </div>
      `;
      } else {
        description = `
        <div class="popUp-map">
            <div class="popUp-img">
                <img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="">
            </div>
            <div class="popUp-text">
              <span class="title">${data.name}</span>
               <span class="address">${data.address ? data.address : data.venues[0].address.line1}</span>
              <a style="display: ${data.url ? 'flex' : 'none'}" href="${data.url}" target="_blank">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#05B98C"/>
                  <path d="M19.9669 9.29903C19.8633 7.80547 19.4383 6.38953 18.7039 5.09032L18.6067 4.91821H7.37693C5.92775 4.91821 4.74902 6.09714 4.74902 7.54632V9.6612H19.9922L19.9669 9.29903ZM5.42652 8.9836V7.54632C5.42652 6.47072 6.30143 5.59581 7.37693 5.59581H18.2092C18.778 6.65245 19.1303 7.78979 19.2591 8.9836H5.42652Z" fill="#EAF7F3"/>
                  <path d="M7.28929 6.27319C6.63541 6.27319 6.10352 6.80529 6.10352 7.45897C6.10352 8.11264 6.63541 8.64474 7.28929 8.64474C7.94316 8.64474 8.47506 8.11264 8.47506 7.45897C8.47506 6.80529 7.94316 6.27319 7.28929 6.27319ZM7.28929 7.96714C7.0091 7.96714 6.78111 7.73916 6.78111 7.45897C6.78111 7.17877 7.0091 6.95079 7.28929 6.95079C7.56948 6.95079 7.79746 7.17877 7.79746 7.45897C7.79746 7.73916 7.56948 7.96714 7.28929 7.96714Z" fill="#EAF7F3"/>
                  <path d="M10.0002 6.27319C9.34635 6.27319 8.81445 6.80529 8.81445 7.45897C8.81445 8.11264 9.34635 8.64474 10.0002 8.64474C10.6541 8.64474 11.186 8.11264 11.186 7.45897C11.186 6.80529 10.6541 6.27319 10.0002 6.27319ZM10.0002 7.96714C9.72003 7.96714 9.49205 7.73916 9.49205 7.45897C9.49205 7.17877 9.72003 6.95079 10.0002 6.95079C10.2804 6.95079 10.5084 7.17877 10.5084 7.45897C10.5084 7.73916 10.2804 7.96714 10.0002 7.96714Z" fill="#EAF7F3"/>
                  <path d="M12.7101 6.26758C12.053 6.26758 11.5186 6.80205 11.5186 7.4591C11.5186 8.11616 12.053 8.65063 12.7101 8.65063C13.3671 8.65063 13.9016 8.11616 13.9016 7.4591C13.9015 6.80205 13.3671 6.26758 12.7101 6.26758ZM12.7101 7.96152C12.4332 7.96152 12.2077 7.73622 12.2077 7.4591C12.2077 7.18199 12.4332 6.95669 12.7101 6.95669C12.987 6.95669 13.2125 7.18199 13.2125 7.4591C13.2125 7.73622 12.987 7.96152 12.7101 7.96152Z" fill="#EAF7F3"/>
                  <path d="M19.9671 9.29887L19.9453 8.98364H4.74902V18.5047L4.91517 18.6032C6.4514 19.5132 8.20966 19.994 10.0001 19.994C15.5109 19.994 19.9941 15.5106 19.9941 9.99999C19.9942 9.78838 19.9856 9.56546 19.9671 9.29887ZM10.0002 19.3165C8.39537 19.3165 6.81834 18.9022 5.42662 18.1164V9.66124H19.3093C19.3141 9.78134 19.3167 9.8925 19.3167 9.99999C19.3167 15.1371 15.1373 19.3165 10.0002 19.3165Z" fill="#EAF7F3"/>
                  <path d="M9.83043 11.0164C8.52277 11.0164 7.45898 12.0801 7.45898 13.3878C7.45898 14.6955 8.52277 15.7592 9.83043 15.7592C11.1381 15.7592 12.2019 14.6955 12.2019 13.3878C12.2019 12.0801 11.1382 11.0164 9.83043 11.0164ZM9.83043 15.0817C8.89636 15.0817 8.13648 14.3219 8.13648 13.3878C8.13648 12.4537 8.89636 11.6939 9.83043 11.6939C10.7645 11.6939 11.5244 12.4537 11.5244 13.3878C11.5244 14.3219 10.7645 15.0817 9.83043 15.0817Z" fill="#EAF7F3"/>
                  <path d="M13.7969 16.8751L11.5948 14.673C11.4627 14.5407 11.2479 14.5407 11.1158 14.673C10.9835 14.8053 10.9835 15.0197 11.1158 15.152L13.3179 17.3541C13.384 17.4203 13.4707 17.4533 13.5574 17.4533C13.6442 17.4533 13.7309 17.4203 13.7969 17.3541C13.9292 17.2218 13.9292 17.0074 13.7969 16.8751Z" fill="#EAF7F3"/>
                </svg>
              </a>
            </div>
        </div>
      `;
      }
      if (data.type !== 'event') {
        popUp = new mapboxgl.Popup({ closeOnClick: false }, data)
          .setLngLat([data.position.lat, data.position.lng])
          .setHTML(description);
      } else {
        popUp = new mapboxgl.Popup({ closeOnClick: false }, data)
          .setLngLat([data.venues[0].location.longitude, data.venues[0].location.latitude])
          .setHTML(description);
      }
      popUp.addTo(map.value);
      const arrow = document.getElementsByClassName('mapboxgl-popup-tip')[0];
      arrow.style.position = 'relative';
      arrow.innerHTML += '<div class="dot-img"></div>';
      if (data.type !== 'event') {
        map.value.flyTo({
          center: [data.position.lat - 0.03, data.position.lng],
          zoom: 12,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      } else {
        map.value.flyTo({
          center: [data.venues[0].location.longitude, data.venues[0].location.latitude],
          zoom: 12,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      }
    };

    const showDestination = () => {
      const tool = document.getElementsByClassName('mapboxgl-ctrl-top-right')[0];
      const cross = document.getElementsByClassName('colapse-itinerary')[0];
      if (tool.className === 'mapboxgl-ctrl-top-right mapBoxOut') {
        tool.className = 'mapboxgl-ctrl-top-right mapBoxIn';
        cross.className = 'colapse-itinerary fade-colapse-out';
      } else {
        tool.className = 'mapboxgl-ctrl-top-right mapBoxOut';
        cross.className = 'colapse-itinerary fade-colapse';
      }
    };
    return {
      map,
      modalPrintFunction,
      viewPoint,
      showDestination,
    };
  },
});
</script>
