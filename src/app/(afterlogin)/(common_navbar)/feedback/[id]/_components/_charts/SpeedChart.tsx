'use client';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  grade: string;
}
const SpeedChart = ({ grade }: Props) => {
  let mainColor;
  let gradationColor;
  if (grade === 'Slow' || grade === 'Fast') {
    mainColor = '#fe0062';
    gradationColor = '#ffbad1';
  }
  if (grade === 'Good') {
    mainColor = '#5a1df8';
    gradationColor = '#d7c4fe';
  }

  const options: ApexOptions = {
    chart: {
      redrawOnWindowResize: false,
      type: 'radialBar',
    },
    colors: [mainColor],

    plotOptions: {
      radialBar: {
        startAngle: -115,
        endAngle: 115,
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '25px',
            formatter: function () {
              return `${grade}`;
            },
            offsetY: 10,
            show: true,
          },
        },
        hollow: {
          margin: 15,
          size: '70%',
          background: '#fff',
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: [gradationColor!],
        stops: [1, 20, 80, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  const series = [100];

  return <ReactApexChart options={options} series={series} type="radialBar" height={'280px'} />;
};

export default SpeedChart;
