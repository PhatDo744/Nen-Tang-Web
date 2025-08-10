import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Alert from "./components/Alert";

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [{
      id: 1,
      name: "Nguyen Van A",
      email: "nguyenvana@gmail.com",
      dateOfBirth: "2000-01-01",
      gender: "Nam",
    },
    {
      id: 2,
      name: "Nguyen Van B",
      email: "nguyenvanb@gmail.com",
      dateOfBirth: "2000-01-02",
      gender: "Nữ",
    },
    {
      id: 3,
      name: "Nguyen Van C",
      email: "nguyenvanc@gmail.com",
      dateOfBirth: "2000-01-03",
      gender: "Nam",
    }]
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const [isEditting, setIsEditting] = useState(false); 
  const [edittingStudent, setEdittingStudent] = useState(null);

  const saveToLocalStorage = (newStudents) => {
    localStorage.setItem("students", JSON.stringify(newStudents));
    setStudents(newStudents);
  };

  const showAlert = (message, type = "success") => {
    setAlert({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        type: "success"
      });
    }, 3000);
  };

  const handleAddStudent = (newStudent) => {
    // TẠO ID TỰ ĐỘNG CHO SINH VIÊN MỚI
    const studentWithId = {
      ...newStudent,
      id: Date.now()  // ← THÊM ID DUY NHẤT
    };
    
    const newStudents = [...students, studentWithId];
    saveToLocalStorage(newStudents);
    showAlert("Thêm sinh viên thành công", "success");
  };

  const handleUpdateStudent = (updatedStudent) => {
    const newStudents = students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    );
    saveToLocalStorage(newStudents);
    showAlert("Cập nhật sinh viên thành công", "success");
    setIsEditting(false);
    setEdittingStudent(null);
  };

  const handleDeleteStudent = (id) => {
    const newStudents = students.filter(student => student.id !== id);
    saveToLocalStorage(newStudents);
    showAlert("Xóa sinh viên thành công", "success");
  };

  const handleEditStudent = (student) => {
    setIsEditting(true);
    setEdittingStudent(student);
  };

  const handleCancel = () => {
    setIsEditting(false);
    setEdittingStudent(null);
  };

  return (
    <div className="App">
      <NavBar/>
      {alert.show && (
        <Alert 
        show={alert.show}
        message={alert.message}
        type={alert.type}
        />
      )}
      <div className="container-fluid p-3">
        <div className="row g-3">
          <div className="col-lg-4 col-md-12">
            <StudentForm 
            students={students}
            isEditting={isEditting}
            edittingStudent={edittingStudent}
            onAdd={handleAddStudent}
            onUpdate={handleUpdateStudent}
            onCancel={handleCancel}
            />
          </div>
          <div className="col-lg-8 col-md-12">
            <StudentTable 
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
