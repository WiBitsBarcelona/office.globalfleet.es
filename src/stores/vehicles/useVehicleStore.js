import { defineStore } from "pinia";



export const useVehicleStore = defineStore("vehicle", {
    state: () => ({
        vehicles: [],
        errors: null,
        token: null,
    }),
    actions:{

        async getVehicles(){

            //console.log(localStorage.getItem('token'));

            try {

                const res = await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}vehicles/list`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                  });

                  const response = await res.json();
                  if(response.success){
                    console.log(response.data);
                    this.vehicles = response.data;
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