import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getFinancial(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_FINANCIAL_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}financal-room-area/?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_FINANCIAL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_FINANCIAL_API_FAIL,
    });
  }
}

export async function getUnitPrice(resolve = () => {}) {
  store.dispatch({
    type: types.GET_WATER_ELECTRICAL_UNIT_PRICE_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electrical-unit-price/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.UPDATE_NOTIFICATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_NOTIFICATION_API_FAIL,
    });
  }
}

export async function getListWaterElectricalIndexes(
  params,
  resolve = () => {}
) {
  store.dispatch({
    type: types.GET_LIST_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals-not-pagination/?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_LIST_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function getDetailedWaterElectricalIndex(
  slug,
  resolve = () => {}
) {
  store.dispatch({
    type: types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals/${slug}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function createWaterElectricalIndex(data, resolve = () => {}) {
  store.dispatch({
    type: types.CREATE_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}water-electricals/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.CREATE_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.CREATE_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function updateWaterElectricalIndex(
  slug,
  data,
  resolve = () => {}
) {
  store.dispatch({
    type: types.UPDATE_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals/${slug}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.UPDATE_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function deleteWaterElectricalIndex(slug, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals/${slug}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.DELETE_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.DELETE_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function getListWaterElectricalBills(
  area,
  time,
  resolve = () => {}
) {
  store.dispatch({
    type: types.GET_LIST_WATER_ELECTRICAL_BILL_API,
  });
  try {
    const response = await fetch(
      area
        ? `${REACT_APP_BASE_API}bills/?${area}&${time}/`
        : `${REACT_APP_BASE_API}bills/?${time}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_LIST_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}

export async function getDetailedWaterElectricalBill(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_WATER_ELECTRICAL_BILL_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}bills/${slug}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}

export async function updateWaterElectricalBill(
  slug,
  data,
  resolve = () => {}
) {
  store.dispatch({
    type: types.UPDATE_WATER_ELECTRICAL_BILL_API,
  });
  console.log("data", JSON.stringify(data));

  try {
    const response = await fetch(`${REACT_APP_BASE_API}bills/${slug}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.UPDATE_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}

export async function deleteWaterElectricalBill(slug, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_WATER_ELECTRICAL_BILL_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}bills/${slug}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.DELETE_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.DELETE_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}
export async function getStatistical(param, resolve = () => {}) {
  store.dispatch({
    type: types.GET_STATISTICAL_BILL_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}paid-bill-area/?${param}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_STATISTICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_STATISTICAL_BILL_API_FAIL,
    });
  }
}

export async function getExpenses(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_EXPENSES_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}expense/?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_EXPENSES_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_EXPENSES_API_FAIL,
    });
  }
}

export async function getRevenue(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_REVENUES_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}revenue/?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_REVENUES_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_REVENUES_API_FAIL,
    });
  }
}

export async function getContracts(resolve = () => {}) {
  store.dispatch({
    type: types.GET_CONTRACTS_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}list-contract/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_CONTRACTS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_CONTRACTS_API_FAIL,
    });
  }
}

export async function getDetailedContract(id, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_CONTRACT_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}registrations/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_DETAILED_CONTRACT_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_CONTRACT_API_FAIL,
    });
  }
}

export async function getRevenueType(resolve = () => {}) {
  store.dispatch({
    type: types.GET_REVENUE_TYPE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}type-revenue/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_REVENUE_TYPE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_REVENUE_TYPE_API_FAIL,
    });
  }
}

export async function getExpenseType(resolve = () => {}) {
  store.dispatch({
    type: types.GET_EXPENSE_TYPE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}type-expense/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_EXPENSE_TYPE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_EXPENSE_TYPE_API_FAIL,
    });
  }
}

export async function getUserBudget(resolve = () => {}) {
  store.dispatch({
    type: types.GET_BUDGET_USER_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}list-user-recieve-paid/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_BUDGET_USER_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_BUDGET_USER_API_FAIL,
    });
  }
}

export async function createRevenue(data, resolve = () => {}) {
  store.dispatch({
    type: types.POST_REVENUE_USER_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}revenue/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.POST_REVENUE_USER_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.POST_REVENUE_USER_API_FAIL,
    });
  }
}

export async function createExpense(data, resolve = () => {}) {
  store.dispatch({
    type: types.POST_EXPENSE_USER_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}expense/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.POST_EXPENSE_USER_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.POST_EXPENSE_USER_API_FAIL,
    });
  }
}

export async function updateRevenue(data, params, resolve = () => {}) {
  console.log(params);
  store.dispatch({
    type: types.UPDATE_REVENUE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}revenue/${params}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.UPDATE_REVENUE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_REVENUE_API_FAIL,
    });
  }
}

export async function updateExpense(data, params, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_EXPENSE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}expense/${params}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.UPDATE_EXPENSE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_EXPENSE_API_FAIL,
    });
  }
}

export async function deleteExpense(params, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_EXPENSE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}expense/${params}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.DELETE_EXPENSE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.DELETE_EXPENSE_API_FAIL,
    });
  }
}

export async function deleteRevenue(params, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_REVENUE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}revenue/${params}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.DELETE_REVENUE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.DELETE_REVENUE_API_FAIL,
    });
  }
}
