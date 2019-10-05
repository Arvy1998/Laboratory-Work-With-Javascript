import { hri } from 'human-readable-ids';

class Task {
    id;
    projectId;
    title;
    createdOnDate;
    createdByUser;
    completedOnDate;
    completedByUser;
    subTasksId;
    assigned;
    done;

    constructor(title, createdOnDate, createdByUser) {
        this.setTitle(title);
        this.setCreatedOnDate(createdOnDate);
        this.setCreatedByUser(createdByUser);
        this.setCompleteOnDate(null);
        this.setCompletedByUser(null);
        this.setDone(false);
        this.setProjectId(null);
        this.setSubTasksId([]);
        this.setAssigned(false);
        this.setId();
    }

    setId() {
        this.id = hri.random();
    }

    setProjectId(projectId) {
        this.projectId = projectId;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setCreatedOnDate(createdOnDate) {
        this.createdOnDate = createdOnDate;
    }

    getCreatedOnDate() {
        return this.createdOnDate;
    }

    setCreatedByUser(createdByUser) {
        this.createdByUser = createdByUser;
    }

    getCreatedByUser() {
        return this.createdByUser;
    }

    setCompleteOnDate(completedOnDate) {
        this.completedOnDate = completedOnDate;
    }

    getCompleteOnDate() {
        return this.completedOnDate;
    }

    setCompletedByUser(completedByUser) {
        this.completedByUser = completedByUser;
    }

    getCompletedByUser() {
        return this.completedByUser;
    }

    setDone(done) {
        this.done = done;
    }

    getDone() {
        return this.done;
    }

    setSubTasksId(subTasksId) {
        this.subTasksId = subTasksId;
    }

    getSubTasksId() {
        return this.subTasksId;
    }

    setAssigned(assigned) {
        this.assigned = assigned;
    }

    getAssigned() {
        return this.assigned;
    }
}

export default Task;