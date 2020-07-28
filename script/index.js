(async () => {
  const mapData = await fetch('data/countries-50m.json').then((res) => res.json());
  const data = await d3.csv('data/covid19DistributionMay1st.csv');
  const covidData = formatCovidData(data);
  const worldData = formatWorldData(data);
  const asiaData = formatAsiaData(data);

  import('./geospatial/index.js').then((module) => module.default(covidData, mapData));
  import('./temporal/confirmedCases.js').then((module) =>
    module.default(covidData, worldData, asiaData)
  );
  import('./temporal/deaths.js').then((module) => module.default(covidData, worldData, asiaData));
  import('./temporal/infection.js').then((module) =>
    module.default(covidData, worldData, asiaData)
  );
  import('./temporal/mortality.js').then((module) =>
    module.default(covidData, worldData, asiaData)
  );
})();
