export default (data, map) => {
  let Cases = {},
    Deaths = {},
    Population = {},
    InfectionRate = {},
    MortalityRate = {};

  for (let country in data) {
    Cases = { ...Cases, [country]: data[country].slice(-1)[0].cummCases };
    Deaths = { ...Deaths, [country]: data[country].slice(-1)[0].cummDeaths };
    Population = { ...Population, [country]: data[country].slice(-1)[0].popData2018 };
    InfectionRate = {
      ...InfectionRate,
      [country]: roundOff(data[country].slice(-1)[0].cummInfectionRate),
    };
    MortalityRate = {
      ...MortalityRate,
      [country]: roundOff(data[country].slice(-1)[0].cummMortalityRate),
    };
  }

  const covidObj = {
    Cases: Object.assign(new Map(Object.keys(Cases).map((k) => formatCountry(k, Cases)))),
    Deaths: Object.assign(new Map(Object.keys(Deaths).map((k) => formatCountry(k, Deaths)))),
    Population: Object.assign(
      new Map(Object.keys(Population).map((k) => formatCountry(k, Population)))
    ),
    InfectionRate: Object.assign(
      new Map(Object.keys(InfectionRate).map((k) => formatCountry(k, InfectionRate)))
    ),
    MortalityRate: Object.assign(
      new Map(Object.keys(MortalityRate).map((k) => formatCountry(k, MortalityRate)))
    ),
  };

  drawMap({ data: covidObj, map, selector: '#world svg' });
};
