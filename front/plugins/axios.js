// import Vue from 'vue';
// import axios from 'axios';

// axios.interceptors.request.use(
//   config => {
//     // trigger 'loading=true' event here
//     // this.isFullPreload = true;
//     console.log('show PRELOADER');
//     return config;
//   },
//   error => {
//     // this.isFullPreload = false;
//     // store.commit('setIsFullPreloadFalse');
//     console.log('hide PRELOADER');
//     // trigger 'loading=false' event here
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   response => {
//     // trigger 'loading=false' event here
//     // store.commit('setIsFullPreloadFalse');
//     console.log('hide PRELOADER');
//     return response;
//   },
//   error => {
//     // store.commit('setIsFullPreloadFalse');
//     console.log('hide PRELOADER');
//     // trigger 'loading=false' event here
//     return Promise.reject(error);
//   }
// );

// Vue.use(axios);
