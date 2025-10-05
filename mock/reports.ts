export type Report = {
  id: string;
  bikeName: string;
  bikeBrand: string;
  bikeColor: string;
  dateTime: string;
  location: {
    longitude: number;
    latitude: number;
  };
};

const reports: Report[] = [
  {
    id: "1",
    bikeName: "Grail 6",
    bikeBrand: "Canyon",
    bikeColor: "Yellow",
    dateTime: "2025-10-01T13:34:54Z",
    location: {
      longitude: -73.5473,
      latitude: 45.5217,
    },
  },
  {
    id: "2",
    bikeName: "Madone SLR",
    bikeBrand: "Trek",
    bikeColor: "Red",
    dateTime: "2025-10-02T13:34:54Z",
    location: {
      longitude: -73.5573,
      latitude: 45.4917,
    },
  },
  {
    id: "3",
    bikeName: "SystemSix",
    bikeBrand: "Cannondale",
    bikeColor: "Blue",
    dateTime: "2025-09-30T13:34:54Z",
    location: {
      longitude: -73.5273,
      latitude: 45.5117,
    },
  },
  {
    id: "4",
    bikeName: "Topstone Carbon",
    bikeBrand: "Trek",
    bikeColor: "Red",
    dateTime: "2025-10-03T13:34:54Z",
    location: {
      longitude: -73.5073,
      latitude: 45.5317,
    },
  },
];

export const getReports = async (boundingBox: number[]): Promise<Report[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reports.filter((report) => {
        return (
          report.location.longitude >= boundingBox[0] &&
          report.location.latitude >= boundingBox[1] &&
          report.location.longitude <= boundingBox[2] &&
          report.location.latitude <= boundingBox[3]
        );
      }));
    }, 500);
  });
}