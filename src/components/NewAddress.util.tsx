import * as yup from 'yup';

export const states = {
  NA: '-',
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const phoneRegExp =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const requiredString = yup.string().required('Required');

export const addressSchema = yup.object({
  fullName: requiredString,
  emailAddress: requiredString.email('Must be a valid email'),
  phoneNumber: requiredString.matches(phoneRegExp, 'Phone number is not valid.'),
  streetAddress: requiredString.test(
    'streetAddress',
    'Sorry, you must have a physical address, not a PO Box.',
    (value) => {
      if (!value) return true;
      const results = value.match(
        /(((p[\s.]?[o\s][.]?)\s?)|(post\s?office\s?))((box|bin|b\.?)?\s?(num|number|#)?\s?\d+)/i
      );
      return !(results && results.length);
    }
  ),
  streetAddress2: yup
    .string()
    .nullable()
    .test('streetAddress', 'Sorry, you must have a physical address, not a PO Box.', (value) => {
      if (!value) return true;
      const results = value.match(
        /(((p[\s.]?[o\s][.]?)\s?)|(post\s?office\s?))((box|bin|b\.?)?\s?(num|number|#)?\s?\d+)/i
      );
      return !(results && results.length);
    }),
  city: requiredString,
  state: requiredString.test('state', 'Must be a valid state.', (value) => {
    if (!value) return true;
    return value !== '-';
  }),
  postalCode: requiredString,
});
