import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';

export const getColumnSearchProps = () => {
  let searchInput: Input | null = null;
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder="جست و جو"
          value={selectedKeys[0]}
          onPressEnter={() => confirm()}
          onChange={e => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginLeft: 8 }}
        >
          بگرد
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          ریست
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput?.select());
      }
    },
  };
};
