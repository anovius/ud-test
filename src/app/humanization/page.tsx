'use client'
import React, { useEffect, useState } from 'react';
import { notification, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import pythonService from '@/services/python.service';

export default function Humanization() {

  const [documents, setDocuments] = useState([
    "1679442132612x421836391157156350",
    "1679615690389x604091256678311200",
    "1679836748507x629222237725197300",
    "1679837098619x775076422364691600"
  ]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("1");

  const getDocuments = async () => {
    setLoading(true);
    try {
      let res = await pythonService.listDocuments(page);
      console.log(res);
    } catch (e) {
      console.error(e);
      notification.error({
        message: 'Error',
        description: 'Failed to retrieve documents',
        placement: 'topRight'
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDocuments();
  }, [page]);

  const columns = [
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      render: (_:any, __:any, index: number) => index + 1
    },
    {
      title: 'Document ID',
      dataIndex: 'document',
      key: 'document'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record:any) => (
        <EyeOutlined onClick={() => console.log('View document:', record.document)} style={{ cursor: 'pointer' }} />
      ),
    },
  ];

  const data = documents.map((doc, index) => ({
    key: index,
    document: doc
  }));

  return (
    <div style={{ width: '70%', margin: '0 auto', marginTop: 50 }}>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
}
