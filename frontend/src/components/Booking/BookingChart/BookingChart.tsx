import React from "react";
import {Bar} from "react-chartjs-2";

const BOOKINGS_BUCKETS: Record<string, {min: number; max: number}> = {
  Cheap: {
    min: 0,
    max: 100,
  },
  Normal: {
    min: 100,
    max: 200,
  },
  Expensive: {
    min: 200,
    max: 10000000,
  },
};

interface Booking {
  event: {
    price: number;
  };
}

interface Props {
  bookings: Booking[];
}

const BookingsChart: React.FC<Props> = ({bookings}) => {
  //  eslint-disable no-explicit-any
  const chartData: any = {labels: [], datasets: []};
  let values: number[] = [];

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      label: bucket, // Adding label for each bucket
      backgroundColor: "rgba(220,220,220,0.5)",
      borderColor: "rgba(220,220,220,0.8)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(220,220,220,0.75)",
      hoverBorderColor: "rgba(220,220,220,1)",
      data: values,
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <div style={{textAlign: "center"}}>
      <Bar data={chartData} />
    </div>
  );
};

export default BookingsChart;
