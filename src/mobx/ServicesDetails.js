import {observable, action, makeObservable ,computed} from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';
import { useState } from 'react';
class servicesDetails{



    services=[{
        id: "1",
        name: "פגישת ייעוץ פרונטלית",
        description: "פגישת ייעוץ בקליניקה אחד על אחד מעמיקה ועם תוצאות מוכחות ",
        price: 500,
        duration: 60,
    },
    {
        id: "2",
        name: "פגישת ייעוץ בזום",
        description: "פגישת ייעוץ בזום כולי שלכם ואיתכם, נא להכין שאלות מראש" ,
        price: 300,
        duration: 60,
    }];
    constructor() {
        makeObservable(this,{
            services: observable,
            postService:action,          
            getServices: computed
        })
        for (let i = 0; i < this.services.length; i++) {
            this.postService(this.services[i]);           
        }
    }
    get getServices(){        
         axios.get("http://localhost:8787/services").then((res)=>{
            runInAction(()=>{
              this.services = res.data;
            })
         });
        return this.services; 
    }
    postService(s) {
        // const serv={
        //     id:(parseInt(this.services[this.services.length - 1].id) + 1).toString(), 
        //     serviceType: s.serviceType,
        //     clientName: s.clientName,
        //     clientPhone: s.clientPhone,
        //     clientEmail: s.clientEmail
        //   }

        fetch("http://localhost:8787/service",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(s)
        })
    }

    
}
export default new servicesDetails();