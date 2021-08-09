import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudents } from "../../../redux/actions/humanResource";
import * as ROUTER from "../../../utilities/constants/router";
import Pagination from "../../../components/common/Pagination";
import PostFilterForm from "../../../components/common/PostFilterForm";
import Loader from "../../../components/common/Loader";
import queryString from "query-string";
import Permissionless from "../../../components/common/Permissionless";
import { isAllowed } from "../../../utilities/helper";

const StudentPage = () => {

  const history = useHistory();

  const loader = useSelector((state) => state.humanResource.loading);

  const [studentListState, setStudentList] = useState();

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
    keyword: "",
  });

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  function handleFilterChange(newFilters) {
    setFilter({ ...filter, page: 1, keyword: newFilters.searchTerm });
  }

  function gotoPage(path) {
    window.scrollTo(0, 0);
    history.push(path);
  }

  useEffect(() => {
    const paramsString = queryString.stringify(filter);


    getStudents(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };
        window.scrollTo(0, 0);
        console.log(output);
        setStudentList(output.results);
        setPagination(pagination);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div className="pd-16" >
      {!isAllowed("quanlynhansu_group","") ? (
        <div className="align-item-ct">
          <Permissionless />
        </div>
      ) :loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="col col-full">
            <PostFilterForm
              onSubmit={handleFilterChange}
              value={filter.keyword}
            />
          </div>
          {studentListState && (
            <div>
              <table className="col col-full style-lg-box bg-color-white">
                <thead className="col col-full">
                  <tr className="col col-full">
                    <th className="col col-15 bold-text pl-4 pr-4 pt-16 pb-16">
                      STT
                    </th>
                    <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                      Họ
                    </th>
                    <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                      Tên
                    </th>
                    <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                      Giới tính
                    </th>
                    <th className="col col-4 bold-text pl-4 pr-4 pt-16 pb-16">
                      Khoa
                    </th>
                    <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                      Lớp
                    </th>
                    <th className="col col-15 bold-text pl-4 pr-4 pt-16 pb-16">
                      Chi tiết
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentListState?.map((student, index) => {
                    return (
                      <tr
                        key={index}
                        className="col col-full style-tr-hightlight"
                      >
                        <td className="col col-15 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                          #{index + 1}
                        </td>
                        <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                          {student?.last_name}
                        </td>
                        <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                          {student?.first_name}
                        </td>
                        <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                          {student?.profile?.gender ? "Nam" : "Nữ"}
                        </td>
                        <td className="col col-4 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                          {student?.profile?.faculty?.name}
                        </td>
                        <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                          {student?.profile?.my_class?.name}
                        </td>
                        <td className="col col-15 text-align-ct bold-text text-20 pl-4 pr-4 pt-16 pb-16">
                          <i
                            className="fi-rr-search-alt icon-white-active"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              gotoPage(
                                `${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_DETAILED_STUDENT}/${student.profile?.public_id}`
                              )
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="col col-full">
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default React.memo(StudentPage);
