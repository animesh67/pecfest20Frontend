import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormComponent} from "./form/form.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private eventIndex;
  eventType;
  eventSubType;
   eventDetails=null;
  errorMessage=null;
  successMessage=null;
  loading=true;
  constructor(private formComponent: FormComponent,public dialog: MatDialog,private route: ActivatedRoute,private eventService:EventService) {
    this.eventService.isFetchingEvents=true;

    this.route.params.subscribe(params => {
      this.eventIndex = params['id'];
      this.eventSubType=params["event_sub_type"];
      this.eventType=params["event_type"];
    });
    this.eventService.fetchEvents().subscribe(response=>{
      this.eventService.manipulateResponse(response);
      let append= (this.eventType=="cultural"||this.eventType=="technical") ? "_event":"";
      let myEvents=response.data[this.eventType+append];
      for (let clubEvent of myEvents)
        if(clubEvent.club_name==this.eventSubType) {
          this.eventService.clubEvents=clubEvent.event_list;
          break;
        }
      this.eventDetails=this.eventService.clubEvents[this.eventIndex-1];

    });
  }
  public eventadd: EventsType;
  registerForTeam(){
    this.formComponent.populateForm(this.eventDetails);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(FormComponent, dialogConfig);
  }

  ngOnInit(): void {

  }

  registerForIndividual() {
    this.errorMessage=null;
    this.successMessage=null
    this.eventService.registerIndividual(this.eventDetails.event_id).subscribe(response=>{
      if(response["http_status"]!="OK")
        this.errorMessage=response["status_message"];
      else
        this.successMessage="Registration for "+`${this.eventDetails.event_name}`+" is successful."
    });
  }

    manipulateLink() {
       let arr=this.eventDetails.event_banner_image_url.split('/');
       return `https://drive.google.com/uc?id=${arr[5]}&export=download`;

    }

  onLoad() {
    this.loading=false;
  }
}
export interface EventsType {
  username1: String,
  username2: String,
  username3: String,
  username4: String,
  teamname: String,
}
