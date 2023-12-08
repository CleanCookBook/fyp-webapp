import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 h-20 w-full bg-amber-400 flex items-center justify-center">
      <div className="flex justify-center items-center space-x-2 ml-auto mr-20">
        <FaRegCopyright />
        <p className="text-black">Copyright CleanCookBook 2023.</p>
      </div>
    </footer>
  );
};

export default Footer;
