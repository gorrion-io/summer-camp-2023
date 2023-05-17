import Image from "next/image";
import imageSvg from "../public/LoaderSvg.svg";

const Loader = () => {
  return (
    <div>
      <div className='absolute left-[45%] right-0 mx-auto '>
        <Image src={imageSvg} alt='loader' />
      </div>
    </div>
  );
};

export default Loader;
