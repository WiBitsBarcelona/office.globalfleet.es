import { defineStore } from 'pinia';
import axios from 'axios';
import { toRaw } from 'vue';


const config = {
  headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}


export const useAuthenticationStore = defineStore("authStore", {
    state: () => ({
        token: null,
        user: null,
        errors: null,
        loading: false
    }),
    getters:{
      getUser(){
        return toRaw(this.user);
      }
    },
    actions: {
        async login(email, password) {
            const res = await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
            const response = await res.json();
            
            //Remove localStore
            if(localStorage.getItem('token')){
                localStorage.removeItem('token');
            }

            if (response.success) {
                this.user = response.user;
                localStorage.setItem('token', response.token);
            }else{
                this.errors = response.errors;
            }
          },
        async currentUser(){
            return new Promise((resolve, reject) => {
                this.token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;//Set token by default
                axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/auth/user`)
                    .then((res) => {
                        this.user = res.data.data;
                        // OK
                        //console.log(this.user);
                        //console.log(this.user.abilities);
                        //console.log(this.user.roles);
                        resolve(res.data);
                    })
                    .catch((e) => {
                        if(localStorage.getItem('token')){
                            localStorage.removeItem('token');
                        }
                        this.token = null;
                        reject(e);
                    })
            })
        },
        async logout(){

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/auth/logout`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': `Bearer ${this.token}`
                    }
                  });
                  const response = await res.json();

                  if (response.success){
                    this.token = null;
                    this.user = null;
                  }else{
                    this.errors = response.errors;
                  }
                
            } catch (error) {
                console.log(e);
                this.errors = e;
                this.token = null;
                this.user = null;
            }

        },
        async forgotPassword(email){
            this.loading = true;
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/auth/password/email`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                  });
                  const response = await res.json();

                  if (response.success){
                    this.message = response.message;
                  }else{
                    this.errors = response.errors;
                  }
            } catch (e) {
                console.log(e);
                this.errors = e;
            }finally{
                this.loading = false;
            }
        }
    },
});