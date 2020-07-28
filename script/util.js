const $ = function (selector) {
  return document.querySelector(selector);
};

const parseDate = (date, format) => {
  const parse = d3.timeParse(format);
  return parse(date);
};

const roundOff = (n) => {
  return parseFloat(n.toExponential(Math.max(1, 2 + Math.log10(Math.abs(n)))));
};

const formatCountry = (key, obj) => {
  let country = key.split('_').join(' ');
  country = rename.get(country) || country;

  return [country, obj[key]];
};

const formatAsiaData = (data) => {
  const moddedData = data
    .filter((d) => d.continentExp === 'Asia')
    .map(({ cases, dateRep, deaths }) => ({ cases: +cases, dateRep, deaths: +deaths }))
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr.dateRep]: prev[curr.dateRep]
          ? {
              cases: prev[curr.dateRep].cases + curr.cases,
              deaths: prev[curr.dateRep].deaths + curr.deaths,
            }
          : curr,
      }),
      {}
    );

  const moddedDataObj = {
    asia: Object.keys(moddedData)
      .map((k) => ({
        ...moddedData[k],
        population: 4601371198,
        dateRep: parseDate(k, '%d-%m-%Y'),
      }))
      .sort((a, b) => a.dateRep - b.dateRep),
  };

  let asiaData = {};
  for (let asia in moddedDataObj) {
    let asiaArr = [],
      cummCases = 0,
      cummDeaths = 0,
      cummInfectionRate = 0,
      cummMortalityRate = 0;

    for (let adata of moddedDataObj[asia]) {
      cummCases += adata.cases;
      cummDeaths += adata.deaths;
      cummInfectionRate = (cummCases / adata.population) * 100;
      cummMortalityRate = cummCases == 0 ? 0 : (cummDeaths / cummCases) * 100;
      asiaArr.push({ ...adata, cummCases, cummDeaths, cummInfectionRate, cummMortalityRate });
    }

    asiaData = { ...asiaData, [asia]: asiaArr };
  }

  return asiaData;
};

const formatWorldData = (data) => {
  const moddedData = data
    .map(({ cases, dateRep, deaths }) => ({ cases: +cases, dateRep, deaths: +deaths }))
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr.dateRep]: prev[curr.dateRep]
          ? {
              cases: prev[curr.dateRep].cases + curr.cases,
              deaths: prev[curr.dateRep].deaths + curr.deaths,
            }
          : curr,
      }),
      {}
    );

  const moddedDataObj = {
    world: Object.keys(moddedData)
      .map((k) => ({
        ...moddedData[k],
        population: 7631091040,
        dateRep: parseDate(k, '%d-%m-%Y'),
      }))
      .sort((a, b) => a.dateRep - b.dateRep),
  };

  let worldData = {};
  for (let world in moddedDataObj) {
    let worldArr = [],
      cummCases = 0,
      cummDeaths = 0,
      cummInfectionRate = 0,
      cummMortalityRate = 0;

    for (let wdata of moddedDataObj[world]) {
      cummCases += wdata.cases;
      cummDeaths += wdata.deaths;
      cummInfectionRate = (cummCases / wdata.population) * 100;
      cummMortalityRate = cummCases == 0 ? 0 : (cummDeaths / cummCases) * 100;
      worldArr.push({ ...wdata, cummCases, cummDeaths, cummInfectionRate, cummMortalityRate });
    }

    worldData = { ...worldData, [world]: worldArr };
  }

  return worldData;
};

const formatCovidData = (data) => {
  const moddedData = data.reduce(
    (prev, curr, _, arr) => ({
      ...prev,
      [curr.countriesAndTerritories]: arr
        .filter((d) => d.countriesAndTerritories === curr.countriesAndTerritories)
        .map((d) => ({
          ...d,
          month: +d.month,
          day: +d.day,
          dateRep: parseDate(d.dateRep, '%d-%m-%Y'),
          cases: +d.cases,
          deaths: +d.deaths,
          popData2018: +d.popData2018,
        }))
        .sort((a, b) => a.dateRep - b.dateRep),
    }),
    {}
  );

  let newCountry = {};
  for (let country in moddedData) {
    let countryArr = [],
      cummCases = 0,
      cummDeaths = 0,
      cummInfectionRate = 0,
      cummMortalityRate = 0;

    for (let cdata of moddedData[country]) {
      cummCases += cdata.cases;
      cummDeaths += cdata.deaths;
      cummInfectionRate = (cummCases / cdata.popData2018) * 100;
      cummMortalityRate = cummCases == 0 ? 0 : (cummDeaths / cummCases) * 100;
      countryArr.push({ ...cdata, cummCases, cummDeaths, cummInfectionRate, cummMortalityRate });
    }

    newCountry = { ...newCountry, [country]: countryArr };
  }

  return newCountry;
};

