import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/containers/model/book/book';
import { BookService } from 'src/app/containers/services/book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  bookLength: number;
  key = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
    console.log(this.key);

  }

  getAllBooks = () => {
    this.bookService.getAllBooks().subscribe(res =>{
      this.bookList = res;
      this.bookLength = this.bookList.length;
      // console.log(res);
    })
  }

  deleteBookById(id:number){
    if(confirm('Bạn muốn xóa?')) {
      this.bookService.deleteBookById(id).subscribe(res =>{
        window.alert("Xóa thành công");
        this.getAllBooks();
        // console.log(res);
      })
    }
  }

  search(): any {
    let foundBooks = [];
    for (let i = 0; i < this.bookList.length; i++) {
      if (this.bookList[i].title.toLowerCase().includes(this.key.toLowerCase())) {
        foundBooks.push(this.bookList[i])
      }
    }

    if (this.key != '') {
      this.bookList = foundBooks
      this.bookLength = this.bookList.length;
    } else
      this.getAllBooks()
  }


}
