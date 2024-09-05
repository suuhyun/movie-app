import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ReviewCard = ({ review }) => {
  const contentRef = useRef();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  useEffect(() => {
    const overflow =
      contentRef.current.scrollHeight > contentRef.current.clientHeight;
    setIsOverflowing(overflow);
  }, []);
  return (
    <div className="p-5 border-[.3px] rounded-xl border-white border-opacity-50">
      <div className="text-md font-bold mb-2">
        Written by <span className="text-[#14c6b3]">{review?.author}</span> on{" "}
        {review?.created_at.slice(0, 10)}
      </div>
      <div className={!viewMore && `line-clamp-4`} ref={contentRef}>
        {review?.content}
      </div>
      {isOverflowing && (
        <div
          className="items-center flex gap-1 mt-2 text-[#c3f4ef] cursor-pointer"
          onClick={() => setViewMore(!viewMore)}
        >
          {!viewMore ? (
            <>
              View More
              <IoIosArrowDown />
            </>
          ) : (
            <>
              View Less
              <IoIosArrowUp />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
