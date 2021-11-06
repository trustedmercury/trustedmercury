import axios from "axios";
import { Fragment, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Intro from "./home/Intro";

export default function Home(props) {
  const [initialized, setInitialized] = useState(false);

  return (
    <Fragment>
      <AnimatePresence>
        {!initialized && <Intro weather={props.weather} setIntro={setInitialized} />}
      </AnimatePresence>
    </Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${process.env.OPENWEATHER_LOCATION}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
  );

  return {
    props: {
      weather: response.data,
    },
  };
}
