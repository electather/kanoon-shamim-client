import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const customSelectRenderer = (menu: any, to: string) => (
  <div>
    {menu}
    <Divider style={{ margin: '4px 0' }} />
    <Link
      to={to}
      style={{
        width: '100%',
        padding: '8px',
        display: 'block',
      }}
    >
      <PlusOutlined /> اضافه کردن ایتم جدید
    </Link>
  </div>
);
