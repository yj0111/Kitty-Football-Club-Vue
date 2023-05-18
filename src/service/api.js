const api = {
  harbor: {
    all(callback) {
      const harbors = [
        {
          seq: 1,
          place: "방배배수지체육공원",
          lat: 37.472513,
          lng: 126.992405,
        },
        {
          seq: 2,
          place: "노량진 축구장",
          lat: 37.515313,
          lng: 126.941091,
        },
        {
          seq: 3,
          place: "스카이돔 축구장",
          lat: 37.496475,
          lng: 126.867208,
        },
        {
          seq: 4,
          place: "탄천축구장",
          lat: 37.49652,
          lng: 127.100316,
        },
        {
          seq: 5,
          place: "서울월드컵 보조경기장",
          lat: 37.5715,
          lng: 126.898204,
        },
      ];
      callback({ success: true, harbors });
    },
  },
};

export default api;
