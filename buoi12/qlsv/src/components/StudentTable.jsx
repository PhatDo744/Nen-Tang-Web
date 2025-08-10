import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <h2 className="section-header">Bảng hiển thị danh sách sinh viên</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th style={{borderTopLeftRadius: "10px"}}>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
                            <th>Email</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th style={{borderTopRightRadius: "10px"}}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.studentId}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.dateOfBirth}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => onEdit(student)}>Sửa</button>
                                    <button className="btn btn-danger" onClick={() => onDelete(student.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentTable;