import { useState } from 'react';
import Header from './components/header.jsx'
import StudentTable from './components/StudentTable.jsx';
import './App.css'

function App() {
  const [danhSach] =  useState([
    {ten: "Nguyễn Văn A", email: "a@gmail.com"},
    {ten: "Nguyễn Văn B", email: "b@gmail.com"},
    {ten: "Nguyễn Văn C", email: "c@gmail.com"}
  ]);

  return (
    <div className='App'>
      <Header></Header>
      <main>
        <StudentTable danhSach={danhSach}></StudentTable>
      </main>
    </div>
  );
}

export default App;
