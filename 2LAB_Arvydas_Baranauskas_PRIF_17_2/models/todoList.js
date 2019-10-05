import Person from './person';
import Company from './company';
import omitListsForUsage from '../index';
import sha256 from 'sha256';
import Task from './task';
import Project from './project';

class TodoList {

    personList = [];
    companyList = [];
    userList = [];
    taskList = [];
    projectList = [];

    /* INIT DATA */

    initData = function() {
        const data = omitListsForUsage();
        this.personList = data.personArray;
        this.companyList = data.companyArray;
        this.taskList = data.taskArray;
        this.projectList = data.projectArray;
        this.userList = data.userArray;
    }

    /* LOG-IN AND LOG-OUT */

    loginPerson = function(username, password) {
        const personByUsername = this.personList.filter(person => person.username == username);
        if (personByUsername[0]) {
            /* nenorejau palikti plaintextu saugoma slaptazodi, tad ji uzkodavau bent sha256 */
            if (sha256(password) == personByUsername[0].password) {
                this.enablePerson(personByUsername[0].id);
                return companyByUsername[0];
            }
        }
        return false;
    }

    loginCompany = function (username, password) {
        const companyByUsername = this.companyList.filter(company => company.username == username);
        if (companyByUsername[0]) {
            if (sha256(password) == companyByUsername[0].password) {
                this.enableCompany(companyByUsername[0].id);
                return companyByUsername[0];
            }
        }
        return false;
    }

    logoutPerson = function(id) {
        this.disablePerson(id);
    }

    logoutCompany = function(id) {
        this.disableCompany(id);
    }

    /* PERSON */

    registerPerson = function(username, password, name, surname, email) {
        const newPerson = new Person(username, password, name, surname, email);
        const personByUsername = this.personList.filter(person => person.username == username);
        if (personByUsername[0]) console.log('User with this username already exists, please select different username.');
        else {
            const jsonPerson = {
                id: newPerson.id,
                username: newPerson.username,
                password: newPerson.password,
                name: newPerson.name,
                surname: newPerson.surname,
                email: newPerson.email,
                sesionActive: newPerson.sesionActive,
            };
            const jsonUser = {
                id: newPerson.id,
                username: newPerson.username,
                sesionActive: newPerson.sesionActive,
            };
            this.personList.push(jsonPerson);
            this.userList.push(jsonUser);
            return jsonPerson;
        } return false;
    }

    getPersonList = function() {
        return this.personList;
    }

    /* disable/enable funkcijos visuomet ras vartotoja, nes jis privalo buti prisijunges prie sistemos,
       kad pakeisti jo sesijos aktyvumo flaga */
    disablePerson = function (id) {
        const personToDisable = this.personList.filter(person => person.id == id);
        personToDisable[0].sesionActive = false;
        this.personList.map(
            person => personToDisable.find(
                disabled => disabled.id == person.id) || person);
    }

    enablePerson = function (id) {
        const personToEnable = this.personList.filter(person => person.id == id);
        personToEnable[0].sesionActive = true;
        this.personList.map(
            person => personToEnable.find(
                enabled => enabled.id == person.id) || person);
    }

    getPersonById = function(id) {
        const personById = this.personList.filter(person => person.id == id);
        if (personById[0]) return personById[0];
        else return false;
    }

    deletePersonById = function(id) {
        const personById = this.personList.filter(person => person.id == id);
        if (personById[0]) {
            /* jeigu triname useri, projektuose pridetas useris taip pat trinamas */
            const projectByUser = this.projectList.filter(project => project.users.includes(id));
            if (projectByUser[0]) {
                projectByUser.forEach(project => {
                    let index = this.projectList.indexOf(project);
                    this.projectList[index].users.splice(id, 1);
                });
            }
            let index = this.personList.indexOf(personById[0]);
            /* antrasis splice elementas nurodo, kad trinsime tik viena elementa */
            (this.personList).splice(index, 1);
            return true;
        } else {
            console.log('Company does not exist...');
            return false;
        }
    }

