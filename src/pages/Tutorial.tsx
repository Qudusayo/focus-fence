import Layout from "../layout/Layout";
import { FaRegPlayCircle } from "react-icons/fa";

export default function Tutorial() {
  return (
    <Layout>
      <div className="text-white w-4/5 mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8">Tutorial</h2>
        <div className="flex justify-center items-center bg-[#ffffff1a] rounded-3xl p-12 h-[40rem] text-white">
          <FaRegPlayCircle size={100} />
        </div>
      </div>
    </Layout>
  );
}
