let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list');


//class
class Book {
    constructor(title, author, sibn) {
        this.title = title;
        this.author = author;
        this.sibn = sibn;
    }
}

class UI {
    static addToBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.sibn}</td>
        <td><a href="#" class="delate">x</a></td>        
        `
        list.appendChild(row)
    }
    static clearFields() {
        document.querySelector('#title').value = '',
            document.querySelector('#author').value = '',
            document.querySelector('#sibn').value = '';
    }

    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `Alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);


        setTimeout(() => {
            document.querySelector('.Alert').remove();
        }, 2000)
    }
    static delateFromBook(target){
        if(target.hasAttribute('href')){
           target.parentElement.parentElement.remove();
           Stor.removeBook(target.parentElement.previousElementSibling.textContent.trim());
           UI.showAlert('Book remove success', 'succes');
        }
        
    }
}


//local stroge

class Stor {
   static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
   }

   static addBook(book){
    let books = Stor.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books))
   }
  
   static displayBooks(){
       let books = Stor.getBooks();

       books.forEach(book =>{
        UI.addToBookList(book);
       })
   }
   static removeBook (sibn){
    let books = Stor.getBooks();

    books.forEach((book , index) =>{
        if(book.sibn === sibn){
            books.splice(index, 1);
        }
        localStorage.setItem('books',JSON.stringify(books));
    })
   }
}

//AddEvenLisener function
form.addEventListener('submit', newBook)
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Stor.displayBooks());


//new book function

function newBook(e) {

    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        sibn = document.querySelector('#sibn').value;



    if (title === '' || author === '' || sibn === '') {
        UI.showAlert('Plase full feel the form', 'error')
    } else {
        
        let book = new Book(title, author, sibn);
        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert('Book added successful', 'succes');
        Stor.addBook(book);
    }

    e.preventDefault();
}

function removeBook(e){
let ui = new UI();
UI.delateFromBook(e.target);

}