    updatePersonById = function(id, username, password, name, surname, email) {
        const personById = this.personList.filter(person => person.id == id);
        if (personById[0]) {
            let index = this.personList.indexOf(personById[0]);
            if (username != '') this.personList[index].username = username;
            if (password != '') this.personList[index].password = sha256(password);
            if (name != '') this.personList[index].name = name;
            if (surname != '') this.personList[index].surname = surname;
            if (email != '') this.personList[index].email = email;
            return this.personList[index];
        } return false;
    }

    /* COMPANY */

    registerCompany = function(username, password, title, hqName, hqSurname, hqEmail) {
        const newCompany = new Company(username, password, title, hqName, hqSurname, hqEmail);
        const companyByUsername = this.companyList.filter(company => company.username == username);
        if (companyByUsername[0]) console.log('User with this username already exists, please select different username.');
        else {
            const jsonCompany = {
                id: newCompany.id,
                username: newCompany.username,
                password: newCompany.password,
                title: newCompany.title,
                hqName: newCompany.hqName,
                hqSurname: newCompany.hqSurname,
                hqEmail: newCompany.hqEmail,
                sesionActive: newCompany.sesionActive,
            };
            const jsonUser = {
                id: newCompany.id,
                username: newCompany.username,
                sesionActive: newCompany.sesionActive,
            };
            this.userList.push(jsonUser);
            this.companyList.push(jsonCompany);
            return jsonCompany;
        } return false;
    }

    getCompanyList = function() {
        return this.companyList;
    }

    /* disable/enable funkcijos visuomet ras kompanija, nes ji privalo buti prisijungusi prie sistemos,
       kad pakeisti jos sesijos aktyvumo flaga */
    disableCompany = function (id) {
        const companyToDisable = this.companyList.filter(company => company.id == id);
        companyToDisable[0].sesionActive = false;
        this.companyList.map(
            company => companyToDisable.find(
                disabled => disabled.id == company.id) || company);
    }

    enableCompany = function (id) {
        const companyToEnable = this.companyList.filter(company => company.id == id);
        companyToEnable[0].sesionActive = true;
        this.companyList.map(
            company => companyToEnable.find(
                enabled => enabled.id == company.id) || company);
    }

    getCompanyById = function(id) {
        const companyById = this.companyList.filter(company => company.id == id);
        if (companyById[0]) return companyById[0];
        else return false;
    }

    deleteCompanyById = function(id) {
        const companyById = this.companyList.filter(company => company.id == id);
        if (companyById[0]) {
            /* jeigu triname useri, projektuose pridetas useris taip pat trinamas */
            const projectByUser = this.projectList.filter(project => project.users.includes(id));
            if (projectByUser[0]) {
                projectByUser.forEach(project => {
                    let index = this.projectList.indexOf(project);
                    this.projectList[index].users.splice(id, 1);
                });
            }
            let index = this.companyList.indexOf(companyById[0]);
            /* antrasis splice elementas nurodo, kad trinsime tik viena elementa */
            (this.companyList).splice(index, 1);
            return true;
        } else {
            console.log('Company does not exist...');
            return false;
        }
    }

    updateCompanyById = function(id, username, password, title, hqName, hqSurname, hqEmail) {
        const companyById = this.companyList.filter(company => company.id == id);
        if (companyById[0]) {
            let index = this.companyList.indexOf(companyById[0]);
            if (username != '') this.companyList[index].username = username;
            if (password != '') this.companyList[index].password = sha256(password);
            if (title != '') this.companyList[index].title = title;
            if (hqName != '') this.companyList[index].hqName = hqName;
            if (hqSurname != '') this.companyList[index].hqSurname = hqSurname;
            if (hqEmail != '') this.companyList[index].hqEmail = hqEmail;
            return this.companyList[index];
        } return false;
    }

    /* TASK */

    createTask = function(title, _successLogin) {
        const currentDate = new Date();
        const newTask = new Task(title, currentDate, _successLogin.username);
        const taskJson = {
            id: newTask.id,
            projectId: newTask.projectId,
            title: newTask.title,
            createdOnDate: newTask.createdOnDate,
            createdByUser: _successLogin.username,
            completedOnDate: newTask.completedOnDate,
            completedByUser: newTask.completedByUser,
            done: newTask.done,
            subTasksId: newTask.subTasksId,
            assigned: newTask.assigned,
        }
        this.taskList.push(taskJson);
        return taskJson;
    }

    getTaskList = function() {
        return this.taskList;
    }

    getTaskById = function(id) {
        const taskById = this.taskList.filter(task => task.id == id);
        if (taskById[0]) return taskById[0];
        else return false;
    }

    deleteTaskById = function(id, _successLogin) {
        const taskById = this.taskList.filter(task => task.id == id);
        if (!taskById[0]) {
            console.log('Task does not exist...');
            return false;
        } else if (taskById[0].createdByUser != _successLogin.username) {
            console.log('You can not delete tasks of different user...');
            return false;
        } else {
            /* jeigu taskas priklauso projektui, jame jis yra istrinamas */
            if (taskById[0].projectId != null) {
                const projectById = this.projectList.filter(project => project.id == taskById[0].projectId);
                let index = this.projectList.indexOf(projectById[0]);
                this.projectList[index].tasks.splice(taskById[0].projectId, 1);
            }
            let index = this.taskList.indexOf(taskById[0]);
            /* antrasis splice elementas nurodo, kad trinsime tik viena elementa */
            (this.taskList).splice(index, 1);
            return true;
        }
    }

    updateTaskById = function(id, title, _successLogin) {
        const taskById = this.taskList.filter(task => task.id == id);
        if (!taskById[0]) {
            console.log('Defined task does not exist...');
            return false;
        } else if (taskById[0].createdByUser != _successLogin.username) {
            console.log('You can not update tasks of different user...');
            return false;
        } else if (taskById[0]) {
            let index = this.taskList.indexOf(taskById[0]);
            if (title != '') this.taskList[index].title = title;
            return this.taskList[index];
        } return false;
    }

    setTaskCompleteById = function(id, _successLogin) {
        const taskById = this.taskList.filter(task => task.id == id);
        if (taskById[0]) {
            let index = this.taskList.indexOf(taskById[0]);
            this.taskList[index].done = true;
            this.taskList[index].completedByUser = _successLogin.username;
            return this.taskList[index];
        } return false;
    }

    assignChildTask(parentTaskId, childTaskId) {
        const parentTaskById = this.taskList.filter(task => task.id == parentTaskId);
        if (parentTaskId == childTaskId) {
            console.log('Parent task can not be child task of itself...');
            return false;
        } else if (parentTaskById[0]) {
            const childTaskById = this.taskList.filter(task => task.id == childTaskId);
            if (childTaskById[0]) {
                if (childTaskById[0].assigned == true) {
                    console.log('Task is already equiped on another parent task, please choose free task...');
                    return false;
                } else if (!(parentTaskById[0].subTasksId.includes(childTaskId))) {
                    let index = this.taskList.indexOf(parentTaskById[0]);
                    let childIndex = this.taskList.indexOf(childTaskById[0]);
                    this.taskList[index].subTasksId.push(childTaskId);
                    this.taskList[childIndex].assigned = true;
                    return this.taskList[index];
                } else {
                    console.log('Child task is already assigned to the same parent task...');
                    return false;
                }
            } else {
                console.log('Child task with with given id does not exist');
                return false;
            }
        } else {
            console.log('Parent task with given id does not exist');
            return false;
        };
    }

    deleteChildTask(parentTaskId, childTaskId) {
        const parentTaskById = this.taskList.filter(task => task.id == parentTaskId);
        if (parentTaskId == childTaskId) {
            console.log('Parent task can not be child task of itself...');
            return false;
        } else if (parentTaskById[0]) {
            const childTaskById = this.taskList.filter(task => task.id == childTaskId);
            if (childTaskById[0]) {
                if ((parentTaskById[0].subTasksId.includes(childTaskId))) {
                    let index = this.taskList.indexOf(parentTaskById[0]);
                    let childIndex = this.taskList.indexOf(childTaskById[0]);
                    this.taskList[index].subTasksId.splice(childTaskId, 1);
                    this.taskList[childIndex].assigned = false;
                    return this.taskList[index];
                } else {
                    console.log('Child task is already assigned to the same parent task...');
                    return false;
                }
            } else {
                console.log('Child task with with given id does not exist');
                return false;
            }
        } else {
            console.log('Parent task with given id does not exist');
            return false;
        };
    }

