import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { Link } from 'react-router-dom';
import OrgHospitalForm from '../../components/OrgHospitalForm';

export default function Register() {

  const [ type, setType ] = React.useState('donar');
  const onFinish = (values) => {
    console.log(values);
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Form layout="vertical" className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2"
        onFinish={onFinish}
        >
        <h1 className="col-span-2 uppercase font-bold text-2xl">
          <span className="text-blue-300">{type.toUpperCase()} - Register </span>
          <hr />
        </h1>

        <Radio.Group onChange={(e) => setType(e.target.value)} value={type}
          className='col-span-2'>
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organisation">Organisation</Radio>
        </Radio.Group>

        {type === 'donar' && (
          <>
        
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Phone"  name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        </>
        )}

        {type !== 'donar' && <OrgHospitalForm type={type} />}

        <Button type="primary" block className='col-span-2'
         htmlType='submit'
        >
          Register
        </Button>
        <Link to="/login" className='col-span-2 text-center text-blue-500 hover:text-blue-300'>Already have an account?</Link>
      </Form>
    </div>
  )
}