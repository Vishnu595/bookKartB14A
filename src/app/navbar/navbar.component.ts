import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  url = "https://bookcart.azurewebsites.net/upload/";
  selectedTab = "All Categories";
  filteredList:any = [];
  productList:any[] = [];
  allList = [];
  constructor(private http:HttpClient) { }
  allCategoriesList = [{ "tabName": "All Categories", "list": { "key": "categories", "list": [{ "price": 2000, "name": "category", "subjectType": "physics", id: 1 }, { "price": 3000, "name": "category", "subjectType": "chemistry", id: 2 }, { "price": 4000, "name": "category", "subjectType": "maths", id: 3 }, { "price": 8000, "name": "category", "subjectType": "sanskrit", id: 4 }] } },
                       { "tabName": "Biography", "list": { "key": "bio", "list": [{ "price": 2000, "name": "category", "subjectType": "botony", id: 1 },{ "price": 2000, "name": "category", "subjectType": "english", id: 2 }] } },
                       { "tabName": "Fiction", "list": { "key": "categories", "list": [{ "price": 2000, "name": "category", "subjectType": "botony", id: 1 },{ "price": 2000, "name": "category", "subjectType": "english", id: 2 }] } },
                       { "tabName": "Mystery", "list": { "key": "bio", "list": [{ "price": 2000, "name": "category", "subjectType": "botony", id: 1 },{ "price": 2000, "name": "category", "subjectType": "english", id: 2 }] } },
                       { "tabName": "Fantasy", "list": { "key": "categories", "list": [{ "price": 2000, "name": "category", "subjectType": "botony", id: 1 },{ "price": 2000, "name": "category", "subjectType": "english", id: 2 }] } },
                       { "tabName": "Romance", "list": { "key": "categories", "list": [{ "price": 2000, "name": "category", "subjectType": "botony", id: 3 },{ "price": 2000, "name": "category", "subjectType": "english", id: 4 }] } },
                
                      ]

                      selectedList:any = [];
  
   setActiveTab(tabName:string){
    this.isSimilarBook = false;
    this.selectedTab = tabName;
    this.selectedList = this.allCategoriesList.filter(obj => obj.tabName == tabName);
    this.productList = this.selectedTab !='All Categories'? this.allList.filter((obj:any) => obj.category == this.selectedTab):this.allList;

    this.filteredList = JSON.parse(JSON.stringify(this.selectedList));
  }

  ngOnInit(): void {
    this.setActiveTab("All Categories");
    console.log("dsksd dkk");
    this.http.get("https://bookcart.azurewebsites.net/api/book").subscribe((res:any)=>{
      console.log(res);
      this.allList = res;
      this.productList = this.selectedTab !='All Categories'? res.filter((obj:any) => obj.category == this.selectedTab):res;

    })
  }

  priceFilter(){

  }

  isSimilarBook = false;
  similarBooksData:any[] = []
  similarBooks(){
    this.selectedList = [];
    this.filteredList = [];
    this.isSimilarBook = true;
    this.similarBooksData = this.allCategoriesList.filter(obj => obj.tabName == "All Categories");
  }

  searchByBook(event:any){
    let searchValue = event.currentTarget.value;
    let productList = this.selectedTab !='All Categories'? this.allList.filter((obj:any) => obj.category == this.selectedTab):this.allList;
    
    this.productList = productList.filter((obj:any)=>(obj.bookId.toString().indexOf(searchValue)>-1 ||  obj.title.indexOf(searchValue)>-1 || obj.author.indexOf(searchValue) >-1));
  }

  updateSetting(event:any){
     let productList = this.selectedTab !='All Categories'? this.allList.filter((obj:any) => obj.category == this.selectedTab):this.allList;
     this.productList = productList.filter((obj:any)=>(obj != null && obj.price<= event.value));    
    }

}
