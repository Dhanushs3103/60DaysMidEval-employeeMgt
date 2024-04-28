let tbody = document.getElementById("tbody");
let page = 1;
let previousBtn = document.getElementById("Previous");
let nextBtn = document.getElementById("Next");
let empDepartment = document.getElementById("departments");
let empGender = document.getElementById("gender");
let empSalary = document.getElementById("salarySort");
let API_URL_FOR_PAGINATION = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees`;
let API_URL_DEFAULT = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`;

//  adding eventListeners to filter by department:
empDepartment.addEventListener("change",filterByDepartment);

//  adding eventListeners to filter by gender:
empGender.addEventListener("change",filterByGender);

//  adding eventListeners to sort by salary:
empSalary.addEventListener("change",findSortValue);

// adding eventListeners to previous and next buttons:
previousBtn.addEventListener("click",function(){
    // console.log("prev");
    page--;
    handlePrevious(page)
   
})

nextBtn.addEventListener("click",function() {
    page++;
    handleNext(page);
})

// function to Previous button:
async function handlePrevious(pageNo) {
    if(pageNo === 1) {
        previousBtn.disabled = true;
    }else if(pageNo < 10 ){
        nextBtn.disabled = false;
    }
        try {
            let res = await getData(`${API_URL_FOR_PAGINATION}?page=${pageNo}&limit=10`);
            // console.log(res.data);
            displayData(res.data);
           } catch (error) {
            console.log(error);
           }
}

// function to Next button:
async function handleNext(pageNo) {
    // console.log(pageNo);
    if(pageNo === 10) {
        nextBtn.disabled = true;
    }else if(pageNo > 1){
        previousBtn.disabled = false;
    }
        try {
            let res = await getData(`${API_URL_FOR_PAGINATION}?page=${pageNo}&limit=10`);
            // console.log(res.data);
            displayData(res.data)
           } catch (error) {
            console.log(error);
           }
}

// Invocking the init function:
init();

// function to get data:
async function getData(url) {
    try {
        let res = await fetch(url);
        let finalData = await res.json();
        return finalData;
    } catch (error) {
        console.log(error)
    }
}

// function to initialize data:

async function init (){
    try {
        let data = await getData(API_URL_DEFAULT);
        let mainData = data.data;
        displayData(mainData);
    } catch (error) {
        console.log(error)
    }
}

// function to display the data:

function displayData(employeesData) {
    // console.log(employeesData);
    tbody.innerHTML = "";
    // looping over the employeesData:
    employeesData.forEach(({id,department,gender,name,salary}) => {
    // table row :
    let tableRow = document.createElement("tr");

    // table data for serial number:
    let tdSerial_no = document.createElement("td");
    tdSerial_no.textContent = id;

    // table data for name:
    let tdName = document.createElement("td");
    tdName.textContent = name;

    // table data for gender:
    let tdGender = document.createElement("td");
    tdGender.textContent = gender;

    // table data for department:
    let tdDepartment = document.createElement("td");
    tdDepartment.textContent = department;

    // table data for salary:
    let tdSalary = document.createElement("td");
    tdSalary.textContent = salary;

    // appending to tabel row:
    tableRow.append(tdSerial_no,tdName,tdGender,tdDepartment,tdSalary);

    // appending to tbody:
    tbody.append(tableRow);

    });
}

// function to filter by department:
async function filterByDepartment(){
    let departmentValue = empDepartment.value;
    if(departmentValue === "all" || departmentValue === "" ) {
        try {
            // console.log(departmentValue)
            let res = await getData(API_URL_DEFAULT);
            // console.log(res.data);
            displayData(res.data);
        } catch (error) {
            console.log(error)
        }
    }else{
        try {
            // console.log(departmentValue)
            let res = await getData(`${API_URL_DEFAULT}&filterBy=department&filterValue=${departmentValue}`);
            // console.log(res.data);
            displayData(res.data);
        } catch (error) {
            console.log(error)
        }
    } 
}

// function to filter by gender:
async function filterByGender(){
    let genderValue = empGender.value;
    if(genderValue === "all" || genderValue === "" ) {
        try {
            // console.log(departmentValue)
            let res = await getData(API_URL_DEFAULT);
            // console.log(res.data);
            displayData(res.data);
        } catch (error) {
            console.log(error)
        }
    }else{
        try {
            // console.log(departmentValue)
            let res = await getData(`${API_URL_DEFAULT}&filterBy=gender&filterValue=${genderValue}`);
            // console.log(res.data);
            displayData(res.data);
        } catch (error) {
            console.log(error)
        }
    } 
}

// function to find the value of sort wheather it is desc or asc:
function findSortValue () {
    let sortValue = empSalary.value;

    if(sortValue === "desc") {
        sortDesc();
    }else if(sortValue === "asc"){
        sortAsc();
    }
}

// function to sort in assending order:
async function sortAsc(){
        try {
            // console.log(departmentValue)
            let res = await getData(`${API_URL_DEFAULT}&sort=salary&order=asc`);
            // console.log(res.data);
            displayData(res.data);
        } catch (error) {
            console.log(error)
        }
    
}

// function to sort in dessending order:
async function sortDesc(){
    try {
        // console.log(departmentValue)
        let res = await getData(`${API_URL_DEFAULT}&sort=salary&order=desc`);
        // console.log(res.data);
        displayData(res.data);
    } catch (error) {
        console.log(error)
    }

}