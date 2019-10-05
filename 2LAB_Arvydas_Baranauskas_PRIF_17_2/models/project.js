import { hri } from 'human-readable-ids';

class Project {
    id;
    title;
    tasks;
    users;
    createdBy;

    constructor(title, usernameOfProjectCreator) {
        this.setTitle(title);
        this.setTaskBulk([]);
        this.setUserBulk([]);
        this.setCreatedBy(usernameOfProjectCreator);
        this.setId();
    }

    setId() {
        this.id = hri.random();
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setTaskBulk(tasks) {
        this.tasks = tasks;
    }

    getTaskBulk() {
        return this.tasks;
    }

    setUserBulk(users) {
        this.users = users;
    }

    getUserBulk() {
        return this.users;
    }

    setCreatedBy(createdBy) {
        this.createdBy = createdBy;
    }

    getCreatedBy() {
        return this.createdBy;
    }
}

export default Project;