import React from 'react';
import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader';
import './AdminSidebar.css';

const AdminMain = () => {
  

  return (
    <div className='bg-gray-100 flex'>
      <div >
        <AdminSideBar />
      </div>
      <AdminHeader />
    </div>
  );
};

export default AdminMain;
