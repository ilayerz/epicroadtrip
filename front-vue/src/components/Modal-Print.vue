<template>
  <div v-if="open" class="modal-main">
    <div id="modalCanvas" class="modal">
      <div id="closePrint" v-on:click="$emit('close', false)" class="modal-cross">
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 23L12.5 12.5M23 2L12.5 12.5M2 2L12.5 12.5M12.5 12.5L23 23" stroke="black" stroke-width="3"
                stroke-linecap="round"/>
        </svg>
      </div>
      <div class="modal-container">
        <h1>Print your road</h1>
        <div id="modalDetail" class="modal-detail">
          <div class="modal-date">
            <h3 class="title">Dates:</h3>
            <h3 class="no-date" v-if="dateTrip === null"> Vous n'avez pas défini de dates</h3>
            <h3 v-if="dateTrip !== null && dateTrip.dateStart">{{ dateTrip.dateStart }}</h3>
            <h3 v-if="dateTrip !== null && dateTrip.dateStart && dateTrip.dateEnd"> à </h3>
            <h3 v-if="dateTrip !== null && dateTrip.dateEnd">{{ dateTrip.dateEnd }}</h3>
          </div>
          <div class="modal-trip">
            <h3 class="title">Trip:</h3>
            <h3 class="no-trip" v-if="originMap === null && destinationMap === null"> Vous n'avez pas défini de trajet</h3>
            <h3 v-if="originMap !== null">{{ originMap.origin.label }}</h3>
            <h3 v-if="originMap !== null && destinationMap !== null"> à </h3>
            <h3 v-if="destinationMap !== null">{{ destinationMap.destination.label }}</h3>
          </div>
        </div>

        <div id="activitiesDetail">
          <h2 class="recap" v-if="addHistory.length > 0">Récapitulatif des éléments ajoutés</h2>
          <div class="line" v-if="addHistory.length > 0"></div>
          <div class="addHistory" v-if="addHistory.length > 0">
            <div class="history" v-for="(history) in addHistory" :key="history.name">
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
              </div>
            </div>
          </div>
        </div>

        <div id="roadDetail">
          <h2 class="recap" v-if="steps !== null">Récapitulatif du trajet</h2>
          <div class="line" v-if="steps !== null"></div>
          <ul v-if="steps !== null">
            <li v-for="(step, index) in steps" :key="step">{{ index + 1 }}: {{ step.maneuver.instruction }}</li>
          </ul>
        </div>

        <div id="mapDetail">
          <h2 class="recap" v-if="img !== null">Road Map</h2>
          <div class="line" v-if="img !== null"></div>
          <img v-if="img !== null" :src="img" alt="">
        </div>
      </div>
      <div v-on:click="generatePDF" class="print">
        <h3>Print</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import IconFood from '@/components/Icons/IconFood.vue';
import IconEvent from '@/components/Icons/IconEvent.vue';
import IconBar from '@/components/Icons/IconBar.vue';
import IconTransport from '@/components/Icons/IconTransport.vue';
import IconHotel from '@/components/Icons/IconHotel.vue';

