import { Input, Space } from 'antd';
import React, { useState } from 'react';

const RSA = () => {
  const [x, setX] = useState<any>();
  const [q, setQ] = useState<any>();
  const [p, setP] = useState<any>();
  const [e, setE] = useState<any>();

  return (
    <div>
      <h3 className='mb-4'>
        <b>Xây dựng hệ mật RSA</b>
      </h3>
      <Space className='w-100' direction='vertical' size='large'>
        <Input
          value={x}
          onChange={(e) => setX(e.target.value)}
          addonBefore='x'
          placeholder='Nhập bản rõ x'
        />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          addonBefore='q'
          placeholder='Nhập q'
        />
        <Input
          value={p}
          onChange={(e) => setP(e.target.value)}
          addonBefore='p'
          placeholder='Nhập p'
        />
        <Input
          value={e}
          onChange={(e) => setE(e.target.value)}
          addonBefore='e'
          placeholder='Nhập e'
        />
      </Space>
      <hr />
      <Space direction='vertical'>
        <div>
          <b>q = {q}</b>
        </div>
        <div>
          <b>p = {p}</b>
        </div>
        <div>
          <b>e = {e}</b>
        </div>
      </Space>
    </div>
  );
};

export default RSA;
