import axios from "axios";

export default axios.create({
  baseURL: "http://gamer-reviewz-env.eu-west-2.elasticbeanstalk.com/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});