export default defineComponent({
  name: 'Modal-Print',
  components: {
    IconHotel,
    IconTransport,
    IconBar,
    IconEvent,
    IconFood,
  },
  props: {
    open: {
      required: true,
      default: false,
      type: Boolean,
    },
    addHistory: {
      required: true,
      default: null,
      type: Array,
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
    img: {
      type: String,
      default: null,
      required: false,
    },
    steps: {
      type: Array,
      default: null,
      required: false,
    },
    dateTrip: {
      type: Object,
      default: null,
      required: false,
    },
  },
  setup(props) {
    const modal = computed(() => props.open);

    const date = () => {
      if (props.dateTrip === null) {
        return 'Vous n\'avez pas défini de dates';
      }
      if (props.dateTrip.dateStart && props.dateTrip.dateEnd) {
        return `${props.dateTrip.dateStart} à ${props.dateTrip.dateEnd}`;
      }
      if (props.dateTrip.dateStart && !props.dateTrip.dateEnd) {
        return props.dateTrip.dateStart;
      }
      return props.dateTrip.dateEnd;
    };

    const trip = () => {
      if (props.originMap === null && props.destinationMap === null) {
        return 'Vous n\'avez pas défini de trajet';
      }
      if (props.originMap !== null && props.destinationMap !== null) {
        return `${props.originMap.origin.label} à ${props.destinationMap.destination.label}`;
      }
      if (props.originMap !== null && !props.destinationMap) {
        return props.originMap.origin.label;
      }
      return props.destinationMap.destination.label;
    };

    const elementAdd = () => {
      const data = [];
      if (props.addHistory !== null) {
        props.addHistory.forEach((history) => {
          data.push({
            text: [
              {
                text: `${history.data.type.toUpperCase()}: `,
                style: {
                  alignment: 'left',
                  fontSize: 12,
                  color: '#333435',
                  bold: true,
                },
              },
              {
                text: `${history.data.name} - `,
                style: {
                  alignment: 'left',
                  fontSize: 12,
                  color: '#333435',
                  bold: false,
                },
              },
              {
                text: history.data.address ? history.data.address : history.data.venues[0].address.line1,
                style: {
                  alignment: 'left',
                  fontSize: 12,
                  color: '#333435',
                  bold: false,
                },
              },
            ],
          },
          '\n');
        });
        data.push({
          canvas: [{
            type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1,
          }],
        },
        '\n');
      }
      return data;
    };

    const tripDetail = () => {
      const data = [];
      if (props.steps !== null) {
        data.push({
          text: 'Récapitulatif du trajet',
          margin: [0, 0, 45, 0],
          style: {
            alignment: 'left',
            fontSize: 15,
            color: '#333435',
            bold: true,
          },
        },
        '\n');
        props.steps.forEach((step, index) => {
          data.push({
            text: `${index + 1}: ${step.maneuver.instruction}`,
            margin: [0, 0, 45, 0],
            style: {
              alignment: 'left',
              fontSize: 12,
              color: '#333435',
              bold: true,
            },
          },
          '\n');
        });
        data.push({
          canvas: [{
            type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1,
          }],
          pageBreak: 'after',
        });
      }
      return data;
    };

    const defineRoadMap = () => {
      const data = [];
      if (props.img !== null) {
        data.push({
          text: 'Road Map',
          margin: [0, 0, 45, 0],
          style: {
            alignment: 'left',
            fontSize: 15,
            color: '#333435',
            bold: true,
          },
        },
        '\n',
        {
          canvas: [{
            type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1,
          }],
        },
        '\n',
        {
          image: props.img,
          width: 510,
          height: 650,
          margin: [20, 0, 0, 0],
        });
      }
      return data;
    };

    // Start PDF ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const contentPDF = () => [
      // HEADER **********************
      {
        columns: [
          {
            image: 'data:image/png;base64,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',
            margin: [0, 0, 45, 0],
            width: 150,
          },
        ],
      },
      '\n\n',
      {
        text: `Dates: ${date()}`,
        margin: [0, 0, 45, 0],
        style: {
          alignment: 'left',
          fontSize: 15,
          color: '#333435',
          bold: true,
        },
      },
      '\n',
      {
        text: `Trip: ${trip()}`,
        margin: [0, 0, 45, 0],
        style: {
          alignment: 'left',
          fontSize: 15,
          color: '#333435',
          bold: true,
        },
      },
      '\n',
      {
        canvas: [{
          type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1,
        }],
      },
      '\n',
      elementAdd(),
      '\n',
      tripDetail(),
      // NEW PAGE ***************************************************
      defineRoadMap(),
    ];
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf',
      },
    };
    const generatePDF = async () => {
      // Content PDF
      const dd = {
        pageOrientation: 'portrait',
        info: {
          title: 'Test',
        },
        pageSize: {
          width: 595,
          height: 842,
        },
        pageMargins: [20, 45, 21, 45],
        content: contentPDF(),
        // styles: {
        //   header: {
        //     fontSize: 18,
        //     bold: true,
        //     margin: [0, 0, 0, 10],
        //   },
        //   subheader: {
        //     fontSize: 16,
        //     bold: true,
        //     margin: [0, 10, 0, 5],
        //   },
        //   tableExample: {
        //     margin: [0, 5, 0, 15],
        //   },
        //   tableHeader: {
        //     bold: true,
        //     fontSize: 13,
        //     color: 'rgba(33, 59, 100, 0.8)',
        //   },
        // },
      };

      // End PDF
      // pdfMake.createPdf(dd).download('test');
      pdfMake.createPdf(dd).open();
    };
    // End PDF /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return {
      modal,
      generatePDF,
    };
  },
});
</script>
