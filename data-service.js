var employees = [];
var departments = [];
var managers = [];

const fs = require('fs');
var filepath;

function initialize(){
    return new Promise((resolve,reject) => {
        fs.readFile('./data/employees.json',(err,data) => {
            if(err){
                reject(err);
            }else{
                try {
                  employees = JSON.parse(data);
                  resolve(employees);
                } catch (err) {
                    reject('Unable to read file');
                }
            }
        });
        fs.readFile('./data/departments.json',(err,data) => {
            if(err){
                reject(err);
            }else{
                try {
                  departments = JSON.parse(data);  
                  resolve(departments);
                } catch (err) {
                    reject('Unable to read file');
                }
            }
        });
    });
};

function getAllEmployees(){
    return new Promise((resolve,reject) => {
        try {
            resolve(employees);
        } catch (error) {
            reject("no result returned");
        }
    });
};

function getManagers(){
    return new Promise((resolve,reject) => {
        try {
            resolve(employees);
        } catch (error) {
            reject("no result returned");
        }
    });
};

function getDepartments(){
    return new Promise((resolve,reject) => {
        try {
            resolve(departments);
        } catch (error) {
            reject("no result returned");
        }
    });
}

module.exports = {
    getDepartments:getDepartments,
    getManagers:getManagers,
    getAllEmployees:getAllEmployees,
    initialize:initialize 
}