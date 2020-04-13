/* eslint-disable max-len */
const calCurrentlyInfected = (reportedCases, severity) => reportedCases * severity;

const calcInfectionsByRequestedTime = (
  period,
  periodType,
  currentlyInfected
) => {
  if (periodType === 'weeks') return currentlyInfected * (2 ** ((period * 7) / 3));
  if (periodType === 'months') return currentlyInfected * (2 ** ((period * 30) / 3));
  return currentlyInfected * (2 ** (Math.round(period / 3)));
};

const calcSevereCasesByRequestedTime = (infectionsByRequestedTime) => Math.round(infectionsByRequestedTime * 0.15);

const calcHospitalBedsByRequestedTime = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => Math.round(0.35 * totalHospitalBeds) - severeCasesByRequestedTime;

const calcCasesForICUByRequestedTime = (infectionsByRequestedTime) => Math.round(0.05 * infectionsByRequestedTime);

const calcCasesForVentilatorsByRequestedTime = (infectionsByRequestedTime) => Math.round(0.02 * infectionsByRequestedTime);

const calcDollarsInFlight = (
  infectionsByRequestedTime,
  avgDailyIncome,
  avgDailyIncomePopulation,
  period
) => parseFloat(
  (
    infectionsByRequestedTime
      * avgDailyIncomePopulation
      * avgDailyIncome
      * period
  ).toFixed(2)
);

const covid19ImpactEstimator = ({
  region: {
    name = '',
    avgAge = 0,
    avgDailyIncomeInUSD = 0,
    avgDailyIncomePopulation = 0
  },
  periodType = '',
  timeToElapse = 0,
  reportedCases = 0,
  population = 0,
  totalHospitalBeds = 0
}) => {
  const data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = calCurrentlyInfected(reportedCases, 10);
  severeImpact.currentlyInfected = calCurrentlyInfected(reportedCases, 50);

  impact.infectionsByRequestedTime = calcInfectionsByRequestedTime(
    timeToElapse,
    periodType,
    impact.currentlyInfected
  );
  severeImpact.infectionsByRequestedTime = calcInfectionsByRequestedTime(
    timeToElapse,
    periodType,
    severeImpact.currentlyInfected
  );

  impact.severeCasesByRequestedTime = calcSevereCasesByRequestedTime(
    impact.infectionsByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = calcSevereCasesByRequestedTime(
    severeImpact.infectionsByRequestedTime
  );

  impact.hospitalBedsByRequestedTime = calcHospitalBedsByRequestedTime(
    totalHospitalBeds,
    impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = calcHospitalBedsByRequestedTime(
    totalHospitalBeds,
    severeImpact.severeCasesByRequestedTime
  );

  impact.casesForICUByRequestedTime = calcCasesForICUByRequestedTime(
    impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = calcCasesForICUByRequestedTime(
    severeImpact.infectionsByRequestedTime
  );

  impact.casesForVentilatorsByRequestedTime = calcCasesForVentilatorsByRequestedTime(
    impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = calcCasesForVentilatorsByRequestedTime(
    severeImpact.infectionsByRequestedTime
  );

  impact.dollarsInFlight = calcDollarsInFlight(
    impact.infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse
  );
  severeImpact.dollarsInFlight = calcDollarsInFlight(
    severeImpact.infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse
  );

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;

/*
console.log(covid19ImpactEstimator({
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
}));
*/
