import User from './user';

class Company extends User {
    title;
    hqName;
    hqSurname;
    hqEmail;

    constructor(username, password, title, hqName, hqSurname, hqEmail) {
        super(username, password);
        this.setTitle(title);
        this.setHqName(hqName);
        this.setHqSurname(hqSurname);
        this.setHqEmail(hqEmail);
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setHqName(hqName) {
        this.hqName = hqName;
    }

    getHqName() {
        return this.hqName;
    }

    setHqSurname(hqSurname) {
        this.hqSurname = hqSurname;
    }

    getHqSurname() {
        return this.hqSurname;
    }

    setHqEmail(hqEmail) {
        this.hqEmail = hqEmail;
    }

    getHqEmail() {
        return this.hqEmail;
    }
}

export default Company;