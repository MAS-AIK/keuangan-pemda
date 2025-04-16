fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = `
      <p><strong>Tahun:</strong> ${data.tahun}</p>
      <p><strong>Pendapatan:</strong> Rp ${data.pendapatan.toLocaleString()}</p>
      <p><strong>Belanja:</strong> Rp ${data.belanja.toLocaleString()}</p>
    `;

    const ctx = document.getElementById('grafik').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data.bidang),
        datasets: [{
          label: 'Belanja per Bidang',
          data: Object.values(data.bidang),
          backgroundColor: ['#4CAF50', '#2196F3', '#FFC107']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  });
