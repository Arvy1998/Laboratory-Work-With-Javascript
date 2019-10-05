import User from './user';

class Person extends User {
    name;
    surname;
    email;

    constructor(username, password, name, surname, email) {
        super(username, password);
        this.setName(name);
        this.setSurname(surname);
        this.setEmail(email);
    }

     setName(name) {
         this.name = name;
     }

     getName() {
         return this.name;
     }

     setSurname(surname) {
         this.surname = surname;
     };

     getSurname() {
         return this.surname;
     }

     setEmail(email) {
         this.email = email;
     }

     getEmail() {
         return this.email;
     }
}

export default Person;