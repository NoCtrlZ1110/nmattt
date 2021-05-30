import { Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
// import { multiply } from '../utils/bigNum';
import { gcd } from '../utils/extendedEuclid';
import { BigNumber } from 'bignumber.js';
import * as bigintCryptoUtils from 'bigint-crypto-utils';

const RSA = () => {
  const [p, setP] = useState<any>(
    '60189309855228152582080418108842142489913101192853892029893420328887351871793'
  );
  const [q, setQ] = useState<any>(
    '74714197566136059701452833471216875182865235128709397697022189913844351225357'
  );
  const [m, setM] = useState<any>();
  const [g, setG] = useState<any>();
  const [d, setD] = useState<any>();
  const [de, setDe] = useState<any>();
  const [x, setX] = useState<any>();
  const [y, setY] = useState<any>();
  const [n, setN] = useState<any>();
  const [e, setE] = useState<any>(65537);

  useEffect(() => {
    setN(new BigNumber(p).multipliedBy(q).toFixed());
    setM(
      new BigNumber(new BigNumber(p).minus(1))
        .multipliedBy(new BigNumber(q).minus(1))
        .toFixed()
    );
  }, [p, q]);

  useEffect(() => {
    setG(gcd(e, m));
    try {
      setD(
        bigintCryptoUtils
          .modInv(BigInt(e || 99999), BigInt(m || 99999))
          .toString()
      );
    } catch (error) {}
  }, [e, m]);

  useEffect(() => {
    setY(
      bigintCryptoUtils
        .modPow(BigInt(x || 99999), BigInt(e || 99999), BigInt(n || 99999))
        .toString()
    );
  }, [x, e, n]);

  useEffect(() => {
    setDe(
      bigintCryptoUtils
        .modPow(BigInt(y || 99999), BigInt(d || 99999), BigInt(n || 99999))
        .toString()
    );
  }, [y, d, n]);

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
          value={q}
          onChange={(e) => setQ(e.target.value)}
          addonBefore='q'
          placeholder='Nhập q'
          type='number'
        />
        <Input
          value={e}
          onChange={(e) => setE(e.target.value)}
          addonBefore='e'
          placeholder='Nhập e'
          type='number'
        />
      </Space>
      <hr />
      <Space direction='vertical'>
        <div>
          <b>x = {x || 'undefined'}</b>
        </div>
        <div>
          <b>p = {p || 'undefined'}</b>
        </div>
        <div>
          <b>q = {q || 'undefined'}</b>
        </div>
        <div>
          <b>e = {e || 'undefined'}</b>
        </div>
      </Space>
      <hr />
      <Space>
        {p * q > 0 && (
          <div>
            <p>
              n = p * q = {p} * {q} = {n}
            </p>
            <p>
              m = phi(n) = (p - 1)(q - 1) = {p - 1} * {q - 1} ={' '}
              {BigInt(m || 0).toString()}
            </p>
            <p>
              gcd(e, m) = <code>{g}</code>
            </p>
            {g !== 1 && (
              <p className='text-danger'>
                gcd(e, m) = <code>{g} != 1</code> ==&gt; e được chọn không thỏa
                mãn !
              </p>
            )}
            {g === 1 && (
              <div>
                <p>
                  Ta nhân thấy e được chọn thỏa mãn <code>gcd(e, m) = 1</code>.
                </p>
                <hr />
                <h4>Bước 1: Thực hiện tính khóa bí mật d</h4>
                <p>Áp dụng thuật toán Euclid mở rộng, ta có:</p>d = e ^ -1 mod m
                = {e} ^ -1 mod {m} = {d}
                {!x || x <= 0 ? (
                  <div>
                    <b className='text-danger'>Hãy nhập x &gt; 0 !!!</b>
                  </div>
                ) : (
                  <div>
                    <hr />
                    <h4>Bước 2: Mã hóa bản rõ x = {x}</h4>
                    <p>
                      y = x ^ e mod n = {x} ^ {e} mod {n} = {y}
                    </p>
                    <hr />
                    <h4>Bước 3: Giải mã y khi biết d, n</h4>
                    <p>
                      x = y ^ d mod n = {y} ^{d} mod {n} ={de}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Space>
    </div>
  );
};

export default RSA;
