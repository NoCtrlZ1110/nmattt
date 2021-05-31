import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import * as bigintCryptoUtils from 'bigint-crypto-utils';
import { mod } from '../utils/extendedEuclid';

const SignElgama = () => {
  const [x, setX] = useState<any>();
  const [p, setP] = useState<any>();
  const [a, setA] = useState<any>();
  const [k, setK] = useState<any>();
  const [alpha, setAlpha] = useState<any>();
  const [beta, setBeta] = useState<any>();
  const [ed, setED] = useState<any>();
  const [ed2, setED2] = useState<any>();
  const [s1, setS1] = useState<any>();
  const [s2, setS2] = useState<any>();

  const reset = () => {
    setA('');
    setX('');
    setP('');
    setK('');
    setAlpha('');
    setBeta('');
    setED('');
    setS1('');
    setS2('');
  };

  const autoFill = () => {
    setX('2035');
    setP('2357');
    setA('1751');
    setK('1523');
    setAlpha('2');
  };

  useEffect(() => {
    try {
      setBeta(
        bigintCryptoUtils
          .modPow(
            BigInt(alpha || 99999),
            BigInt(a || 99999),
            BigInt(p || 99999)
          )
          .toString()
      );
    } catch (error) {
      console.log(error);
    }
  }, [alpha, a, p]);

  useEffect(() => {
    try {
      setED(
        bigintCryptoUtils
          .modInv(BigInt(k || 99999), BigInt(p - 1 || 99999))
          .toString()
      );
    } catch (error) {
      console.log(error);
    }
  }, [k, p]);

  useEffect(() => {
    try {
      setS1(
        bigintCryptoUtils
          .modPow(
            BigInt(alpha || 99999),
            BigInt(k || 99999),
            BigInt(p || 99999)
          )
          .toString()
      );
    } catch (error) {
      console.log(error);
    }
  }, [alpha, k, p]);

  useEffect(() => {
    try {
      setED2(mod(x - a * s1, p - 1).toString());
    } catch (error) {
      console.log(error);
    }
  }, [a, p, s1, x]);

  useEffect(() => {
    try {
      setS2(
        ((
          BigInt(ed2 || 99999) *
          bigintCryptoUtils.modInv(BigInt(k || 99999), BigInt(p - 1 || 99999))
        ).toString() as any) %
          (p - 1)
      );
    } catch (error) {
      console.log(error);
    }
  }, [ed2, k, p]);

  return (
    <div>
      <h3 className='mb-4'>
        <b>Ký văn bản X bằng hệ mật Elgamal</b>
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
          value={a}
          onChange={(e) => setA(e.target.value)}
          addonBefore='a'
          placeholder='Nhập a'
          type='number'
        />
        <Input
          value={k}
          onChange={(e) => setK(e.target.value)}
          addonBefore='k'
          placeholder='Nhập k'
          type='number'
        />
        <Input
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          addonBefore='alpha'
          placeholder='Nhập alpha'
          type='number'
        />
      </Space>
      <hr />
      <p>
        <b>Bản rõ x = {x || 'undefined'}</b>
      </p>
      <p>
        <b>Phần tử nguyên thủy: alpha = </b>
        {alpha}
      </p>
      <p>
        <b>Cặp khóa công khai để kiểm tra chữ ký: (alpha, beta, p) = </b> (
        {alpha} , {beta} , {p})
      </p>
      <p>
        <b>Cặp khóa bí mật để ký: (a, k) = </b> ({a} , {k})
      </p>
      <p>
        <b>s1= </b> {s1}
      </p>
      <p>
        <b>egcd(k, p - 1) mod p - 1 = </b> {ed}
      </p>
      <p>
        <b>(x - a * s) mod p - 1 = </b> {ed2}
      </p>
      <p>
        <b>(s1,s2) =(alpha ^ k mod p, (x - a * s1) * (k ^ -1) = </b> ({s1} ,{' '}
        {s2})
      </p>

      <hr />
      {s1 && s2 && (
        <h4 className='text-danger'>
          =&gt; Chữ ký trên x: (s1,s2) = ({s1} , {s2})
        </h4>
      )}
    </div>
  );
};

export default SignElgama;
