import zones from "../data/zones";

export interface ZoneDetail {
	zone : number;
	ac: number;
	ab: number;
}

export const defaultZone = {
	zone: 0,
	ac: 0,
	ab: 0
}

// Mom did not tell me what ac and ab means just said she needs it. 
// Mom isn't the best PM in the world.
const getZone = function (val: string) : ZoneDetail {
	if (val.length !== 5) {
	  return defaultZone;
	}
  const numVal = +val;
  if (zones.get(1).has(numVal)) {
    return {
      zone: 1,
      ac: 65,
      ab: 85,
    };
  } else if (zones.get(2).has(numVal)) {
    return {
      zone: 2,
      ac: 75,
      ab: 95,
    };
  } else if (zones.get(3).has(numVal)) {
    return {
      zone: 3,
      ac: 85,
      ab: 105,
    };
  } else return defaultZone;
};

export default getZone;
