import { Route, Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";
import ContractDetail from "./containers/Financial/Contract/ContractDetail";
import Login from "./containers/Login";
import Overview from "./containers/Overview";
import Summary from "./containers/Overview/Summary";
import NotificationList from "./containers/Overview/NotificationList";
import ManageUser from "./containers/ManageUser";
import Financial from "./containers/Financial";
import Account from "./containers/Account";
import * as ROUTER from "./utilities/constants/router";
import Profile from "./containers/profile/Profile";
import Budget from "../src/containers/Financial/Budget";
import Contract from "../src/containers/Financial/Contract";
import WaterElectrical from "./containers/Financial/WaterElectrical";
import Student from "./containers/ManageUser/Student";
import Employee from "./containers/ManageUser/Employee";
import Registration from "./containers/ManageUser/Registration";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
function App() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path="/" exact>
          <Redirect to={ROUTER.ROUTE_OVERVIEW} />
        </Route>
        <Route path={ROUTER.ROUTE_LOGIN} component={Login} exact />
        <Route
          path={ROUTER.ROUTE_RESET_PASSWORD}
          component={ForgotPassword}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_FORGOT_PASSWORD}/:uuid/:token`}
          component={ResetPassword}
          exact
        />
        <Route path={ROUTER.ROUTE_OVERVIEW} exact>
          <Redirect to={`${ROUTER.ROUTE_OVERVIEW}${ROUTER.ROUTER_SUMMARY}`} />
        </Route>
        <Route
          path={`${ROUTER.ROUTE_OVERVIEW}${ROUTER.ROUTER_SUMMARY}`}
          component={withAuth(Overview(Summary))}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_OVERVIEW}${ROUTER.ROUTER_NOTIFICATION}`}
          component={withAuth(Overview(NotificationList))}
          exact
        />
        <Route
          path={ROUTER.ROUTE_ACCOUNT}
          component={withAuth(Account)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_MY_PROFILE}
          component={withAuth(Profile)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_CONTRACT_DETAIL}/:contractId`}
          component={withAuth(Financial(ContractDetail))}
          exact
        />
        <Route path={ROUTER.ROUTE_MANAGE_FINANCIAL} exact>
          <Redirect
            to={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_BUDGET}`}
          />
        </Route>
        <Route
          path={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_BUDGET}`}
          component={withAuth(Financial(Budget))}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_WATER_ELECTRICAL}`}
          component={withAuth(Financial(WaterElectrical))}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_CONTRACTS}`}
          component={withAuth(Financial(Contract))}
          exact
        />
        <Route path={ROUTER.ROUTE_MANAGE_USER} exact>
          <Redirect
            to={`${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_STUDENTS}`}
          />
        </Route>
        <Route
          path={`${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_STUDENTS}`}
          component={withAuth(ManageUser(Student))}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_EMPLOYEES}`}
          component={withAuth(ManageUser(Employee))}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_REGISTRATIONS}`}
          component={withAuth(ManageUser(Registration))}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
