import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../redux/loadersSlice';
import {  message } from 'antd';
import { GetAllBloodGroupInventory } from '../../apis/dashboard';
import InventoryTable from '../../components/InventoryTable';

export default function Home() {
  const { currentUser } = useSelector((state) => state.users);
  const [bloodGroupsData, setbloodGroupsData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllBloodGroupInventory();
      dispatch(SetLoading(false));
      if(response.success) {
        setbloodGroupsData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const colors = [
    "#2D9596",
    "#436850",
    "#E8C872",
    "#B9E937",
    "#F4CE14",
    "#643A6B",
    "#AA530E",
    "#FF0075",
  ];

  return (
    <div>
      {currentUser.userType === 'organization' && (
        <>
          <div className='grid grid-cols-4 gap-5 mt-2 mb-2'>
        {
          bloodGroupsData.map((bloodGroup, index) => {
            const color = colors[index];
            return (
              <div className={`bg-${color} p-5 flex justify-between text-white rounded`}
                   style={{ backgroundColor: color }}>

                  <h1 className='text-5xl items-center uppercase'>
                    {bloodGroup.bloodGroup}
                  </h1>

                  <di className='flex flex-col justify-between gap-2'>
                    <div className='flex justify-between gap-5'>
                      <span>Total In</span>
                      <span>{bloodGroup.totalIn} ML</span>
                    </div>
                    <div className='flex justify-between gap-5'>
                      <span>Total Out</span>
                      <span>{bloodGroup.totalOut} ML</span>
                    </div>
                    <div className='flex justify-between gap-5'>
                      <span>Available</span>
                      <span>{bloodGroup.available} ML</span>
                    </div>
                  </di>

              </div>
            );
          })
        }
      </div>

      <span className='text-xl text-gray-700 font-semibold'>Your Recent Inventory</span>

      <InventoryTable className='mt-2 mb-2'
        filters={{
          organization: currentUser._id

        }}
        limit={5}
        userType={currentUser.userType}
        />
        </>
      )}

      {currentUser.userType === 'donar' && (
        <div className='mt-2 mb-2'>
          <span className='text-xl text-gray-700 font-semibold'>Your Recent Donations</span>

              <InventoryTable className='mt-2 mb-2'
                filters={{
                  donar: currentUser._id

                }}
                limit={5}
                userType={currentUser.userType}
                />
        </div>
      )}

      {currentUser.userType === 'hospital' && (
        <div className='mt-2 mb-2'>
          <span className='text-xl text-gray-700 font-semibold'>Your Recent Requests / Expenditure</span>

              <InventoryTable className='mt-2 mb-2'
                filters={{
                  hospital: currentUser._id

                }}
                limit={5}
                userType={currentUser.userType}
                />
        </div>
      )}
    </div>
  )
}
