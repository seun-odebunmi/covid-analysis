export default (data, worldData, asiaData) => {
  const mortRate = data.China.map((d) => ({ label: d.dateRep, value: d.cummMortalityRate })),
    asiaMortRate = asiaData.asia.map((d) => ({ label: d.dateRep, value: d.cummMortalityRate })),
    worldMortRate = worldData.world.map((d) => ({ label: d.dateRep, value: d.cummMortalityRate })),
    selector = '#mortality svg',
    option = { format: 'd', yLabel: 'Mortality Rate %', title: 'Mortality Rate Over Time' };

  const onDropdownChange = (e) => {
    if (e.target.value == 1) {
      drawLineChart({ data: mortRate, data2: [], data3: [], selector, option });
    } else {
      drawLineChart({
        data: mortRate,
        data2: worldMortRate,
        data3: asiaMortRate,
        selector,
        option,
      });
    }
  };

  drawLineChart({ data: mortRate, data2: [], data3: [], selector, option });
  $('#mortality .metric').addEventListener('change', onDropdownChange);
};
