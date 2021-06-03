import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import bigInt from 'big-integer';

const EncryptElgamal = () => {
  const [x, setX] = useState<any>();
  const [p, setP] = useState<any>();
  const [k, setK] = useState<any>();
  const [alpha, setAlpha] = useState<any>();
  const [beta, setBeta] = useState<any>();
  const [gamma, setGamma] = useState<any>();
  const [delta, setDelta] = useState<any>();

  const reset = () => {
    setP('');
    setK('');
    setX('');
    setAlpha('');
  };

  const autoFill = () => {
    setX('134542481841787419');
    setP('1000000000000000009');
    setK('7531594862');
    setAlpha('7');
    setBeta('609914260072147340');
  };

  useEffect(() => {
    if (!(alpha && k && p)) {
      return;
    }
    setGamma(bigInt(alpha).modPow(k, p).toString());
  }, [alpha, k, p]);

  useEffect(() => {
    if (!(beta && k && p && x)) {
      return;
    }
    setDelta(
      bigInt(beta)
        .modPow(k, p)
        .multiply(bigInt(x).modPow(1, p))
        .modPow(1, p)
        .toString()
    );
  }, [beta, k, p, x]);

  return (
    <div>
      <h3 className='mb-4'>
        <b>Mã hóa Elgamal</b>
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
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          addonBefore='α'
          placeholder='Nhập alpha (α)'
          type='number'
        />
        <Input
          value={beta}
          onChange={(e) => setBeta(e.target.value)}
          addonBefore='β'
          placeholder='Nhập beta (β)'
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
          value={k}
          onChange={(e) => setK(e.target.value)}
          addonBefore='k'
          placeholder='Nhập k'
          type='number'
        />
      </Space>
      <hr />

      <Space direction='vertical'>
        <div>
          <b>Bản rõ x = {x || 'undefined'}</b>
        </div>
        <div>
          <b>p = {p || 'undefined'}</b>
        </div>
        <div>
          <b>β = {beta || 'undefined'}</b>
        </div>
        <div>
          <b>k = {k || 'undefined'}</b>
        </div>
        <div>
          <b>alpha = {alpha || 'undefined'}</b>
        </div>
      </Space>
      <hr />

      <div>
        <p>
          γ = α^k mod p = {alpha} ^ {k} mod {p} = {gamma}
        </p>
        <p>
          δ = x * β ^ K mod p = {x} * {beta} ^ {k} mod {p} = {delta}
        </p>
        <h4 className='text-danger'>
          <b>
            Nhận được bản mã (γ,δ) = ({gamma} , {delta})
          </b>
        </h4>
      </div>
    </div>
  );
};

export default EncryptElgamal;
