import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()

// I create Function to store Department  
const createDepartment = async (id,departmentName,location) => {
    try{
    const newDepartment =await client.department.create({
        data : {id : id,departmentName: departmentName,location : location}
    });
    console.log("Department created ",newDepartment);
    }catch(error){
        console.log("Error creating department",error);
    }
}

//Call function to store 
// createDepartment("DPT001", "Computer Science", "Nairobi Campus");
// createDepartment("DPT002", "Information Technology", "Mombasa Campus");
// createDepartment("DPT003", "Software Engineering", "Kisumu Campus");
// createDepartment("DPT004", "Cyber Security", "Eldoret Campus");
// createDepartment("DPT005", "Business Studies", "Nakuru Campus");
// createDepartment("DPT006", "Business and Finance", "Kisii Campus");

async function getDepartments(){
    try{
    const departments = await client.department.findMany({
        include : {
            employees : true
        }
    });
    console.log(departments);
    }catch(error){
        console.log("Error getting departments",error);
    }
}
//getDepartments()

async function getDepartment(id){
    try{
    const department = await client.department.findUnique({
        where : {
            id : id
        }
    });
    if(!department){
        console.log("Department not found");
        return;
    }
    console.log(department);
    }catch(error){
        console.log("Error getting department",error);
    }
}

//getDepartment("DPT001")

//Delete Department
async function deleteDepartment(id) {
    try{
    const deletedDepartment = await client.department.delete({
        where: {
            id: id
        }
    });
    console.log(deletedDepartment);
    return deletedDepartment;
    }catch(error){
        console.log("Error deleting department",error);
    }   
}

//deleteDepartment("DPT001")

//Update Deparment
async function updateDepartment(id, location) {
    try{
    const updatedDepartment = await client.department.update({
        where: {
            id: id
        },
        data: {
            location: location
        }
    });
    console.log(updatedDepartment);
    return updatedDepartment;
    }catch(error){
        console.log("Error updating department",error);
    }
}

//updateDepartment("DPT004", "Murang'a Campus")

// Create Employee Function
async function createEmployee(id,firstName,lastName,email,salary,departmentId){
    try{
    const newEmployee = await client.employee.create({
        data : {id : id,firstName : firstName,lastName : lastName,email : email,salary : salary,departmentId : departmentId}
    });
    console.log(newEmployee);
}catch{
    console.log("Error Creating Employee",error)
}
}


//createEmployee("EMP001", "John", "Mwangi", "john.mwangi@company.com", 65000.00, "DPT001");
// createEmployee("EMP002", "Alice", "Otieno", "alice.otieno@company.com", 92000.00, "DPT002");
// createEmployee("EMP003", "Brian", "Kariuki", "brian.kariuki@company.com", 88000.00, "DPT003");
// createEmployee("EMP004", "Grace", "Mutua", "grace.mutua@company.com", 97000.00, "DPT004");
// createEmployee("EMP005", "Kevin", "Omondi", "kevin.omondi@company.com", 66000.00, "DPT005");
// createEmployee("EMP006", "Linda", "Njeri", "linda.njeri@company.com", 91000.00, "DPT001");
// createEmployee("EMP007", "Samuel", "Kiptoo", "samuel.kiptoo@company.com", 63000.00, "DPT002");
// createEmployee("EMP008", "Mary", "Wanjiku", "mary.wanjiku@company.com", 89000.00, "DPT003");
// createEmployee("EMP009", "Peter", "Kamau", "peter.kamau@company.com", 95000.00, "DPT004");
// createEmployee("EMP010", "Faith", "Achieng", "faith.achieng@company.com", 78000.00, "DPT005");
// createEmployee("EMP011", "Ann", "Chebet", "ann.chebet@company.com", 78000.00, "DPT003");

//Get All Employees
async function getEmployees(){
    try{
        const employees = await client.employee.findMany({
        include : {
            department : true
        }
    });
    console.log(employees);
}catch(error){
     console.log("No Employees Found",error);
}
}   
//getEmployees()

//Get Employees by Salary Range
async function getBySalaryRange(min, max) {
    try{
    if (min > max) {
        throw new Error("Minimum cannot be greater than maximum");
    }
    
    const employees = await client.employee.findMany({
        where: {
            salary: {
                gte: min,
                lte: max
            }
        }
    });
    
    console.log(employees);
    return employees;
}catch(error){
    console.log("Error Getting Employees",error)
}
}

getBySalaryRange(65000, 90000)

//Get Single Employee
async function getEmployee(id){
    try{
    const employee = await client.employee.findUnique({
        where : {
            id : id
        }
    });
    if(!employee){
        throw new Error("Employee not found")
    }
    console.log(employee);
}catch(error){
    console.log("Error Getting Employee",error)
}

}
//getEmployee("EMP001")

//Update Employee
async function updateEmployee(id, firstName, lastName, email, salary, departmentId) {
    try{
    const updatedEmployee = await client.employee.update({
        where: {
            id: id
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            salary: salary,
            departmentId: departmentId
        }
    });
    console.log(updatedEmployee);
    return updatedEmployee;
}catch(error){
    console.log("Error Updating Employee",error)
}
}

//updateEmployee("EMP001", "John", "Mwangi", "john.mwangi@company.com", 65000.00, "DPT001")

//Delete Employee
async function deleteEmployee(id) {
    try{
    const deletedEmployee = await client.employee.delete({
        where: {
            id: id
        }
    });
    console.log(deletedEmployee);
    return deletedEmployee;
}catch(error){
    console.log("Erro Deleting Employee",error)
}
}

//deleteEmployee("EMP011")



