import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";

export default function Item({ label, href }: { label: string; href: string }) {
  return (
    <div className="relative">
      <Link to={href}>
        <p className="font-std text-lg text-white 2xl:text-2xl">{label}</p>
      </Link>
      {useMatch(href) && (
        <motion.div layoutId="underline" className="absolute h-0.5 w-full rounded-full bg-white" />
      )}
    </div>
  );
}
