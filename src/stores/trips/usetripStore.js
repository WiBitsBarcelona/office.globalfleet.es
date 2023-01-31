import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';



// export const useTripStore = defineStore("trips", () => {

//   const trips = ref([]);
//   const errors = ref(null);


//   const getTrips = async() => {
//     try {    
//       const res = await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/list`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//         });

//         const response = await res.json();
//         if(response.success){
//           //console.log(response.data);
//           trips.value = response.data;
//         }else{
//           errors.value = response.errors;
//         }
      
//     } catch (e) {
//         console.log("Error", e);
//         errors.value = e;
//     }

//   }

//   return {
//     trips,
//     errors,
//     getTrips,
//   }
// });







export const useTripStore = defineStore("trips", {
    state: () => ({
        trips: [],
        errors: null,
        token: null,
    }),
    actions:{

      // async getTrips(){
      //       return new Promise(async(resolve, reject) => {
      //           this.token = localStorage.getItem('token');
      //           axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;//Set token by default
      //           await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/list`)
      //               .then((res) => {
      //                   this.trips = res.data.data;
      //                   // OK
      //                   //console.log(this.user);
      //                   //console.log(this.user.abilities);
      //                   //console.log(this.user.roles;
      //                   resolve();
      //               })
      //               .catch((e) => {
      //                   reject(e);
      //               })
      //       }) 
      //   },

        async getTrips(){

            //console.log(localStorage.getItem('token'));

            try {

                const res = await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/list`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                  });

                  const response = await res.json();
                  if(response.success){
                    //console.log(response.data);
                    this.trips = response.data;
                  }else{
                    this.errors = response.errors;
                  }
                
            } catch (e) {
                console.log("Error", e);
                this.errors = e;
            }

        },

    }

})