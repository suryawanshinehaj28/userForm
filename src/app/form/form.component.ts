import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userarray:any=[]
  afterdeletearray:any =[]
  mobileImageBase64String:any=""
  name:any ="vihan"
  newprofileID:any = ""
  showsubmit:any =true
  showupdate:any = false
  showmsg:any = false
  upadtemsg:any = false
  calssarray:any = [];
  profilearray:any = []
  newuserarray:any = [];
  imagePath:any = ""
  file:any =""
  newimage:any = ""
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  //  file: File = null;
//  imageurl:any="assets/img/images.jpg";
  baseurl='http://localhost:3000/';
  fileToUpload:any = "";
  myprofileForm!:FormGroup;
  profileID:any = "";
  constructor(private fb:FormBuilder,private profile:UserService,private route:Router,private activate:ActivatedRoute,private http:HttpClient,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.createProfileStructure();

    this.FetchClass();
     this.showprofile();
  }

  
  FetchClass(){
  
    this.profile.getcalssinfo().subscribe((el:any)=>{
this.calssarray = el
    })
  }



  createProfileStructure(){

    this.myprofileForm  = this.fb.group({
       "firstname":['',[Validators.required,Validators.maxLength(10)]],
     
       "email":['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      "phonenumber":['',[Validators.required,Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
     
      "userclass":['',[Validators.required]],
      "image":['',[Validators.required]],
    
     
      "address":['',[Validators.required,Validators.maxLength(60)]]
   
      
    })

  }

  get firstname(){
    return this.myprofileForm.get('firstname');
  }

  get phonenumber(){
    return this.myprofileForm.get('phonenumber');
  }

  get email(){
    return this.myprofileForm.get('email');
  }

  uploadFileEvent(event:any) {
    if (event.target.files.length === 0) {
      console.log('No file selected!');
      return;
    }
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (onLoadEvent: any) => {
      this.mobileImageBase64String = onLoadEvent.target.result;
       console.log('mobileImageBase64String',this.mobileImageBase64String)
       this.myprofileForm.controls['image'].setValue(this.mobileImageBase64String);
       this.displayImage(this.mobileImageBase64String);
    };

    reader.onerror = (onErrorEvent: any) => {
      // this.toastr.error('Error occured please try again.');
      reader.abort();
    };
  }

  displayImage(mobileImageBase64String:any) {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(mobileImageBase64String);
  }

  addprofile(){
    console.log(this.myprofileForm.value)
    this.profile.addprofile(this.myprofileForm.value).subscribe((el:any)=>{
      this.showmsg = true;
      this.upadtemsg = false;
      this.myprofileForm.reset();
      console.log(el)
      this.showprofile();

    })
  }

 

  getUserprofileId(event:any){
    this.newprofileID = event
    //alert(this.newprofileID)
this.fetchprofile();
  }

  fetchprofile(){
   // alert(this.newprofileID)
    if(this.newprofileID!=undefined){
    this.showsubmit =false
 this.showupdate = true
 this.showmsg = false;
      this.upadtemsg = true;
    }
    this.profile.fetchProfile(this.newprofileID).subscribe((el:any)=>{
     
      this.newimage =  this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(el[0].image);
      this.myprofileForm.patchValue({
        firstname:el[0].firstname,
        email:el[0].email,
        phonenumber:el[0].phonenumber,
        userclass:el[0].userclass,
        address:el[0].address,
        image:this.newimage

      })
    })

  }
  

  
  updateprofile(){
    this.showsubmit =true
    this.showupdate = false
    this.profile.updateProfile(this.myprofileForm.value,this.newprofileID).subscribe((el:any)=>{
      this.myprofileForm.reset();
     
     this.showprofile();
      
      
    })

  }

  UpdateduserList(event:any){
    this.afterdeletearray=event
  }

  showprofile(){
    this.profile.getprofileList().subscribe((el:any)=>{
      el.forEach((element:any) => {
        if(el.image !=""){
          el.image = this._sanitizer.bypassSecurityTrustResourceUrl(el[0].image);
          this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(el[0].image);
        }else{
          el.image = "";
        }
        return el;
      });
      this.userarray = el;
      this.profilearray=el.length;
      
    })
  }

}
