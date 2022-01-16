export interface ZoneDetail {
  zone: number;
  ac: number;
  ab: number;
}

export const defaultZone = {
  zone: 0,
  ac: 0,
  ab: 0,
};

// Mom did not tell me what ac and ab means just said she needs it.
// Mom isn't the best PM in the world. Let's leave this section super imperative...
const getZone = async function (val: string): Promise<ZoneDetail> {
  if (val.length < 5) {
    return defaultZone;
  }
  try {
    let zoneResponse = await fetch(`/api/zone?id=${val}`).then((res) =>
      res.json()
    );
    let zone = +zoneResponse.zone;
    if (zone === 1) {
      return {
        zone: 1,
        ac: 65,
        ab: 85,
      };
    } else if (zone === 2) {
      return {
        zone: 2,
        ac: 75,
        ab: 95,
      };
    } else if (zone === 3) {
      return {
        zone: 3,
        ac: 85,
        ab: 105,
      };
    } else return defaultZone;
  } catch (ex) {
    console.error("Error getting zone", ex);
    return defaultZone;
  }
};

export default getZone;
