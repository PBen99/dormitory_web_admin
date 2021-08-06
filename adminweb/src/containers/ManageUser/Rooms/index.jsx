import "react-tabs/style/react-tabs.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Room from "./Room";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ReactModal from "react-modal";
import moment from "moment";
import {
  getRoomDetails,
  getRooms,
  deleteStudentInRoom,
} from "../../../redux/actions/humanResource";
import { getRoom } from "../../../utilities/constants/DataRender/checkroom";
import queryString from "query-string";
import Pagination from "../../../components/common/Pagination";
import Loader from "../../../components/common/Loader";
import Permissionless from "../../../components/common/Permissionless";
import YesNoModal from "../../../components/YesNoModal";
import { isAllowed } from "../../../utilities/helper";

export default function Student() {
  const [dataArea, setDataArea] = useState();

  const [studentToDelete, setStudentToDelete] = useState([]);

  const [peopleInRoom, setPeopleInRoom] = useState();

  const [slugSelected, setSlugSelected] = useState();

  const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);

  const loader = useSelector((state) => state.humanResource.loading);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  useEffect(() => {
    const paramsString = queryString.stringify(filter);

    const GetAllRooms = () => {
      getRooms(paramsString, (output) => {
        if (output) {
          const pagination = {
            page: output.current_page,
            page_size: output.page_size,
            totals: output.totals,
          };
          setDataArea(getRoom(output));
          setPagination(pagination);
        }
      });
    };
    GetAllRooms();
  }, [filter]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#re",
          },
          paper: {
            width: "1200px",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
            height: "15px",
          },
        },
      },
    });
  const handleClickRoom = (slug) => {
    setSlugSelected(slug);
    getRoomDetails(slug, (output) => {
      if (output) {
        setPeopleInRoom(convertDataForTable(output));
      }
    });
    setIsModalVisible(true);
  };
  useEffect(() => {
    setStudentToDelete([]);
  }, [isModalVisible]);
  const handleDeletePeople = () => {
    studentToDelete.map((index) => {
      return deleteStudentInRoom(index.publicId, () => {
        getRoomDetails(slugSelected, (output) => {
          if (output) {
            setPeopleInRoom(convertDataForTable(output));
          }
        });
      });
    });

    setStudentToDelete([]);
    setIsYesNoModalVisible(false);
  };
  const getHyphenatedDate = (dateString) =>
    moment(dateString, "DD-MM-YYYY").format("DD/MM/YYYY");
  const convertDataForTable = (data) => {
    return data.list_user.map((n) => ({
      publicId: n.public_id,
      name: n.last_name + " " + n.first_name,
      account: n.username,
      class: n.my_class_id,
      phone: n.phone,
      birth_day: getHyphenatedDate(n.birthday),
      birth_day_number: moment(n.birthday, "DD-MM-YYYY").toDate().getTime(),
    }));
  };
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "account",
      label: "Account",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "class",
      label: "Lớp học phần",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "SĐT liên lạc",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "birth_day",
      label: "Birthday",
      options: {
        filter: true,
        sort: true,
      },
      customBodyRender: (value) => moment(new Date(value)).format("DD/MM/YYYY"),
    },
  ];

  const options = {
    filterType: "textField",
    pagination: false,
    onRowsDelete: (rowsDeleted, dataRows) => {
      const tempArr = [];
      rowsDeleted.data.map((index) => {
        const temp = peopleInRoom[index.index];
        return tempArr.push(temp);
      });
      setStudentToDelete(tempArr);
      setIsYesNoModalVisible(true);
    },
    customHeadRender: () => {
      return null;
    },
  };

  return (
    <div className="col col-full pl-48 pr-24">
      {!isAllowed("quanlynhansu_group", "view_room") ? (
        <div className="align-item-ct">
          <Permissionless />
        </div>
      ) : loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {dataArea &&
            dataArea.map((area, index) => {
              return (
                <div
                  key={index}
                  className="col col-full style-lg-box bg-color-white mb-24"
                >
                  <p className="bold-text">{area.name}</p>
                  {area.rooms.map((room, i) => {
                    return (
                      <div key={i} className="col col-5 pd-8">
                        <Room
                          name={room.name}
                          maximum={room.typeroom.number_max}
                          numberNow={room.number_now}
                          onClick={() => handleClickRoom(room.slug)}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          <ReactModal
            isOpen={isModalVisible}
            onRequestClose={hideModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <div>
              <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={"Thành viên trong phòng"}
                  data={peopleInRoom}
                  columns={columns}
                  options={options}
                ></MUIDataTable>
              </MuiThemeProvider>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                }}
              ></div>
            </div>
          </ReactModal>
          <div className="col col-full">
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
          <YesNoModal
            isModalVisible={isYesNoModalVisible}
            hideModal={() => setIsYesNoModalVisible(false)}
            title={"Xoá người"}
            message={
              "Bạn có chắc chắn muốn xoá những người này khỏi phòng không?"
            }
            okText={"Xoá"}
            cancelText={"Huỷ"}
            onOk={handleDeletePeople}
            onCancel={() => setIsYesNoModalVisible(false)}
          />
        </div>
      )}
    </div>
  );
}
