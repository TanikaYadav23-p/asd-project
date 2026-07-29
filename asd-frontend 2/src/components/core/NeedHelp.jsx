import React from "react";
import girl from "../../assets/Images/webp/girl.webp";
import { FiPhone } from "react-icons/fi";

const NeedHelp = ({ mobile, para, heading }) => {
  return (
    <div className="relative flex items-center py-5">
      <div className="flex-1">
        <div>
          <h3 className="text-xs  font-bold text-gray-900 mb-4">{heading} </h3>

          <p className="text-xs font-medium text-[#64748B] mb-4">{para}</p>
        </div>
        {mobile && ( <div className="flex items-center gap-2 font-medium text-xs  text-gray-700">
          <FiPhone />
          {mobile}
        </div>)

        }
       
      </div>

      {/* <div className=" flex flex-row  "> */}
      <div className="">
        <img
          src={girl}
          alt="Support"
          className=" absolute hidden lg:block lg:-bottom-4 lg:-right-52  h-28 object-contain"
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default NeedHelp;
