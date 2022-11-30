import React, { useState } from "react";
import PropTypes from "prop-types";

import { IconSearch } from "../icon";
import UserRoom from "../userRoom/UserRoom";
import useLoading from "../../hooks/useLoading";
import LoadingSpiner from "../loading/LoadingSpiner";
import useSearchUser from "../../hooks/useSearchUser";

const ModalItem = ({ users, handleSelectUser, children }) => {
  const { isLoading } = useLoading(users);
  const [searchValue, setSearchValue] = useState("");

  const listUserAffterSearch = useSearchUser(users, searchValue);

  return (
    <div className="bg-white w-[500px] rounded-xl p-10 ">
      <div className="relative mt-5">
        <input
          className="p-3 pl-12 w-full rounded-2xl bg-black27 text-white"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconSearch className=" text-white absolute left-3 top-1/2 -translate-y-1/2"></IconSearch>
      </div>
      <div className="mt-5 min-h-[390px]">
        {!isLoading ? (
          !!listUserAffterSearch.length &&
          listUserAffterSearch
            .slice(0, 3)
            .map((item) => (
              <UserRoom
                key={item.id}
                room={item}
                className="user-item mx-0"
                onClick={(e) => handleSelectUser(e, item.id)}
              ></UserRoom>
            ))
        ) : (
          <LoadingSpiner />
        )}
      </div>
      {children}
    </div>
  );
};

ModalItem.propTypes = {
  users: PropTypes.array,
  handleSelectUser: PropTypes.func,
  children: PropTypes.node,
};

export default ModalItem;
