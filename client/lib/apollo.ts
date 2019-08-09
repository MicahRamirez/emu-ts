import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const config = {
  link: new HttpLink({
    uri: process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4000/api", // Server URL (must be absolute)
    fetchOptions: {
      credentials: "same-origin"
    }
  })
};

export default withData(config);