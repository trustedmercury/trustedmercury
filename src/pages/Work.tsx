import Image from "assets/img/2.png";
import PageWrapper from "ui/wrappers/PageWrapper";

export default function Work() {
  return <PageWrapper image={{ alt: "me!", src: Image, style: "w-1/3" }}></PageWrapper>;
}
