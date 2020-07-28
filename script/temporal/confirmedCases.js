export default (data, worldData, asiaData) => {
  const cummCases = data.China.map((d) => ({ label: d.dateRep, value: d.cummCases })),
    dailyCases = data.China.map((d) => ({ label: d.dateRep, value: d.cases })),
    cummAsiaCases = asiaData.asia.map((d) => ({ label: d.dateRep, value: d.cummCases })),
    dailyAsiaCases = asiaData.asia.map((d) => ({ label: d.dateRep, value: d.cases })),
    cummWorldCases = worldData.world.map((d) => ({ label: d.dateRep, value: d.cummCases })),
    dailyWorldCases = worldData.world.map((d) => ({ label: d.dateRep, value: d.cases })),
    selector = '#confirmedCases svg',
    option = { format: 'd', yLabel: 'Confirmed Cases', title: 'Confirmed Cases Over Time' };

  const onDropdownChange = (e) => {
    const metric = $('#confirmedCases .metric').value,
      metric2 = $('#confirmedCases .metric2').value;

    if (metric == '1') {
      if (metric2 == 1) {
        drawLineChart({ data: cummCases, data2: [], data3: [], selector, option });
      } else {
        drawLineChart({
          data: cummCases,
          data2: cummWorldCases,
          data3: cummAsiaCases,
          selector,
          option,
        });
      }
    } else {
      if (metric2 == 1) {
        drawLineChart({ data: dailyCases, data2: [], data3: [], selector, option });
      } else {
        drawLineChart({
          data: dailyCases,
          data2: dailyWorldCases,
          data3: dailyAsiaCases,
          selector,
          option,
        });
      }
    }
  };

  drawLineChart({ data: cummCases, data2: [], data3: [], selector, option });
  $('#confirmedCases .metric').addEventListener('change', onDropdownChange);
  $('#confirmedCases .metric2').addEventListener('change', onDropdownChange);
};
