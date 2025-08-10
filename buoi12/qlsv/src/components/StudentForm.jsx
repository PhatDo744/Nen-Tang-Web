import React, { useEffect, useState } from "react";

const StudentForm = ({ students, isEditting, edittingStudent, onAdd, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        studentId: "",
        name: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        note: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditting && edittingStudent) {
            setFormData({
                studentId: edittingStudent.studentId,
                name: edittingStudent.name,
                email: edittingStudent.email,
                dateOfBirth: edittingStudent.dateOfBirth,
                gender: edittingStudent.gender,
                note: edittingStudent.note
            });
        } else {
            setFormData({
                studentId: "",
                name: "",
                email: "",
                dateOfBirth: "",
                gender: "",
                note: ""
            });
        }

        setErrors({});
    }, [isEditting, edittingStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.studentId.trim()) {
            newErrors.studentId = "Mã sinh viên không được để trống";
        } else if (!formData.studentId.startsWith('SV')) {
            newErrors.studentId = "Mã sinh viên phải bắt đầu bằng 'SV'";
        } else if (formData.studentId.length < 4) {
            newErrors.studentId = "Mã sinh viên phải có ít nhất 4 ký tự (VD: SV01)";
        } else {
            const existingStudent = students.find(student =>
                student.studentId === formData.studentId &&
                (!isEditting || student.id !== edittingStudent?.id)
            );

            if (existingStudent) {
                newErrors.studentId = "Mã sinh viên đã tồn tại, vui lòng chọn mã khác";
            }
        }

        if (!formData.name.trim()) {
            newErrors.name = "Tên sinh viên không được để trống";
        } else if (formData.name.length < 2) {
            newErrors.name = "Tên sinh viên phải có ít nhất 2 ký tự";
        } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(formData.name.trim())) {
            newErrors.name = "Tên sinh viên chỉ được nhập chữ, không được nhập số hoặc ký tự đặc biệt";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không đúng định dạng";
        }
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Ngày sinh không được để trống";
        } else {
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 16 || age > 100) {
                newErrors.dateOfBirth = "Tuổi phải từ 16 đến 100";
            }
        }
        if (!formData.gender) {
            newErrors.gender = "Vui lòng chọn giới tính";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (isEditting) {

            const updatedStudent = {
                ...formData,
                id: edittingStudent.id
            };
            onUpdate(updatedStudent);
        } else {
            onAdd(formData);
            // RESET FORM VỀ TRỐNG SAU KHI THÊM THÀNH CÔNG
            setFormData({
                studentId: "",
                name: "",
                email: "",
                dateOfBirth: "",
                gender: "",
                note: ""
            });
        }

        setErrors({});
    };

    return (
        <div className="form-container">
            <h2 className="section-header">
                {isEditting ? "Sửa sinh viên" : "Thêm sinh viên"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="studentId" className="form-label">Mã sinh viên:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                    />
                    {errors.studentId && (
                        <div className="invalid-feedback">
                            {errors.studentId}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sinh viên:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {errors.email}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">Ngày sinh:</label>
                    <input
                        type="date"
                        className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    {errors.dateOfBirth && (
                        <div className="invalid-feedback">
                            {errors.dateOfBirth}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Giới tính:</label>
                    <div className="d-flex flex-wrap gap-3 mt-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender_male"
                                value="Nam"
                                checked={formData.gender === 'Nam'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="gender_male">Nam</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender_female"
                                value="Nữ"
                                checked={formData.gender === 'Nữ'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="gender_female">Nữ</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender_other"
                                value="Khác"
                                checked={formData.gender === 'Khác'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="gender_other">Khác</label>
                        </div>
                    </div>
                    {errors.gender && (
                        <div className="text-danger small mt-1">
                            {errors.gender}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="note" className="form-label">Ghi chú:</label>
                    <textarea
                        className="form-control"
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
                    <button type="submit" className="btn btn-custom btn-hover">
                        {isEditting ? "Cập nhật" : "Thêm sinh viên"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;