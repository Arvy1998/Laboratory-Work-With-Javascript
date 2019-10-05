let _answer, _username, _password, _successLogin;

var readline = require('readline');

const consoleStream = readline.createInterface(process.stdin, process.stdout);
const question = function(question) {
    return new Promise((response, reject) => {
        consoleStream.question(question, answer => {
            response(answer);
        })
    });
}

const runMenu = async function(todoList) {
    console.log('Welcome, please select your role: ');
    console.log('1 - Company;');
    console.log('2 - Person;');
    console.log('exit - Exit The Program.');
    _answer = await question('Your role is? ');
    await selectionOfUserType(_answer, todoList);
    return todoList;
}

const selectionOfUserType = async function(_answer, todoList) {
    if (_answer != 'exit') {
        if (_answer == 1) {
            console.log('Please enter your username and password:');
            _username = await question('Your username is? ');
            _password = await question('Your password is? ');
            try {
                _successLogin = todoList.loginCompany(_username, _password);
                if (_successLogin) {
                    await choiceModels(_successLogin, todoList, _answer);
                }
            } catch(error) {
                throw new Error('Incorrect username or password has been given...');
            }
        } else if (_answer == 2) {
            try {
                _successLogin = todoList.loginPerson(_username, _password);
                if (_successLogin) {
                    await choiceModels(_successLogin, todoList, _answer);
                }
            } catch(error) {
                throw new Error('Incorrect username or password has been given...');
            }
        } else {
            console.log('Bad input, please select correct number...');
            await runMenu(todoList);
        }
    } else console.log('Program execution stopped, please leave terminal by pressing CTRL + C');
}

const choiceModels = async function(_successLogin, todoList, _answer) {
    console.log('Please select a model you want to operate with:');
    console.log('1 - Company;');
    console.log('2 - Person;');
    console.log('3 - Project;');
    console.log('4 - Task;');
    console.log('5 - Display existing users;')
    console.log('6 - Logout.');
    const choice = await question('Your choice is? ');
    switch (choice) {
        case '1':
            await companyOperations(_successLogin, todoList);
            break;
        case '2':
            await personOperations(_successLogin, todoList);
            break;
        case '3':
            await projectOperations(_successLogin, todoList);
            break;
        case '4':
            await taskOperations(_successLogin, todoList);
            break;
        case '5':
            const allExistingUsers = await todoList.getUserList();
            console.log('All existing users:');
            console.log(allExistingUsers);
            await choiceModels(_successLogin, todoList, _answer);
            break;
        case '6':
            if (_answer == 1) {
                try {
                    todoList.logoutCompany(_successLogin.id);
                    console.log('Successfully logged out...');
                    runMenu(todoList);
                } catch(error) {
                    throw new Error('Internal error happened. Error: ' + error);
                }
            } else {
                try {
                    todoList.logoutPerson(_successLogin.id);
                    console.log('Successfully logged out...');
                    runMenu(todoList);
                } catch(error) {
                    throw new Error('Internal error happened. Error: ' + error);
                }
            }
            break;
        default:
            console.log('Bad input. Please make another choice...');
            await choiceModels(_successLogin, todoList);
            break;
    }
}

