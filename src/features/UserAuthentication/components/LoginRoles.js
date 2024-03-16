import React from 'react'

const LoginRoles = (props) => {
  return (
    <div className='fixed z-10 inset-0 bg-opacity-70 bg-gray-200 
    flex justify-center items-center'>
    <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Choose Type</h2>
        <div className="flex flex-col gap-4">
          <button onClick={() => props.handleUserType('user')} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Login as User</button>
          <button onClick={() => props.handleUserType('admin')} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">Login as Admin</button>
        </div>
      </div>
    </div>
  )
}

export default LoginRoles