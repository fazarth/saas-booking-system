import { useEffect, useState } from "react";
import axios from "api/axios";

import Banner from "./components/resourcePage/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/customer/booking/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/customer/booking/variables/tableColumnsTopCreators";
import HistoryCard from "./components/resourcePage/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import BookingCard from "components/card/BookingCard";

import ResourcesHeader from "./components/resourcePage/ResourcesHeader";
import ResourceList from "./components/resourcePage/ResourceList";

import NeedResourceNotification from "components/role/owner/NeedResourceNotification";
import useNeedResourceNotification from "hooks/owner/validateHasResource/useNeedResourceNotification";

const Resources = () => {
  const [refresh, setRefresh] = useState(false);
  const [resources, setResources] = useState([]);

  const handleRefreshResources = () => {
    setRefresh((prev) => !prev);
  };

  const { show, triggerNotification, closeNotification } =
    useNeedResourceNotification();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("/resources");
        setResources(res.data);

        if (res.data.length === 0) {
          triggerNotification();
        }
      } catch (err) {
        console.error("Error fetching resources:", err);
        triggerNotification();
      }
    };

    fetchResources();
  }, [refresh]);

  return (
    <>
      {show && <NeedResourceNotification onClose={closeNotification} />}
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          {/* Resources Header */}
          <ResourcesHeader
            onCreateSuccess={handleRefreshResources}
            resources={resources} // kasih ke header biar bisa pakai resourceName
          />

          {/* Resources Banner */}
          {resources.length > 0 && <Banner />}

          <ResourceList refresh={refresh} />

          {/* Recently Added (opsional) */}
          {/* <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
              Recently Added
            </h4>
          </div> */}

          {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <BookingCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Abstract Colors"
              author="Esthera Jackson"
              price="0.91"
              image={NFt4}
            />
            <BookingCard
              bidders={[avatar1, avatar2, avatar3]}
              title="ETH AI Brain"
              author="Nick Wilson"
              price="0.7"
              image={NFt5}
            />
            <BookingCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Mesh Gradients"
              author="Will Smith"
              price="2.91"
              image={NFt6}
            />
          </div> */}
        </div>

        {/* right side section */}
        <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
          <TopCreatorTable
            extra="mb-5"
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          />
          <HistoryCard />
        </div>
      </div>
    </>
  );
};

export default Resources;
