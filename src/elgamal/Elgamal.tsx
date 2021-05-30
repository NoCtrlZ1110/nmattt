import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import * as bigintCryptoUtils from 'bigint-crypto-utils';
import { mod } from '../utils/extendedEuclid';

const Elgamal = () => {
  const [x, setX] = useState<any>();
  const [p, setP] = useState<any>();
  const [a, setA] = useState<any>();
  const [k, setK] = useState<any>();
  const [alpha, setAlpha] = useState<any>();
  const [beta, setBeta] = useState<any>();
  const [gamma, setGamma] = useState<any>();
  const [delta, setDelta] = useState<any>();
  const [gamma2, setGamma2] = useState<any>();
  const [x2, setX2] = useState<any>();

  const reset = () => {
    setP('');
    setA('');
    setK('');
    setX('');
    setAlpha('');
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
    } catch (error) {}
  }, [alpha, a, p]);

  useEffect(() => {
    try {
      setGamma(
        bigintCryptoUtils
          .modPow(
            BigInt(alpha || 99999),
            BigInt(k || 99999),
            BigInt(p || 99999)
          )
          .toString()
      );
    } catch (error) {}
  }, [alpha, k, p]);

  useEffect(() => {
    setDelta(
      (x *
        (bigintCryptoUtils
          .modPow(BigInt(beta || 99999), BigInt(k || 99999), BigInt(p || 99999))
          .toString() as any)) %
        p
    );
  }, [beta, k, p, x]);

  useEffect(() => {
    if (!(gamma & p & a)) {
      return;
    }
    try {
      setGamma2(
        bigintCryptoUtils
          .modPow(
            BigInt(gamma || 99999),
            BigInt(p - a - 1 || 99999),
            BigInt(p || 99999)
          )
          .toString()
      );
    } catch (error) {}
  }, [gamma, p, a]);

  useEffect(() => {
    try {
      setX2(mod(gamma2 * delta, p));
    } catch (error) {}
  }, [gamma2, delta, p]);

  return (
    <div>
      <h3 className='mb-4'>
        <b>Xây dựng hệ mật Elgamal</b>
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
          placeholder={`Nhập a < p ${p ? `= ${p}` : ``}`}
          type='number'
        />
        <Input
          value={k}
          onChange={(e) => setK(e.target.value)}
          addonBefore='k'
          placeholder={`Nhập k < p ${p ? `= ${p}` : ``}`}
          type='number'
        />
        <Input
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          addonBefore='α'
          placeholder='Nhập alpha (α)'
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
          <b>a = {a || 'undefined'}</b>
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
          Khóa công khai β = α ^ a mod p = {alpha} ^ {a} mod {p} = {beta}
        </p>
        <p>
          Mã khóa công khai = (p,α,β) = ({p},{alpha},{beta})
        </p>
        <p>Mã khóa bí mật = (a) = ({a})</p>
      </div>
      <hr />
      <div>
        <h4>
          <b>Lập mã</b>
        </h4>
        <p>
          γ = a^k mod p = {a} ^ {k} mod {p} = {gamma}
        </p>
        <p>
          δ = x * β ^ K mod p = {x} * {beta} ^ {k} mod {p} = {delta}
        </p>
        <p>
          Nhận được bản mã (γ,δ) = ({gamma} , {delta})
        </p>
      </div>
      <hr />
      <div>
        <h4>
          <b>Giải mã</b>
        </h4>
        <p>
          y ^ -a mod p = γ^(p-1-a) mod p = γ ^ (p-a-1) mod p = {gamma} ^ ({p}-
          {a}-1) mod {p} = {gamma2}
        </p>
        <b>
          <p>x = γ ^ (-a) * δ = {x2}</p>
        </b>
        <h4 className='text-danger'>
          <b>x = {x2}</b>
        </h4>
      </div>
    </div>
  );
};

export default Elgamal;
