import axios from "axios";

const RELEASES_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api/v1/upcomingReleases"
    : "https://gamereviewz.link/api/v1/upcomingReleases";

const getAllReleases = () => {
    return axios.get(`${RELEASES_URL}/releases`);
}

const ReleasesService = {
    getAllReleases
};
export default ReleasesService