const companyOperations = async function(_successLogin, todoList) {
    console.log('Please select an operation you want to execute:');
    console.log('1 - Add new company;');
    console.log('2 - Display existing company;');
    console.log('3 - Display the list;');
    console.log('4 - Delete the company;');
    console.log('5 - Update company fields;');
    console.log('6 - Back to the models choice menu.');
    const choice = await question('Your choice is? ');
    switch (choice) {
        case '1':
            const username = await question('Enter username: ');
            const password = await question('Enter password: ');
            const title = await question('Enter title: ');
            const hqName = await question('Enter hqName: ');
            const hqSurname = await question('Enter hqSurname: ');
            const hqEmail = await question('Enter hqEmail: ');
            try {
                const newCompany = await todoList.registerCompany(username, password, title, hqName, hqSurname, hqEmail);
                console.log('Company created successfully, company body: ');
                console.log(newCompany);
                await companyOperations(_successLogin, todoList);
            } catch(error) {
                throw new Error('Internal error happened. Error: ' + error);
            }
            break;
        case '2':
            const id = await question('Enter company id value you want to display: ');
            try {
                const existingCompany = await todoList.getCompanyById(id);
                if (existingCompany) {
                    console.log('Company found: ');
                    console.log(existingCompany);
                    await companyOperations(_successLogin, todoList);
                } else {
                    console.log('Requested company does not exist...');
                    await companyOperations(_successLogin, todoList);
                }
            } catch(error) {
                throw new Error('Internal error happened. Error: ' + error);
            }
            break;
        case '3':
            try {
                const listOfCompanies = await todoList.getCompanyList();
                console.log('All of the existing companies: ');
                console.log(listOfCompanies);
                await companyOperations(_successLogin, todoList);
            } catch(error) {
                throw new Error('Internal error happened. Error: ' + error);
            }
            break;
        case '4':
            const idForDelete = await question('Enter the company id you want to delete: ');
            try {
                if (idForDelete != _successLogin.id) {
                    const companyDeleted = await todoList.deleteCompanyById(idForDelete);
                    if (companyDeleted) {
                        console.log('Company successfully deleted.');
                    } else console.log('Delete operation failed...');
                    await companyOperations(_successLogin, todoList);
                } else {
                    console.log('You can not delete yourself during active session...');
                    await companyOperations(_successLogin, todoList);
                }
            } catch(error) {
                throw new Error('Internal error happened. Error: ' + error);
            }
            break;
        case '5':
            const idForUpdate = await question('Enter the company id you want to update: ');
            try {
                if (idForUpdate != _successLogin.id) {
                    const usernameUpdate = await question('(If you want to keep old value, skip this field). Enter username: ');
                    const passwordUpdate = await question('(If you want to keep old value, skip this field). Enter password: ');
                    const titleUpdate = await question('(If you want to keep old value, skip this field). Enter title: ');
                    const hqNameUpdate = await question('(If you want to keep old value, skip this field). Enter hqName: ');
                    const hqSurnameUpdate = await question('(If you want to keep old value, skip this field). Enter hqSurname: ');
                    const hqEmailUpdate = await question('(If you want to keep old value, skip this field). Enter hqEmail: ');
                    const companyUpdated = await todoList.updateCompanyById(idForUpdate, usernameUpdate, passwordUpdate, titleUpdate, hqNameUpdate, hqSurnameUpdate, hqEmailUpdate);
                    if (companyUpdated) {
                        console.log('Company successfully updated. Updated company data: ');
                        console.log(companyUpdated);
                    } else console.log('Update operation failed...');
                    await companyOperations(_successLogin, todoList);
                } else {
                    console.log('You can not update yourself during active session...');
                    await companyOperations(_successLogin, todoList);
                }
            } catch(error) {
                throw new Error('Internal error happened. Error: ' + error);
            }
            break;
        case '6':
            await choiceModels(_successLogin, todoList, _answer);
            break;
        default:
            console.log('Bad input. Please make another choice...');
            await companyOperations(_successLogin, todoList);
            break;
    }
}

