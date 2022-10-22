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
  ImageBase64String:any=""
 
  newprofileID:any = ""
  showsubmit:any =true
  showmsg:any = false
  upadtemsg:any = false
  calssarray:any = [];
   file:any =""
  newimage:any = ""
  shortLink: string = "";
  loading: boolean = false; 
 
  baseurl='http://localhost:3000/';
  fileToUpload:any = "";
  myprofileForm!:FormGroup;
  profileID:any = "";
  constructor(private fb:FormBuilder,private profile:UserService,private route:Router,private activate:ActivatedRoute,private http:HttpClient,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.createProfileStructure();
    this.FetchClassDropdown();
  }
  
  FetchClassDropdown(){
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
      this.ImageBase64String = onLoadEvent.target.result;
       console.log('ImageBase64String',this.ImageBase64String)
       this.myprofileForm.controls['image'].setValue(this.ImageBase64String);
    };

    reader.onerror = (onErrorEvent: any) => {
     reader.abort();
    };
  }

  addprofile(){
    console.log(this.myprofileForm.value)
    this.profile.addprofile(this.myprofileForm.value).subscribe((el:any)=>{
    this.myprofileForm.reset();
      console.log(el)
      this.getprofileList();
    })
  }

  getUserprofileId(event:any){
    this.newprofileID = event
    this.fetchprofile();
  }

  fetchprofile(){
   if(this.newprofileID!=undefined){
    this.showsubmit =false
    }
    this.profile.fetchProfile(this.newprofileID).subscribe((el:any)=>{
      this.ImageBase64String = el[0].image;
      this.myprofileForm.patchValue({
        firstname:el[0].firstname,
        email:el[0].email,
        phonenumber:el[0].phonenumber,
        userclass:el[0].userclass,
        address:el[0].address,
        image:el[0].image

      })
    })

  }
  
  updateprofile(){
    this.showsubmit =true
    this.profile.updateProfile(this.myprofileForm.value,this.newprofileID).subscribe((el:any)=>{
      this.myprofileForm.reset();
     this.ImageBase64String = "";
     this.getprofileList();
    })
  }

  showUpdateduserList(event:any){
    this.afterdeletearray=event
  }

  getprofileList(){
    this.profile.getprofileList().subscribe((el:any)=>{
      el.forEach((element:any) => {
        if(el.image !=""){
          el.image = this._sanitizer.bypassSecurityTrustResourceUrl(el[0].image);
           this.ImageBase64String = "";
        }else{
          el.image = "";
        }
        return el;
      });
      this.userarray = el;  
    })
  }

}