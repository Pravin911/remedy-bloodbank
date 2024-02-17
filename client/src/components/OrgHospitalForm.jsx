import { Form, Input } from 'antd';
import { Input as TextArea } from 'antd';
import React from 'react';

export default function OrgHospitalForm({ type }) {
  return (
    <>
      <Form.Item
        label={type === 'hospital' ? 'Hospital Name' : 'Organisation Name'}
        name={type === 'hospital' ? 'hospitalName' : 'organisationName'}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="owner"
        label="Owner"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="website"
        label="Website"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        className='col-span-2'
      >
        <TextArea />
      </Form.Item>
    </>
  );
}