    /* USER */

    getUserList = function () {
        return this.userList;
    }

    /* PROJECT */

    createProject = function(title, _successLogin) {
        const newProject = new Project(title, _successLogin.username);
        const projectJson = {
            id: newProject.id,
            title: newProject.title,
            tasks: newProject.tasks,
            users: newProject.users,
            createdBy: newProject.createdBy,
        }
        this.projectList.push(projectJson);
        return projectJson;
    }

    getProjectList = function () {
        return this.projectList;
    }

    getProjectById = function(id) {
        const projectById = this.projectList.filter(project => project.id == id);
        if (projectById[0]) return projectById[0];
        else return false;
    }

    /* istrynus projekta, visos uzduotys (tasks), kurios priklause projektui, daugiau nera priskirtos jokiam projektui iki kito priskyrimo */
    deleteProjectById = function(id, _successLogin) {
        const projectById = this.projectList.filter(project => project.id == id);
        if (!projectById[0]) {
            console.log('Project does not exist...');
            return false;
        } else if (projectById[0].createdBy != _successLogin.username) {
            console.log('You can not delete projects of different user...');
            return false;
        } else {
            /* cia randame visus taskus, kurie buvo priskirti trinamam projektui ir juos padarome laisvais */
            const projectTasks = this.taskList.filter(task => task.projectId == projectById[0].id);
            projectTasks.forEach(projectTask => {
                const taskById = this.taskList.filter(task => projectTask.id == task.id);
                let index = this.taskList.indexOf(taskById[0]);
                this.taskList[index].projectId = null;
            });
            let index = this.projectList.indexOf(projectById[0]);
            /* antrasis splice elementas nurodo, kad trinsime tik viena elementa */
            (this.projectList).splice(index, 1);
            return true;
        }
    }

    updateProjectById = function (id, title, _successLogin) {
        const projectById = this.projectList.filter(project => project.id == id);
        if (!projectById[0]) {
            console.log('Defined project does not exist...');
            return false;
        } else if (projectById[0].createdBy != _successLogin.username) {
            console.log('You can not update projects of different user...');
            return false;
        } else if (projectById[0]) {
            let index = this.projectList.indexOf(projectById[0]);
            if (title != '') this.projectList[index].title = title;
            return this.projectList[index];
        } return false;
    }

    assignTaskToTheProject = function (projectId, taskId) {
        const projectById = this.projectList.filter(project => project.id == projectId);
        if (projectById[0]) {
            const taskById = this.taskList.filter(task => task.id == taskId);
            if (taskById[0]) {
                if (!(projectById[0].tasks.includes(taskId))) {
                    let projectIndex = this.projectList.indexOf(projectById[0]);
                    let taskIndex = this.taskList.indexOf(taskById[0]);
                    this.projectList[projectIndex].tasks.push(taskId);
                    /* atnaujine projekto tasku lista, kartu ir atnaujiname tasko objekta, kad jam butu priskirtas to projekto id */
                    this.taskList[taskIndex].projectId = projectId;
                    return this.projectList[projectIndex];
                } else {
                    console.log('Task is already assigned...');
                    return false;
                }
            } else {
                console.log('Task with given id does not exist');
                return false;
            }
        } else {
            console.log('Project with given id does not exist');
            return false;
        };
    }

    assignUserToTheProject = function (projectId, userId) {
        const projectById = this.projectList.filter(project => project.id == projectId);
        if (projectById[0]) {
            const userById = this.userList.filter(user => user.id == userId);
            if (userById[0]) {
                if (!(projectById[0].users.includes(userId))) {
                    let index = this.projectList.indexOf(projectById[0]);
                    this.projectList[index].users.push(userId);
                    return this.projectList[index];
                } else {
                    console.log('User is already assigned...');
                    return false;
                }
            } else {
                console.log('User with given id does not exist');
                return false;
            }
        } else {
            console.log('Project with given id does not exist');
            return false;
        };
    }
}

export default TodoList;