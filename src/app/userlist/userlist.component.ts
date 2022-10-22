import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
profilearray:any = [];
usercount:any = "";
@Output() userprofileID:EventEmitter<any> = new EventEmitter()
@Output() UpdateduserList:EventEmitter<any> = new EventEmitter()
@Input() userarray:any=[]
@Input() afterdeletearray:any=[]

imageurl:any="assets/img/images.jpg";
  constructor(private user:UserService,private route:Router) { }

  ngOnInit(): void {
    this.showprofile();
  }
 

  deleteprofile(id:any,index:any){
    //alert(id)
    this.user.deleteprofile(id).subscribe(
      (el:any)=>{
        console.log(el);
        this.profilearray.splice(index,1);
        this.showprofile();
       
      }
    )


  }
  showprofile(){
    this.user.getprofileList().subscribe((el:any)=>{
      this.profilearray=el;
      console.log("this.profilearray",this.profilearray)
      this.UpdateduserList.emit(this.profilearray)
    })
  }

  userCount(count:any){
    this.usercount = count
  }

  editProfile(profileID:any){
    //alert(profileID)
   this.userprofileID.emit(profileID)
    
  }
}
