import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import spotify from "assets/images/spotify.svg";

enum Operation {
  EVENT,
  HELLO,
  INITIALIZE,
  HEARTBEAT,
}

const Presence = () => {
  const [presence, setPresence] = useState<any>();

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    const send = (op: Operation, data?: unknown) => {
      if (ws !== null) {
        ws.send(JSON.stringify({ op, d: data }));
      }
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.op === Operation.HELLO) {
        const heartbeat = data.d.heartbeat_interval;

        setInterval(() => {
          send(Operation.HEARTBEAT);
        }, heartbeat);

        send(Operation.INITIALIZE, { subscribe_to_id: "418707912836382721" });
      } else if (data.op === Operation.EVENT && data.t) {
        if (data.d.listening_to_spotify) {
          setPresence(data.d.spotify);
        } else {
          setPresence(null);
        }
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {presence && (
        <motion.a
          target="_blank"
          href="https://open.spotify.com/user/ock5719fh26056w67awzv7rty"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex w-72 select-none items-center justify-start space-x-3 overflow-hidden rounded-lg border-2 border-white border-opacity-5 bg-white bg-opacity-5 p-3 2xl:w-80 3xl:mt-6"
        >
          <img src={presence.album_art_url} alt="Album Art" className="w-10 rounded-md 2xl:w-12" />
          <div className="font-inter flex w-56 flex-col overflow-hidden whitespace-nowrap leading-snug text-white text-opacity-75 2xl:w-64">
            <p className="text-md overflow-hidden text-ellipsis 2xl:text-lg 3xl:text-xl">
              Listening to{" "}
              <span className="font-semibold text-opacity-90">{presence.song.split("(")[0]}</span>
            </p>
            <div className="flex items-center space-x-1 text-xs 2xl:text-sm">
              <img src={spotify} alt="Spotify" className="h-3 2xl:h-4" />
              <p>
                on <span className="font-semibold text-opacity-90">Spotify</span>
              </p>
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default Presence;