const rename = new Map([
  ['Antigua and Barbuda', 'Antigua and Barb.'],
  ['Bolivia (Plurinational State of)', 'Bolivia'],
  ['Bosnia and Herzegovina', 'Bosnia and Herz.'],
  ['Brunei Darussalam', 'Brunei'],
  ['Central African Republic', 'Central African Rep.'],
  ['Cook Islands', 'Cook Is.'],
  ['Cote dIvoire', "Côte d'Ivoire"],
  ["Democratic People's Republic of Korea", 'North Korea'],
  ['Democratic Republic of the Congo', 'Dem. Rep. Congo'],
  ['Dominican Republic', 'Dominican Rep.'],
  ['Equatorial Guinea', 'Eq. Guinea'],
  ['Guinea Bissau', 'Guinea-Bissau'],
  ['Iran (Islamic Republic of)', 'Iran'],
  ["Lao People's Democratic Republic", 'Laos'],
  ['Marshall Islands', 'Marshall Is.'],
  ['Micronesia (Federated States of)', 'Micronesia'],
  ['Republic of Korea', 'South Korea'],
  ['Republic of Moldova', 'Moldova'],
  ['Russian Federation', 'Russia'],
  ['Saint Kitts and Nevis', 'St. Kitts and Nevis'],
  ['Saint Vincent and the Grenadines', 'St. Vin. and Gren.'],
  ['Sao Tome and Principe', 'São Tomé and Principe'],
  ['Solomon Islands', 'Solomon Is.'],
  ['South Sudan', 'S. Sudan'],
  ['Swaziland', 'eSwatini'],
  ['Syrian Arab Republic', 'Syria'],
  ['The former Yugoslav Republic of Macedonia', 'Macedonia'],
  ['United Republic of Tanzania', 'Tanzania'],
  ['Venezuela (Bolivarian Republic of)', 'Venezuela'],
  ['Viet Nam', 'Vietnam'],
]);

const drawMap = ({ data, map, selector }) => {
  $(selector).innerHTML = '';

  const { InfectionRate, Population, MortalityRate, Cases, Deaths } = data;
  const world = map;
  const range = [0.01, 0.05, 0.1, 0.5, 0.75, 1];
  const countries = topojson.feature(world, world.objects.countries);
  const outline = { type: 'Sphere' };
  const projection = d3.geoEqualEarth();
  const path = d3.geoPath(projection);
  var color = d3.scaleThreshold().domain(range).range(d3.schemeReds['7']).unknown('#ccc');
  var format = d3.format('.2f');
  const width = 975;
  const height = () => {
    const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
    const dy = Math.ceil(y1 - y0),
      l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
    return dy;
  };
  const svg = d3.select(selector).attr('viewBox', [0, 0, width, height()]);
  const g = svg.append('g');
  const legend = d3
    .legendColor()
    .labelFormat(format)
    .labels(d3.legendHelpers.thresholdLabels)
    .title('COVID-19 Infection Rate')
    .scale(color);
  const tip = d3
    .tip()
    .attr('class', 'd3-tip')
    .offset([140, 140])
    .html(
      (d) =>
        `<div style="background-color:rgba(0, 0, 0, 0.8);padding:8px;color:white">
        Country: ${d.properties.name}<br/>
        Population: ${
          Population.has(d.properties.name)
            ? Population.get(d.properties.name).toLocaleString()
            : 'N/A'
        }<br/>
        Cases: ${
          Cases.has(d.properties.name) ? Cases.get(d.properties.name).toLocaleString() : 'N/A'
        }<br/>
        Infection Rate: ${InfectionRate.has(d.properties.name) ? `${d.InfectionRate}%` : 'N/A'}<br/>
        Deaths: ${
          Deaths.has(d.properties.name) ? Deaths.get(d.properties.name).toLocaleString() : 'N/A'
        }<br/>
        Mortality Rate: ${
          MortalityRate.has(d.properties.name) ? `${MortalityRate.get(d.properties.name)}%` : 'N/A'
        }
        </div>`
    );

  g.call(tip);
  svg.append('g').attr('class', 'legend').attr('transform', 'translate(-60,40)');
  svg.select('.legend').call(legend);
  svg
    .append('g')
    .selectAll('path')
    .data(countries.features)
    .join('path')
    .attr('fill', (d) => color((d.InfectionRate = InfectionRate.get(d.properties.name))))
    .attr('d', path)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
  svg
    .append('path')
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr('fill', 'none')
    .attr('stroke', '#888')
    .attr('stroke-linejoin', 'round')
    .attr('d', path);
};

