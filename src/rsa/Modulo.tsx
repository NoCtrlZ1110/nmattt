import { Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import * as bigintCryptoUtils from 'bigint-crypto-utils';

const ModuloCaculate = () => {
  const [x, setX] = useState<any>();
  const [y, setY] = useState<any>();
  const [n, setN] = useState<any>();
  const [e, setE] = useState<any>(65537);

  useEffect(() => {
    setY(
      bigintCryptoUtils
        .modPow(BigInt(x || 99999), BigInt(e || 99999), BigInt(n || 99999))
        .toString()
    );
  }, [x, e, n]);

  return (
    <div>
      <h3 className='mb-4'>
        <b>y = x ^ e mod n</b>
      </h3>
      <Space className='w-100' direction='vertical' size='large'>
        <Input
          value={e}
          onChange={(e) => setE(e.target.value)}
          addonBefore='e'
          placeholder='Nhập e'
          type='number'
        />
      </Space>
    </div>
  );
};

export default ModuloCaculate;
