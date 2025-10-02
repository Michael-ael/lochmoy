document.addEventListener('DOMContentLoaded', () => {
    const chartEl = document.getElementById('portfolioChart');
    if (!chartEl) return;

    const ctx = chartEl.getContext('2d');
    const chartData = JSON.parse(chartEl.dataset.chart);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'Price High',
                    data: chartData.priceHigh,
                    borderColor: '#ff6633',
                    backgroundColor: 'transparent',
                    tension: 0,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
                {
                    label: 'Price Low',
                    data: chartData.priceLow,
                    borderColor: '#ffffff',
                    backgroundColor: 'transparent',
                    tension: 0,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
                {
                    label: 'Total Invested',
                    data: chartData.totalInvested,
                    borderColor: '#50595e',
                    backgroundColor: 'transparent',
                    tension: 0,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }
                
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 16,
                            weight: 600,
                            family: 'Rift'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '£' + parseFloat(context.raw).toLocaleString();
                        }
                    },
                    titleFont: {
                        size: 16,
                        weight: 600,
                        family: 'Rift'
                    },
                    bodyFont: {
                        size: 16,
                        weight: 600,
                        family: 'Rift'
                    }
                },
                datalabels: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#d1d5db',
                        maxRotation: 0,
                        minRotation: 0,
                        font: {
                            size: 15,
                            weight: 600,
                            family: 'Rift'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: '#d1d5db',
                        callback: function(value) {
                            return '£' + value.toLocaleString();
                        },
                        font: {
                            size: 15,
                            weight: 600,
                            family: 'Rift'
                        }
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        }
    });
});