const drawLineChart = ({ data, data2 = [], data3 = [], selector, option }) => {
  $(selector).innerHTML = '';

  const dataComb = { China: data, World: data2, Asia: data3 };
  const forecastDates = [
    { label: '02-05-20' },
    { label: '03-05-20' },
    { label: '04-05-20' },
    { label: '05-05-20' },
    { label: '06-05-20' },
    { label: '07-05-20' },
    { label: '08-05-20' },
    { label: '09-05-20' },
    { label: '10-05-20' },
  ];
  const predict = (data, newX) => {
    const round = (n) => Math.round(n * 100) / 100;

    const sum = data.reduce(
      (acc, pair) => {
        const x = pair[0];
        const y = pair[1];

        if (y !== null) {
          acc.x += x;
          acc.y += y;
          acc.squareX += x * x;
          acc.product += x * y;
          acc.len += 1;
        }

        return acc;
      },
      { x: 0, y: 0, squareX: 0, product: 0, len: 0 }
    );

    const rise = sum.len * sum.product - sum.x * sum.y;
    const run = sum.len * sum.squareX - sum.x * sum.x;
    const gradient = run === 0 ? 0 : round(rise / run);
    const intercept = round(sum.y / sum.len - (gradient * sum.x) / sum.len);

    return round(gradient * newX + intercept);
  };
  const getForecast = (data, forecastDates) => {
    const dataIndex = data.map((d, i) => [i, d.value]);
    const forecast = forecastDates.map((d, i) => ({
      label: parseDate(d.label, '%d-%m-%Y'),
      value: predict(dataIndex, dataIndex.length - 1 + i),
    }));
    forecast.unshift(data[data.length - 1]);

    return data.length > 0 ? forecast : [];
  };

  const forecast = getForecast(data, forecastDates);
  const forecast2 = getForecast(data2, forecastDates);
  const forecast3 = getForecast(data3, forecastDates);
  const forecastComb = { China: forecast, World: forecast2, Asia: forecast3 };

  const margin = { top: 80, right: 20, bottom: 20, left: 60 },
    width = $(selector).width.baseVal.value - margin.left - margin.right,
    height = $(selector).height.baseVal.value - margin.top - margin.bottom;
  const svg = d3.select(selector).attr('viewBox', [0, 0, width, height]);
  const line = d3
    .line()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.label))
    .y((d) => y(d.value));
  const color = d3.scaleOrdinal(d3.schemeAccent);
  const x = d3
    .scaleTime()
    .domain(d3.extent([...data, ...forecast], (d) => d.label))
    .range([margin.left, width - margin.right]);
  const minY = 0 - d3.min(data, (d) => d.value);
  const y = d3
    .scaleLinear()
    .domain([
      minY == 0 ? -0.5 : minY,
      d3.max(
        [...data, ...data2, ...data3, ...forecast, ...forecast2, ...forecast3],
        (d) => d.value
      ),
    ])
    .nice()
    .range([height - margin.bottom, margin.top]);
  const xAxis = (g) =>
    g.attr('transform', `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );
  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call((g) =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', -20)
          .attr('y', -20)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .attr('fill', 'currentColor')
          .text(option.yLabel)
      );

  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);
  Object.keys(dataComb).map((k, i) => {
    svg
      .append('path')
      .datum(dataComb[k])
      .attr('fill', 'none')
      .attr('stroke', () => (dataComb[k].color = color(k)))
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);
    dataComb[k].length > 0 &&
      svg
        .append('text')
        .attr('x', width / 15 + i * 50)
        .attr('y', margin.top / 2)
        .attr('class', 'legend')
        .style('fill', () => (dataComb[k].color = color(k)))
        .text(k);
  });
  Object.keys(forecastComb).map((k, i) => {
    svg
      .append('path')
      .datum(forecastComb[k])
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      .attr('stroke-dasharray', '10,7')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  });
  svg
    .append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', margin.top / 4)
    .attr('text-anchor', 'middle')
    .text(option.title);
};
