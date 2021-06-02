/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Input, Space } from 'antd';
import ReactApexChart from 'react-apexcharts';
import curve from '../utils/elliptic';
import { ApexOptions } from 'apexcharts';

export interface Point {
  x: number;
  y: number;
}

const Elliptic = () => {
  const [a, setA] = useState<any>(4);
  const [b, setB] = useState<any>(2);
  const [r, setR] = useState<any>(43);
  const [c, setC] = useState(curve(a, b, r));
  const [plotPoints, setPlotPoints] = useState<Point[]>(c.getPoints().slice(1));
  const [chartParams, setChartParams] = useState<{
    series: any;
    options: ApexOptions;
  }>({
    series: [],
    options: {},
  });

  useEffect(() => {
    setC(curve(a, b, r));
    setPlotPoints(curve(a, b, r).getPoints().slice(1));
  }, [a, b, r]);

  useEffect(() => {}, [c]);

  useEffect(() => {
    setChartParams({
      series: [
        {
          name: 'Points',
          data: plotPoints.map((p: any) => [p.x, p.y]),
        },
      ],
      options: {
        chart: {
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy',
          },
          height: 200,
        },
        // tooltip: {
        //   custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        //     console.log(series);
        //     console.log(seriesIndex);
        //     console.log(dataPointIndex);
        //     // console.log(plotPoints[props.dataPointIndex]);
        //     // return '';

        //     return `<div class="p-2"><b>Điểm</b><div>( ${series[dataPointIndex]}, ${series[dataPointIndex]} ) </div></div>`;
        //   },
        // },
      },
    });
  }, [plotPoints]);

  return (
    <div>
      <Space className='inputs'>
        <Input
          value={a}
          onChange={(e) => setA(e.target.value)}
          addonBefore='a'
          placeholder='Nhập a'
          type='number'
        />
        <Input
          value={b}
          onChange={(e) => setB(e.target.value)}
          addonBefore='b'
          placeholder='Nhập b'
          type='number'
        />
        <Input
          value={r}
          onChange={(e) => setR(e.target.value)}
          addonBefore='r'
          placeholder='Nhập r'
          type='number'
        />

        {!c.rIsPrime() && (
          <h4 className='text-danger'>
            <b>R không phải là số nguyên tố !!!</b>
          </h4>
        )}
      </Space>

      <div className='m-3'>
        <ReactApexChart
          options={chartParams.options}
          series={chartParams.series}
          type='scatter'
          height={300}
          width={'80%'}
        />
      </div>
      <div>
        <h4>
          <b>
            Các điểm trên E{r}({a},{b}) là điểm vô cực O và các điểm sau
          </b>
        </h4>
        <table className='table table-bordered'>
          <tbody>
            <tr>
              {plotPoints.slice(0, plotPoints.length / 2).map((point) => (
                <td>{point.toString()}</td>
              ))}
            </tr>
            <tr>
              {plotPoints.slice(plotPoints.length / 2 + 1).map((point) => (
                <td>{point.toString()}</td>
              ))}
            </tr>
            {c.rIsPrime()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Elliptic;
