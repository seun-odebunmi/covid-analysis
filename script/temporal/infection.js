export default (data, worldData, asiaData) => {
  const infecRate = data.China.map((d) => ({ label: d.dateRep, value: d.cummInfectionRate })),
    asiaInfecRate = asiaData.asia.map((d) => ({ label: d.dateRep, value: d.cummInfectionRate })),
    worldInfecRate = worldData.world.map((d) => ({ label: d.dateRep, value: d.cummInfectionRate })),
    selector = '#infection svg',
    option = { format: 'd', yLabel: 'Infection Rate %', title: 'Infection Rate Over Time' };

  const onDropdownChange = (e) => {
    if (e.target.value == 1) {
      drawLineChart({ data: infecRate, data2: [], data3: [], selector, option });
    } else {
      drawLineChart({
        data: infecRate,
        data2: worldInfecRate,
        data3: asiaInfecRate,
        selector,
        option,
      });
    }
  };

  drawLineChart({ data: infecRate, data2: [], data3: [], selector, option });
  $('#infection .metric').addEventListener('change', onDropdownChange);
};
