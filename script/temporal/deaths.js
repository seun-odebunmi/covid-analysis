export default (data, worldData, asiaData) => {
  const cummDeaths = data.China.map((d) => ({ label: d.dateRep, value: d.cummDeaths })),
    dailyDeaths = data.China.map((d) => ({ label: d.dateRep, value: d.deaths })),
    cummAsiaCases = asiaData.asia.map((d) => ({ label: d.dateRep, value: d.cummDeaths })),
    dailyAsiaCases = asiaData.asia.map((d) => ({ label: d.dateRep, value: d.deaths })),
    cummWorldDeaths = worldData.world.map((d) => ({ label: d.dateRep, value: d.cummDeaths })),
    dailyWorldDeaths = worldData.world.map((d) => ({ label: d.dateRep, value: d.deaths })),
    selector = '#deaths svg',
    option = { format: 'd', yLabel: 'Deaths', title: 'Deaths Over Time' };

  const onDropdownChange = (e) => {
    const metric = $('#deaths .metric').value,
      metric2 = $('#deaths .metric2').value;

    if (metric == '1') {
      if (metric2 == 1) {
        drawLineChart({ data: cummDeaths, data2: [], data3: [], selector, option });
      } else {
        drawLineChart({
          data: cummDeaths,
          data2: cummWorldDeaths,
          data3: cummAsiaCases,
          selector,
          option,
        });
      }
    } else {
      if (metric2 == 1) {
        drawLineChart({ data: dailyDeaths, data2: [], data3: [], selector, option });
      } else {
        drawLineChart({
          data: dailyDeaths,
          data2: dailyWorldDeaths,
          data3: dailyAsiaCases,
          selector,
          option,
        });
      }
    }
  };

  drawLineChart({ data: cummDeaths, data2: [], data3: [], selector, option });
  $('#deaths .metric').addEventListener('change', onDropdownChange);
  $('#deaths .metric2').addEventListener('change', onDropdownChange);
};
