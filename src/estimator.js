/* eslint-disable max-len */
const calCurrentlyInfected = (reportedCases, severity) => reportedCases * severity;

const calcInfectionsByRequestedTime = (
  period,
  periodType,
  currentlyInfected
) => {
  let estimatedTime;
  if (periodType === 'weeks') estimatedTime = (period * 7) / 3;
  else if (periodType === 'months') estimatedTime = (period * 30) / 3;
  else estimatedTime = period / 3;
  return currentlyInfected * 2 ** Math.trunc(estimatedTime);
};

const calcSevereCasesByRequestedTime = (infectionsByRequestedTime) => Math.trunc(infectionsByRequestedTime * 0.15);

const calcHospitalBedsByRequestedTime = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => Math.trunc((0.35 * totalHospitalBeds) - severeCasesByRequestedTime);

const calcCasesForICUByRequestedTime = (infectionsByRequestedTime) => Math.trunc(0.05 * infectionsByRequestedTime);

const calcCasesForVentilatorsByRequestedTime = (infectionsByRequestedTime) => Math.trunc(0.02 * infectionsByRequestedTime);

const calcDollarsInFlight = (
  infectionsByRequestedTime,
  avgDailyIncome,
  avgDailyIncomePopulation,
  period,
  periodType
) => {
  let estimatedTime;
  if (periodType === 'weeks') estimatedTime = period * 7;
  else if (periodType === 'months') estimatedTime = period * 30;
  else estimatedTime = period;
  return Math.trunc(infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncome * estimatedTime);
};

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
    timeToElapse,
    periodType
  );
  severeImpact.dollarsInFlight = calcDollarsInFlight(
    severeImpact.infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    timeToElapse,
    periodType
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
