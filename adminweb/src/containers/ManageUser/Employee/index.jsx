import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getEmployees } from "../../../redux/actions/humanResource";
import EmployeeTag from "./EmployeeTag";
import Pagination from "../../../components/common/Pagination";
import PostFilterForm from "../../../components/common/PostFilterForm";
import Loader from "../../../components/common/Loader";
import queryString from "query-string";
import { isAllowed } from "../../../utilities/helper";
import Permissionless from "../../../components/common/Permissionless";

const EmployeePage = () => {
  const [employeeListState, setEmployeeList] = useState();

  const loader = useSelector((state) => state.humanResource.loading);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    totals: 11,
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

  useEffect(() => {
    let mounted = true;

    const paramsString = queryString.stringify(filter);

    getEmployees(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };
        if (mounted) {
          window.scrollTo(0, 0);
          setEmployeeList(output);
          setPagination(pagination);
        }
      }
    });
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div>
      <div className="col col-full pd-16" style={{ height: "107vh" }}>
        {!isAllowed("quanlynhansu_group", "") ? (
          <div className="align-item-ct">
            <Permissionless />
          </div>
        ) : loader ? (
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
            <div>
              {employeeListState?.results?.map((employee, index) => {
                return (
                  <div key={index} className="col col-5 pd-8">
                    <EmployeeTag
                      slug={employee.profile?.public_id}
                      name={employee.first_name + " " + employee.last_name}
                      email={employee.email}
                      phone={employee.profile?.phone}
                    />
                  </div>
                );
              })}
            </div>
            <div className="col col-full">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default React.memo(EmployeePage);
