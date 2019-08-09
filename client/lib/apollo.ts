import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const config = {
  link: new HttpLink({
    uri: "http://localhost:4000/api", // Server URL (must be absolute)
    fetchOptions: {
      credentials: "same-origin"
    }
  })
};

export default withData(config);