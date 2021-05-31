import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import bigInt from 'big-integer';

const SignCheckElgamal = () => {
  const [x, setX] = useState<any>();
  const [p, setP] = useState<any>();
  const [alpha, setAlpha] = useState<any>();
  const [beta, setBeta] = useState<any>();
  const [s1, setS1] = useState<any>();
  const [s2, setS2] = useState<any>();
  const [VT, setVT] = useState<any>();
  const [VP, setVP] = useState<any>();
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (!(beta && p && s1 && s2)) {
      return;
    }
    setVT(
      bigInt(beta)
        .modPow(s1, p)
        .multiply(bigInt(s1).modPow(s2, p))
        .mod(p)
        .toString()
    );
  }, [beta, p, s1, s2]);

  useEffect(() => {
    if (!(alpha && p && x)) {
      return;
    }
    setVP(bigInt(alpha).modPow(x, p).toString());
  }, [alpha, p, x]);

  useEffect(() => {
    if (!(VP && VT)) {
      return;
    }
    setCheck(VT === VP);
  }, [VP, VT]);

  const reset = () => {
    setX('');
    setP('');
    setAlpha('');
    setBeta('');
    setS1('');
    setS2('');
  };

  const autoFill = () => {
    setX('2035');
    setP('2357');
    setAlpha('2');
    setBeta('1185');
    setS1('2012');
    setS2('1605');
  };

  return (
    <div>
      <h3 className='mb-4'>
        <b>Kiểm tra chữ ký</b>
      </h3>
      <Space>
        <Button onClick={autoFill}>Example (Auto Fill)</Button>
        <Button onClick={reset}>Clear All</Button>
      </Space>
      <hr />
      <Space className='w-100' direction='vertical' size='large'>
        <Input
          value={x}
          onChange={(e) => setX(e.target.value)}
          addonBefore='x'
          placeholder='Nhập bản rõ x'
          type='number'
        />
        <Input
          value={p}
          onChange={(e) => setP(e.target.value)}
          addonBefore='p'
          placeholder='Nhập p'
          type='number'
        />
        <Input
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          addonBefore='alpha'
          placeholder='Nhập alpha'
          type='number'
        />
        <Input
          value={beta}
          onChange={(e) => setBeta(e.target.value)}
          addonBefore='beta'
          placeholder='Nhập beta'
          type='number'
        />
        <Input
          value={s1}
          onChange={(e) => setS1(e.target.value)}
          addonBefore='s1'
          placeholder='Nhập s1'
          type='number'
        />
        <Input
          value={s2}
          onChange={(e) => setS2(e.target.value)}
          addonBefore='s2'
          placeholder='Nhập s2'
          type='number'
        />
      </Space>
      <hr />
      <div>
        <p>
          <b>
            Verify (x, s2, s2) = đúng &lt;=&gt;{' '}
            <code>(beta ^ s1) * (s1 ^ s2) mod p = alpha ^ x mod p</code>
          </b>
        </p>
      </div>
      <div>
        <p>
          <b>(beta ^ s1) * (s1 ^ s2) mod p = </b>({beta} ^ {s1}) * ({s1} ^ {s2})
          mod {p} = {VT}
        </p>
        <p>
          <b>alpha ^ x mod p = </b> {alpha} ^ {x} mod {p} = {VP}
        </p>
      </div>

      {check ? (
        <h4 className='text-danger'>
          <b>Chữ ký hợp lệ</b>
        </h4>
      ) : (
        <h4 className='text-danger'>
          <b>Chữ ký không hợp lệ</b>
        </h4>
      )}
    </div>
  );
};

export default SignCheckElgamal;
