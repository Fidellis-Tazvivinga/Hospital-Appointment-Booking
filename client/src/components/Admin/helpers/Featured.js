import "./Helpers.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { UpOutlined, DownOutlined, MoreOutlined } from "@ant-design/icons"
const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Growth</h1>
                <MoreOutlined fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className="title">Total Bookings made today</p>
                <p className="amount">420</p>
                <p className="desc">
                    Previous bookings processing. Last bookings may not be included.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult negative">
                            <DownOutlined fontSize="small" />
                            <div className="resultAmount">12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult positive">
                            <UpOutlined fontSize="small" />
                            <div className="resultAmount">12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <UpOutlined fontSize="small" />
                            <div className="resultAmount">42.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
