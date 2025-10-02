document.addEventListener("DOMContentLoaded", function () {
  const wineElem = document.getElementById("wine-id");
  const chartCanvas = document.getElementById("winePriceChart");

  if (!wineElem || !chartCanvas || typeof Chart === "undefined") return;

  const wineId = wineElem.textContent.trim();
  if (!wineId) return;

  fetch(`/wp-json/wine/v1/chart-data/${wineId}`)
    .then(res => res.json())
    .then(data => {
      if (!data?.labels?.length || !data?.price_low?.length || !data?.price_high?.length) {
        console.error("❌ Invalid data from API", data);
        return;
      }

      const ctx = chartCanvas.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Low Estimate",
              data: data.price_low,
              borderColor: "#50595E",
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
              tension: 0
            },
            {
              label: "High Estimate",
              data: data.price_high,
              borderColor: "#FF6633",
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
              tension: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: { top: 20, right: 30, bottom: 20, left: 0 }
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
                tooltipFormat: "MMM yyyy",
                displayFormats: { month: "MMM yyyy" }
              },
              ticks: {
                maxRotation: 0,
                minRotation: 0,
                autoSkip: true,
                font: { family: "Rift", size: 14 },
                color: "#A0A4A8"
              },
              grid: { display: false }
            },
            y: {
              ticks: {
                callback: value => "£" + value.toLocaleString("en-GB"),
                font: { family: "Rift", size: 14 },
                color: "#A0A4A8"
              },
              grid: {
                color: "#2d2f33",
                drawTicks: false,
                drawBorder: false,
                lineWidth: ctx => (ctx.index % 2 === 0 ? 1 : 0)
              }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => "£" + ctx.raw.toLocaleString("en-GB")
              },
              titleFont: { family: "Rift", size: 14 },
              bodyFont: { family: "Rift", size: 14 }
            },
            datalabels: {
              display: false
            }
          }
        },
        plugins: []
      });
    })
    .catch(err => console.error("❌ Fetch error:", err));
});
