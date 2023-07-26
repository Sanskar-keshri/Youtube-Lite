import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { loading, mobileMenu, setMobileMenu } = useContext(Context);

    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
            {loading && <Loader />}

            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-white text-xl" />
                        ) : (
                            <SlMenu className="text-white text-xl" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-5 items-center">
                    <img
                        className="h-full hidden dark:md:block"
                        src={ytLogo}
                        alt="Youtube"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube"
                    />
                </Link>
            </div>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX/////AAD/WVn/sbH/nJz/8fH/Kir/4uL/3t7/zs7/xsb/YGD/7e3/GBj/9fX/y8v/trb/19f/PT3/oaH/jIz/goL/fX3/c3P/bm7/paX/NDT/Dg7/SEj/+vr/wcH/vLz/VFT/IiL/aGj/k5P/UFD/LS3/X1//iYn/gID/Ojr/srL/nZ3/RUX/d3eHgOMVAAAEkklEQVR4nO2d22KiQAyGWdQFBRE84QnBc9ut7/96i9tuz4ZBAiPh/+560Zn8LTCTZCYxDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzSPyOq5l2UHQ7XYHg9469lut+ai9241Pk+k5nG23W8c5mmaSJKZ5dJz051l4nk5O492uPZq3Wn687g0G6W8HgW1ZbseLdKqJPNcKuuu4Nd9NQmf/PFwcNpv+8hcfy/5mc1gMn/dOONnNW/G6G1iuF5Ws2nPtgZ9qmiVDXjnKoofJLNXrD2zX4xbXsf3TcVG9qmssF8eTb3eY1LlxOLwfbR9ZDs+xW1Re1Nv2dQsh6W97hV7OONGtQIEkvllfJ9RtvCLhjW9k76DbcmUOvVsE+rrNzsU8v8C2bptz0pYuMPd/saXb3hvw8wgMdFt7E4G6QG+l29ibWKnvVk+6bb2Rk+xn9IKtqPBBt6E386Am0LpPT0KFpaWksH5L4Ttq6349P6QvrJQeUt1WFkLlMX3SbWQhWgoKJ7qNLITK13Sv28hCrLJjGu59x2Wy6GeHpga6bSxItrf/R7eJBcleEesSfbpGmCUwqvN6f2Gf9anxfus2sSC/s5zEGm+7X8jcfHd1W1iYbobCWLeBhcmK8Y90G1iYUYbCqW4DCzPNUHjUbWBhjhkKh7oNLMwwQ2Hdl8N0QaQFdlg9Cy1ra59OJvKGMEx/wTqeGvSSzxsMNo1oV727SacveqxzmZen4sw6pAK0h8ibVTP/jTmo2F2hg1G80WDzddSnSk8E0D7wmHWu/wqNzrjCz+qYVMi7aTPfB7ZnrCNT0Ns2XjvMj0P3nlnHvs6MVOiwzmV+HnxezYbJIRXynvL6otBwK0kuJ6RC3g/7V4XpjoL3IfkRMv8UPbLO9V2hYaxL38g9UtG2iHf6nxQa3mjDOsk3FpRC5ljijwrT17HcQAIZT+xsWOe6ojB9HctMcG0o94k58XRVoWGU6FeR6SeXd3NFKDS80vyqJaWQOYdPKUwnKysJRLnAlSosza+6I4WpP1rGRo5SaPNOla3QcEvwq6jTbcxn9hQUpn/VLe+kdKCGOfOkpJDfr6KyT7yBKFWFRjTfcE5LhaKYc2uqCtPXkfOcEpVf06Yw/QSYbNNSCplvkeRRmP55ubJC1KF95ksI+RSmfhXPRo4KmM5ZZngjp0KuADl1t0S3wtQChg3APSss/38o/z2U/y2Vvx7K39PI35fK9y3k+4fyfXz5cRrE2nJyh/FS+TFv+XkL+bkn+flD+Tlg+Xl8+WcxGnCeRv6ZKPnn2uSfTZR/vlT+GWH557zln9WXf99C/p0Z+fee5N9da8D9Q/l3SOXfA5Z/l1v+fXz5NRXk18WQX9tEfn0a+TWGGlAnSn6tL/n12uTX3GtA3UT5tS/l1y+VX4O2AXWEa7z5VqwFLb+eN/fptgpR7h0gvq5+A3oj1LR3QI7+Fg3oUVLHRTF3t6C6SczdK6gB/Z4a0LOrAX3XDPm984wG9D+8ILyH5Suy+5C+IbqX7GfE9gOmVYvq6QwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBd/AeVenzu8wDl+AAAAAElFTkSuQmCC" />
                </div>
            </div>
        </div>
    );
};

export default Header;
