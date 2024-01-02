import {observable, action, makeObservable ,computed} from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';


class MeetingsDetails{
    meetings=[{
    id: "1",
    serviceType: "פגישת ייעוץ פרונטלית",
    dateTime: "2023-12-29T10:00:00.000Z",//מבנה של תאריך ושעה סטנדרטי בjs
    clientName: "אבי כהן",
    clientPhone: "050-1234567",
    clientEmail: "m@m.com"
    },
    {
         id: "2",
    serviceType: "פגישת ייעוץ פרונטלית",
    dateTime: "2024-01-07T10:00:00.000Z",//מבנה של תאריך ושעה סטנדרטי בjs
    clientName: "יאיר נהון ",
    clientPhone: "058-1234567",
    clientEmail: "s@m.com"
    }];
    
    constructor() {
        makeObservable(this,{
            meetings: observable,
            postMeeting:action,          
            getMeetings: computed
        })
        for (let i = 0; i < this.meetings.length; i++) {
            this.postMeeting(this.meetings[i]);           
        }
    }
    get getMeetings(){        
         axios.get("http://localhost:8787/appointments").then((res)=>{
            runInAction(()=>{
              this.meetings = res.data;
            })
         });
        return this.meetings; 
    }
    // postMeeting(m) {
    //     fetch("http://localhost:8787/appointment",{
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' }, 
    //         body: JSON.stringify(m)
    //     })
    //     .then( (response)=>{
            
    //         return response.status;
    //     }
    //     );
    // }
    async postMeeting(m) {
        //  m.id = (parseInt(this.meetings[this.meetings.length - 1].id) + 1).toString();
        try {
            const response = await fetch("http://localhost:8787/appointment", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(m)
            });
    
            if (!response.ok) {
                console.error(`Error: ${response.status}`);
                return true;
            }
    
            return false;
        } catch (error) {
            console.error('Fetch error:', error);
            return false;
        }
    }
    
}
export default new MeetingsDetails();