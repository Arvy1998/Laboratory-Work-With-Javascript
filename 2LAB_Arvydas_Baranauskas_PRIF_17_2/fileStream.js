const fs = require('fs');

/* LAIKINAI SAUGOME DUOMENIS FAILUOSE, KOL NEPRIEJOME PRIE LABORATORINIO DARBO KURTI DUOMENU BAZEI */

const savePersonData = async function(data) {
    fs.truncate('./data-export/Person.json', 0, function() {});
    fs.writeFile('./data-export/Person.json', JSON.stringify(data), (error) => { 
        if (error) throw error; 
    });
}

const saveCompanyData = async function(data) {
    fs.truncate('./data-export/Company.json', 0, function() {});
    fs.writeFile('./data-export/Company.json', JSON.stringify(data), (error) => { 
        if (error) throw error; 
    });
}

const saveTaskData = async function(data) {
    fs.truncate('./data-export/Task.json', 0, function() {});
    fs.writeFile('./data-export/Task.json', JSON.stringify(data), (error) => { 
        if (error) throw error; 
    });
}

const saveProjectData = async function(data) {
    fs.truncate('./data-export/Project.json', 0, function() {});
    fs.writeFile('./data-export/Project.json', JSON.stringify(data), (error) => { 
        if (error) throw error; 
    });
}

const saveUsersData = async function(data) {
    fs.truncate('./data-export/User.json', 0, function() {});
    fs.writeFile('./data-export/User.json', JSON.stringify(data), (error) => { 
        if (error) throw error; 
    });
}

/* SKAITYMAS IS FAILU */

const readPersonData = function() {
    return JSON.parse(fs.readFileSync('./data-export/Person.json').toString());
}

const readCompanyData = function() {
    return JSON.parse(fs.readFileSync('./data-export/Company.json').toString());
}

const readTaskData = function() {
    return JSON.parse(fs.readFileSync('./data-export/Task.json').toString());
}

const readProjectData = function() {
    return JSON.parse(fs.readFileSync('./data-export/Project.json').toString());
}

const readUsersData = function() {
    return JSON.parse(fs.readFileSync('./data-export/User.json').toString());
}

export { 
    savePersonData,
    saveCompanyData,
    saveTaskData,
    saveProjectData,
    saveUsersData,
    readUsersData,
    readTaskData,
    readProjectData,
    readPersonData,
    readCompanyData,
};