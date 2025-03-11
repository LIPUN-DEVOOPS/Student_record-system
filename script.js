let students = [];

function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
            if (page === 'list.html') displayStudents();
        });
}

function saveStudent() {
    let rollNo = document.getElementById("rollNo").value;
    let name = document.getElementById("name").value;
    let branch = document.getElementById("branch").value;
    let year = document.getElementById("year").value;

    if (!rollNo || !name || !branch || !year) {
        alert("Please fill all fields");
        return;
    }

    let editIndex = document.getElementById("editIndex").value;
    if (editIndex === "") {
        students.push({ rollNo, name, branch, year });
    } else {
        students[editIndex] = { rollNo, name, branch, year };
    }

    // Show success message instead of opening list
    alert("Added Successfully!");

    // Clear form fields
    document.getElementById("editIndex").value = "";
    document.getElementById("rollNo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("year").value = "";
}

function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";
    students.forEach((student, index) => {
        let row = table.insertRow();
        row.innerHTML = `<td>${student.rollNo}</td>
                         <td>${student.name}</td>
                         <td>${student.branch}</td>
                         <td>${student.year}</td>
                         <td>
                             <button onclick="editStudent(${index})">Edit</button>
                             <button onclick="deleteStudent(${index})">Delete</button>
                         </td>`;
    });
}

function editStudent(index) {
    let student = students[index];
    loadPage('form.html');
    setTimeout(() => {
        document.getElementById("editIndex").value = index;
        document.getElementById("rollNo").value = student.rollNo;
        document.getElementById("name").value = student.name;
        document.getElementById("branch").value = student.branch;
        document.getElementById("year").value = student.year;
    }, 100);
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function searchStudent() {
      let searchValue = document.getElementById("search").value.toLowerCase();
      let table = document.getElementById("studentTable");
      table.innerHTML = "";
  
      let filteredStudents = students.filter(student =>
          student.rollNo.toLowerCase().includes(searchValue) ||
          student.name.toLowerCase().includes(searchValue) ||
          student.branch.toLowerCase().includes(searchValue) ||
          student.year.toLowerCase().includes(searchValue)
      );
  
      if (filteredStudents.length === 0) {
          table.innerHTML = `<tr><td colspan="4" class="text-center text-red-500 py-2">Invalid Student</td></tr>`;
          return;
      }
  
      filteredStudents.forEach(student => {
          let row = table.insertRow();
          row.innerHTML = `<td>${student.rollNo}</td>
                           <td>${student.name}</td>
                           <td>${student.branch}</td>
                           <td>${student.year}</td>`;
      });
  }
  