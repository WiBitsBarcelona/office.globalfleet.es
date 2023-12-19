import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notifications', {
    state: () => ({
        nDocument: 0,
        nIncident: 0,
    }),
    getters: {
        getNDocument(){
            if (localStorage.getItem("nDocument") === null) {
                localStorage.setItem("nDocument", this.nDocument);
              }
            return this.nDocument;
        },
    },
    actions: {
        setNDocument(documentNew){
            localStorage.setItem("nDocument", documentNew);
            this.nDocument = documentNew;
        },
    }
});