const personOperations = async function(_successLogin, todoList) {
    console.log('Please select an operation you want to execute:');
    console.log('1 - Add new person;');
    console.log('2 - Display existing person;');
    console.log('3 - Display the list;');
    console.log('4 - Delete the person;');
    console.log('5 - Update person fields;');
    console.log('6 - Back to the models choice menu.');
    const choice = await question('Your choice is? ');
    switch (choice) {
    case '1':
        const username = await question('Enter username: ');
        const password = await question('Enter password: ');
        const name = await question('Enter name: ');
        const surname = await question('Enter surname: ');
        const email = await question('Enter email: ');
        try {
            const newPerson = await todoList.registerPerson(username, password, name, surname, email);
            console.log('Person created successfully, person body: ');
            console.log(newPerson);
            await personOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '2':
        const id = await question('Enter person id value you want to display: ');
        try {
            const existingPerson = await todoList.getPersonById(id);
            if (existingPerson) {
                console.log('Person found: ');
                console.log(existingPerson);
                await personOperations(_successLogin, todoList);
            } else {
                console.log('Requested person does not exist...');
                await personOperations(_successLogin, todoList);
            }
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '3':
        try {
            const listOfPersons = await todoList.getPersonList();
            console.log('All of the existing companies: ');
            console.log(listOfPersons);
            await personOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '4':
        const idForDelete = await question('Enter the person id you want to delete: ');
        try {
            if (idForDelete != _successLogin.id) {
                const personDeleted = await todoList.deletePersonById(idForDelete);
                if (personDeleted) {
                    console.log('Person successfully deleted.');
                } else console.log('Delete operation failed...');
                await personOperations(_successLogin, todoList);
            } else {
                console.log('You can not delete yourself during active session...');
                await personOperations(_successLogin, todoList);
            }
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '5':
        const idForUpdate = await question('Enter the person id you want to update: ');
        try {
            if (idForUpdate != _successLogin.id) {
                const usernameUpdate = await question('(If you want to keep old value, skip this field). Enter username: ');
                const passwordUpdate = await question('(If you want to keep old value, skip this field). Enter password: ');
                const nameUpdate = await question('(If you want to keep old value, skip this field). Enter name: ');
                const surnameUpdate = await question('(If you want to keep old value, skip this field). Enter surname: ');
                const emailUpdate = await question('(If you want to keep old value, skip this field). Enter email: ');
                const personUpdated = await todoList.updatePersonById(idForUpdate, usernameUpdate, passwordUpdate, nameUpdate, surnameUpdate, emailUpdate);
                if (personUpdated) {
                    console.log('Person successfully updated. Updated person data: ');
                    console.log(personUpdated);
                } else console.log('Update operation failed...');
                await personOperations(_successLogin, todoList);
            } else {
                console.log('You can not update yourself during active session...');
                await personOperations(_successLogin, todoList);
            }
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '6':
        await choiceModels(_successLogin, todoList, _answer);
        break;
    default:
        console.log('Bad input. Please make another choice...');
        await personOperations(_successLogin, todoList);
        break;
    }
}

const taskOperations = async function(_successLogin, todoList) {
    console.log('Please select an operation you want to execute:');
    console.log('1 - Add new task;');
    console.log('2 - Display existing task;');
    console.log('3 - Display the list;');
    console.log('4 - Delete the task along child tasks;');
    console.log('5 - Update tasks fields;');
    console.log('6 - Assign child task for parent task;');
    console.log('7 - Remove child task from parent task;');
    console.log('8 - Back to the models choice menu.');
    const choice = await question('Your choice is? ');
    switch (choice) {
    case '1':
        const title = await question('Enter title: ');
        try {
            const newTask = await todoList.createTask(title, _successLogin);
            console.log('Task created successfully, task body: ');
            console.log(newTask);
            await taskOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '2':
        const id = await question('Enter task id value you want to display: ');
        try {
            const existingTask = await todoList.getTaskById(id);
            if (existingTask) {
                console.log('Task found: ');
                console.log(existingTask);
                await taskOperations(_successLogin, todoList);
            } else {
                console.log('Requested task does not exist...');
                await taskOperations(_successLogin, todoList);
            }
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '3':
        try {
            const listOfTasks = await todoList.getTaskList();
            console.log('All of the existing tasks: ');
            console.log(listOfTasks);
            await taskOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '4':
        const idForDelete = await question('Enter the task id you want to delete: ');
        try {
            const taskDeleted = await todoList.deleteTaskById(idForDelete, _successLogin);
            if (taskDeleted) {
                console.log('Task successfully deleted.');
            } else console.log('Delete operation failed...');
            await taskOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '5':
        const idForUpdate = await question('Enter the task id you want to update: ');
        try {
            const titleUpdate = await question('(If you want to keep old value, skip this field). Enter title: ');
            const taskUpdated = await todoList.updateTaskById(idForUpdate, titleUpdate, _successLogin);
            if (taskUpdated) {
                console.log('Task successfully updated. Updated task data: ');
                console.log(taskUpdated);
            } else console.log('Update operation failed...');
            await taskOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '6':
        try {
            const parentTaskId = await question('Enter parent task id: ');
            const childTaskId = await question('Enter child task id: ');
            const taskInserted = await todoList.assignChildTask(parentTaskId, childTaskId);
            if (taskInserted) {
                console.log('Child task successfully inserted into parent task, this is how it looks like:');
                console.log(taskInserted);
            } else console.log('Insertion operation failed...');
            await taskOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '7':
        try {
            const parentTaskId_ = await question('Enter parent task id: ');
            const childTaskId_ = await question('Enter child task id: ');
            const taskRemoved = await todoList.deleteChildTask(parentTaskId_, childTaskId_);
            if (taskRemoved) {
                console.log('Child task successfully removed from parent task, this is how it looks like now:');
                console.log(taskRemoved);
            } else console.log('Deletion operation failed...');
            await taskOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '8':
        await choiceModels(_successLogin, todoList, _answer);
        break;
    default:
        console.log('Bad input. Please make another choice...');
        await taskOperations(_successLogin, todoList);
        break;
    }
}

const projectOperations = async function(_successLogin, todoList) {
    console.log('Please select an operation you want to execute:');
    console.log('1 - Add new project;');
    console.log('2 - Display existing project;');
    console.log('3 - Display the list;');
    console.log('4 - Delete the project;');
    console.log('5 - Update project fields;');
    console.log('6 - Assign user to the project.');
    console.log('7 - Assign task to the project.');
    console.log('8 - Back to the models choice menu.');
    const choice = await question('Your choice is? ');
    switch (choice) {
    case '1':
        const title = await question('Enter title: ');
        try {
            const newProject = await todoList.createProject(title, _successLogin);
            console.log('Project created successfully, project body: ');
            console.log(newProject);
            await projectOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '2':
        const id = await question('Enter project id value you want to display: ');
        try {
            const existingProject = await todoList.getProjectById(id);
            if (existingProject) {
                console.log('Project found: ');
                console.log(existingProject);
                await projectOperations(_successLogin, todoList);
            } else {
                console.log('Requested project does not exist...');
                await projectOperations(_successLogin, todoList);
            }
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '3':
        try {
            const listOfProjects = await todoList.getProjectList();
            console.log('All of the existing projects: ');
            console.log(listOfProjects);
            await projectOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '4':
        const idForDelete = await question('Enter the project id you want to delete: ');
        try {
            const projectDeleted = await todoList.deleteProjectById(idForDelete, _successLogin);
            if (projectDeleted) {
                console.log('Project successfully deleted.');
            } else console.log('Delete operation failed...');
            await projectOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '5':
        const idForUpdate = await question('Enter the project id you want to update: ');
        try {
            const titleUpdate = await question('(If you want to keep old value, skip this field). Enter title: ');
            const projectUpdated = await todoList.updateProjectById(idForUpdate, titleUpdate, _successLogin);
            if (projectUpdated) {
                console.log('Project successfully updated. Updated task data: ');
                console.log(projectUpdated);
            } else console.log('Update operation failed...');
            await projectOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '6':
        try {
            const projectId = await question('Enter the project id: ');
            const userId = await question('Enter the user id: ');
            const userAssigned = await todoList.assignUserToTheProject(projectId, userId);
            if (userAssigned) {
                console.log('User successfully assigned to the project. Here is the user id inside projects body:');
                console.log(userAssigned);
            } else console.log('Assignment operation failed...');
            await projectOperations(_successLogin, todoList);
        } catch(error) {
            throw new Error('Internal error happened. Error: ' + error);
        }
        break;
    case '7':
            try {
                const projectId_ = await question('Enter the project id: ');
                const taskId = await question('Enter the task id: ');
                const taskAssigned = await todoList.assignTaskToTheProject(projectId_, taskId);
                if (taskAssigned) {
                    console.log('Task successfully assigned to the project. Here is the task id inside projects body:');
                    console.log(taskAssigned);
                } else console.log('Assignment operation failed...');
                await projectOperations(_successLogin, todoList);
            } catch(error) {
                throw new Error('Internal error happened. Error: ' + error);
            }
        break;
    case '8':
        await choiceModels(_successLogin, todoList, _answer);
        break;
    default:
        console.log('Bad input. Please make another choice...');
        await projectOperations(_successLogin, todoList);
        break;
    }
}

export default runMenu;