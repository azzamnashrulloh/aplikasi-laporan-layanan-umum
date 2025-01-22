import { useState } from "react";
import Heading from "../../Components/Landing/Heading";

const About = () => {
  const [titles, updateTitle] = useState("About");
  return <Heading title={titles} />;
};
export default About;
