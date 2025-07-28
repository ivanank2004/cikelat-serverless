"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Komponen BAR / LINE
export function ChartBar({ type = "bar", labels, data, dataSets, options }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    // Jika multiple datasets diberikan, gunakan itu
    const datasets = dataSets
      ? dataSets
      : [
          {
            label: options?.label || "Data",
            backgroundColor: options?.backgroundColor || "#129990",
            borderColor: options?.borderColor || "#129990",
            data,
          },
        ];

    chartInstance.current = new Chart(ctx, {
      type, // bisa "bar" atau "line"
      data: {
        labels,
        datasets,
      },
      options: options || {},
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, [type, labels, data, dataSets, options]);

  return <canvas ref={canvasRef} height="300"></canvas>;
}

// Komponen PIE (tidak diubah)
export function ChartPie({ labels, data, options }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: options?.label || "Data",
            data,
            backgroundColor:
              options?.backgroundColor || [
                "#129990",
                "#34d399",
                "#fbbf24",
                "#6366f1",
                "#ef4444",
                "#10b981",
              ],
          },
        ],
      },
      options: options || {},
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, [labels, data, options]);

  return <canvas ref={canvasRef} height="300"></canvas>;
}
