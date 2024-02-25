import React, { useEffect } from 'react';
import { GetCurrentUser } from '../apis/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserName } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '../redux/usersSlice';
import { SetLoading } from '../redux/loadersSlice';

function ProtectedPage({ children }) {
  const { currentUser } = useSelector((state) => state.users); // Corrected state.users
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCurrentUser();
    } else {
      navigate('/login');
    }
  }, []);

  return (
    currentUser && (
      <div>
        {/* Header */}
        <div className='p-2 md:p-4 flex justify-between items-center bg-primary text-white rounded-md'>
          <div>
            <h1 className='text-xl md:text-2xl uppercase cursor-pointer' onClick={() => navigate('/')}>Remedy Blood Bank</h1>
            <span className='text-xs md:text-sm font-bold'>{currentUser.userType.toUpperCase()}</span>
          </div>
  
          <div className='flex items-center gap-1'>
            <i className="ri-shield-user-line"></i>
            <div className='flex flex-col'>
              <span 
                className='text-sm md:text-md mr-2 md:mr-5 cursor-pointer'
                onClick={() => navigate('/profile')}
              >
                {getLoggedInUserName(currentUser).toUpperCase()}
              </span>
            </div>
            <i
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }} 
              className="mr-5 ri-logout-circle-r-line text-lg cursor-pointer"></i>
          </div>
        </div>
  
        {/* Body */}
        <div className='px-5 py-2'>{children}</div>
      </div>
    )
  );
}  

export default ProtectedPage;
