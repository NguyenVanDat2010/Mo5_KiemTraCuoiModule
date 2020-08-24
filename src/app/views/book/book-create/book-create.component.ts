import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/containers/services/book/book.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Book } from 'src/app/containers/model/book/book';



@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  createBookForm: FormGroup;
  book:  Book;

  constructor(private bookService : BookService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.createBookForm = this.fb.group({
      title: ['',[Validators.required]],
      author: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
    // this.createBookForm = new FormGroup(
    //   {
    //     title: new FormControl(),
    //     author: new FormControl(),
    //     description: new FormControl()
    //   }
    // )
  }

  createNewBook() {
    let data = this.createBookForm.value;
    // console.log(data)
      this.bookService.createNewBook(data).subscribe(res => {
        window.alert("Thêm mới thành công!")
        this.router.navigate(['/books'])
      })
  }

  get title(){
    return this.createBookForm.get('title')
  }
  get author(){
    return this.createBookForm.get('author')
  }
  get description(){
    return this.createBookForm.get('description')
  }
}
