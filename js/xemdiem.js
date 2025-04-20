document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });
  const ctx = document.getElementById("grades-chart").getContext("2d");
  const subjects = [
    "IoT",
    "Thiết kế Web",
    "AVCB5",
    "Tương tác NM",
    ".NET",
    "C#",
    "Quốc phòng",
  ];
  const semester1Data = [8.0, 7.5, 8.5, 7.0, 8.0, 8.5, 8.5];
  const semester2Data = [8.5, 8.0, 9.0, 7.5, 8.5, 9.0, 9.0];
  const averageLine = [8.25, 7.75, 8.75, 7.25, 8.25, 8.75, 8.75];
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, "rgba(54, 162, 235, 0.8)");
  gradient1.addColorStop(1, "rgba(54, 162, 235, 0.2)");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, "rgba(75, 192, 192, 0.8)");
  gradient2.addColorStop(1, "rgba(75, 192, 192, 0.2)");

  const gradesChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: subjects,
      datasets: [
        {
          label: "Học kỳ 1",
          data: semester1Data,
          backgroundColor: gradient1,
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Học kỳ 2",
          data: semester2Data,
          backgroundColor: gradient2,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Trung bình",
          data: averageLine,
          type: "line",
          borderColor: "rgba(231, 76, 60, 1)",
          borderWidth: 2,
          backgroundColor: "transparent",
          pointBackgroundColor: "rgba(231, 76, 60, 1)",
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          min: 5,
          max: 10,
          ticks: {
            stepSize: 0.5,
            callback: function (value) {
              return value.toFixed(1);
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 12,
          },
          padding: 12,
          cornerRadius: 6,
          displayColors: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              label += context.raw.toFixed(2);
              return label;
            },
          },
        },
        annotation: {
          annotations: {
            line1: {
              type: "line",
              yMin: 8,
              yMax: 8,
              borderColor: "rgba(241, 196, 15, 0.7)",
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                content: "Mục tiêu: 8.0",
                enabled: true,
                position: "right",
                backgroundColor: "rgba(241, 196, 15, 0.2)",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
        onComplete: function () {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(
            12,
            "bold",
            Chart.defaults.font.family
          );
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillStyle = "#666";

          this.data.datasets.forEach(function (dataset, i) {
            const meta = chartInstance.getDatasetMeta(i);
            if (dataset.type !== "line") {
              meta.data.forEach(function (bar, index) {
                const data = dataset.data[index];
                ctx.fillText(data.toFixed(1), bar.x, bar.y - 5);
              });
            }
          });
        },
      },
    },
  });
  const viewGradesBtn = document.getElementById("view-grades-btn");

  viewGradesBtn.addEventListener("click", function () {
    const semester = document.getElementById("semester-select").value;
    const year = document.getElementById("year-select").value;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
    this.disabled = true;
    setTimeout(() => {
      if (semester === "semester1") {
        gradesChart.data.datasets[0].hidden = false;
        gradesChart.data.datasets[1].hidden = true;
      } else {
        gradesChart.data.datasets[0].hidden = true;
        gradesChart.data.datasets[1].hidden = false;
      }
      gradesChart.update();
      this.innerHTML = '<i class="fas fa-search"></i> Xem điểm';
      this.disabled = false;
      showNotification(
        `Đã tải điểm học kỳ ${
          semester === "semester1" ? "1" : "2"
        } năm học ${year}`
      );
    }, 1500);
  });

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
        <div class="notification-content">
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
        </div>
      `;

    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  const notificationStyle = document.createElement("style");
  notificationStyle.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
      }
      
      .notification.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .notification i {
        font-size: 20px;
      }
    `;
  document.head.appendChild(notificationStyle);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const tableRows = document.querySelectorAll(".grades-table tbody tr");

  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
    });

    row.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });
});
