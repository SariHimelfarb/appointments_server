import {observable, action, makeObservable ,computed} from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';
import businessLogo from '../images/56cfee5f54fd6c2ea6682ae25e8bda52.jpg';


class bussinessDetails{
    business = {
        id: "1",
        name: "שרה הימל",
        address: "רבי עקיבא 69",
        phone: "058-3223296",
        owner: "",
        logo: businessLogo,
        description: "הנחיית הורים",
    };
    constructor() {
        makeObservable(this,{
            business: observable,
            postBusiness:action,
            updateBusiness:action,
            fetchBusiness:action ,
            getBusiness: computed
        })  
        this.fetchBusiness(); 
    }
    get getBusiness(){   
        this.fetchBusiness(); 
        return this.business;
    }
    fetchBusiness(){            
        axios.get("http://localhost:8787/businessData").then((res)=>{
            runInAction(() => {

                if (res.data && Object.keys(res.data).length > 0) {
                this.business = res.data;
            }else
            {
                this.postBusiness();
            }
                });
        })
    }
    updateBusiness(bus) {      
       this.business=bus;
       this.postBusiness();
    }
    postBusiness() {
        fetch("http://localhost:8787/businessData",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(this.business)
        })
    }
    
}
export default new bussinessDetails();