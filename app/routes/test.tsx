import { motion } from "framer-motion";

export default function Test() {
  return (
    <div className="p-4 m-4">
      <h1 className="p-2 text-lg font-bold">Button</h1>
      <motion.button
        className="m-4 px-4 py-2 bg-blue-500 text-white rounded-lg select-none"
        whileTap={{
          scale: 0.9,
          borderRadius: "24px",
        }}
      >
        Click Me
      </motion.button>

    </div>
  );
}
