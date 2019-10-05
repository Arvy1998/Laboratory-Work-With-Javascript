import TodoList from './models/todoList';
import { 
    savePersonData,
    saveCompanyData,
    saveTaskData,
    saveProjectData,
    saveUsersData,
    readUsersData,
    readTaskData,
    readProjectData,
    readPersonData,
    readCompanyData
} from './fileStream';
import runMenu from './console-interface';

let personArray, companyArray, taskArray, projectArray, userArray;
const todoList = new TodoList();

/* PRIES PALEIDIMA NUSKAITOME DUOMENIS IS FAILU */

const readAllDataBeforeEnter = function() {
    try {
        personArray = readPersonData();
        companyArray = readCompanyData();
        taskArray = readTaskData();
        projectArray = readProjectData();
        userArray = readUsersData();
    } catch(error) {
        console.error('Error while reading file: ' + error);
    }
}

const omitListsForUsage = function () {
    return { personArray, companyArray, taskArray, projectArray, userArray };
}

export default omitListsForUsage;

/* GAUTUS DUOMENIS IS FAILU JUOS PARUOSIAME NAUDOJIMUI PROGRAMOS VIDUJE */

readAllDataBeforeEnter();
todoList.initData();

/* PALEIDZIAME MENIU */

/* jeigu kursite naujus userius, nepamirskite, jog programa neleis sukurti to pacio userio su pasikartojanciu username,
   to reikia, kad uztikrinti, jog loginas tikrins tik unique fieldus */

    /* demo duomenys */

// todoList.registerCompany(1, '1', 1, 1, 1, 1);
// todoList.registerCompany(55, '1', 1, 1, 1, 1);
// todoList.registerCompany('Company1', '456875', 1, 1, 1, 1);

// todoList.registerPerson(2, '1', 1, 1, 1);
// todoList.registerPerson(5888, '1', 1, 1, 1);

// todoList.createTask('title', {username: 44, password: '123456'});
// todoList.createTask('title2', {username: 1, password: '0012122'});
// todoList.createTask('title3', {username: 1, password: '1212445'});

// todoList.createProject('PPtitle', {username: 44, password: '45484tt45'});
// todoList.createProject('PPtitle2', {username: 55, password: 'admin123'});
// todoList.createProject('PPtitle3', {username: 1, password: 'nginx'});
// todoList.registerPerson(1, '1', 1, 1, 1);
// todoList.registerPerson(1, '1', 1, 1, 1);

runMenu(todoList);

/* PRIES ISJUNGIMA DUOMENIS ISSAUGOME FAILUOSE */

const saveAllDataBeforeExit = async function() {
    try {
        await Promise.all([
            savePersonData(todoList.getPersonList()),
            saveCompanyData(todoList.getCompanyList()),
            saveTaskData(todoList.getTaskList()),
            saveProjectData(todoList.getProjectList()),
            saveUsersData(todoList.getUserList())
        ]);
    } catch(error) {
        console.error(error);
    }
}

saveAllDataBeforeExit();