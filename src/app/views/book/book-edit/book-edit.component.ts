import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/containers/services/book/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/containers/model/book/book';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  editBookForm: FormGroup;
  book: Book;
  bookId = +this.activatedRoute.snapshot.paramMap.get('id'); //dấu cộng để ép kiểu

  constructor(private bookService : BookService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editBookForm = this.fb.group({
      id: [this.bookId],
      title: ['',[Validators.required]],
      author: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })

    // this.editBookForm = new FormGroup(
    //   {
    //     id: new FormControl(this.bookId),
    //     title: new FormControl(),
    //     author: new FormControl(),
    //     description: new FormControl()
    //   }
    // )

    //patch thông tin của sách cần sửa vào form
    this.bookService.getBookById(this.bookId).subscribe(res => {
      this.editBookForm.patchValue(res);
      // console.log(res);

    })
  }

  editBookById(){
    let data = this.editBookForm.value;
    this.bookService.editBookById(data, this.bookId).subscribe(res =>{
      window.alert("Sửa sách thành công!")
      this.router.navigate(['/books']);
    })
  }

  get title(){
    return this.editBookForm.get('title')
  }
  get author(){
    return this.editBookForm.get('author')
  }
  get description(){
    return this.editBookForm.get('description')
  }
}
