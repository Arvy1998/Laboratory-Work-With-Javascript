import { hri } from 'human-readable-ids';
import sha256 from 'sha256';

class User {
    id;
    username;
    password;
    sesionActive;

    constructor(username, password) {
        this.setUsername(username);
        this.setPassword(password);
        this.setSesionInactive();
        this.setId();
    }

    setId() {
        this.id = hri.random();
    }

    getId() {
        return this.id;
    }

    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setPassword(password) {
        this.password = sha256(password);
    }

    getPassword() {
        return this.password;
    }

    setSesionActive() {
        this.sesionActive = true;
    }

    setSesionInactive() {
        this.sesionActive = false;
    }
}

export default User;