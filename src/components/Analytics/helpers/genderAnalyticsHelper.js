export default function genderAnalyticsHelper(entities, type = 'patients') {
  const data = {
    male: 0,
    female: 0
  };

  entities?.forEach((entity) => {
    const { gender } = entity;
    data[gender] = data[gender] ? data[gender] + 1 : 1;
  });

  data.male = data.male || 1;
  data.female = data.female || 1;

  const res = [
    ['Gender', `Number of ${type}`],
    ['male', data.male],
    ['female', data.female]
  ];

  return res;
}
