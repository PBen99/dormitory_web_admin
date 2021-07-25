import * as types from "../constants";

const initialState = {
  financialRooms: {},
  contracts: {},
  currentContract: {},
  expenses: {},
  revenues: {},
  revenueTypes: [],
  budgetUser: {},
  expenseTypes: [],
  statisticalBill: {},
  waterElectricalBills: {},
  detailedWaterElectricalBill: {},
  waterElectricalIndexes: {},
  detailedWaterElectricalIndex: {},
  unitPrice: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_FINANCIAL_API:
    case types.DELETE_EXPENSE_API:
    case types.DELETE_REVENUE_API:
    case types.UPDATE_REVENUE_API:
    case types.UPDATE_EXPENSE_API:
    case types.POST_EXPENSE_USER_API:
    case types.POST_REVENUE_USER_API:
    case types.GET_REVENUE_TYPE_API:
    case types.GET_BUDGET_USER_API:
    case types.GET_EXPENSE_TYPE_API:
    case types.GET_DETAILED_CONTRACT_API:
    case types.GET_REVENUES_API:
    case types.GET_WATER_ELECTRICAL_UNIT_PRICE_API:
    case types.UPDATE_WATER_ELECTRICAL_BILL_API:
    case types.DELETE_WATER_ELECTRICAL_BILL_API:
    case types.GET_LIST_WATER_ELECTRICAL_BILL_API:
    case types.GET_DETAILED_WATER_ELECTRICAL_BILL_API:
    case types.CREATE_WATER_ELECTRICAL_INDEX_API:
    case types.UPDATE_WATER_ELECTRICAL_INDEX_API:
    case types.DELETE_WATER_ELECTRICAL_INDEX_API:
    case types.GET_LIST_WATER_ELECTRICAL_INDEX_API:
    case types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API:
    case types.GET_STATISTICAL_BILL_API:
    case types.GET_EXPENSES_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_FINANCIAL_API_SUCCEED:
      return {
        ...state,
        financialRooms: actions.payload,
        loading: false,
      };
    case types.GET_EXPENSES_API_SUCCEED:
      return {
        ...state,
        expenses: actions.payload,
        loading: false,
      };
    case types.GET_BUDGET_USER_API_SUCCEED:
      return {
        ...state,
        budgetUser: actions.payload,
        loading: false,
      };
    case types.GET_WATER_ELECTRICAL_UNIT_PRICE_API_SUCCEED:
      return {
        ...state,
        unitPrice: actions.payload,
        loading: false,
      };
    case types.GET_ACCOUNTS_API_SUCCEED:
      return {
        ...state,
        contracts: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_SUCCEED:
      return {
        ...state,
        detailedWaterElectricalBill: actions.payload,
        loading: false,
      };
    case types.GET_LIST_WATER_ELECTRICAL_INDEX_API_SUCCEED:
      return {
        ...state,
        waterElectricalIndexes: actions.payload,
        loading: false,
      };
    case types.GET_STATISTICAL_BILL_API_SUCCEED:
      return {
        ...state,
        statisticalBill: actions.payload,
        loading: false,
      };
    case types.GET_LIST_WATER_ELECTRICAL_BILL_API_SUCCEED:
      return {
        ...state,
        waterElectricalBills: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_SUCCEED:
      return {
        ...state,
        detailedWaterElectricalIndex: actions.payload,
        loading: false,
      };
    case types.GET_REVENUES_API_SUCCEED:
      return {
        ...state,
        revenues: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_CONTRACT_API_SUCCEED:
      return {
        ...state,
        currentContract: actions.payload,
        loading: false,
      };
    case types.GET_REVENUE_TYPE_API_SUCCEED:
      return {
        ...state,
        revenueTypes: actions.payload,
        loading: false,
      };
    case types.GET_EXPENSE_TYPE_API_SUCCEED:
      return {
        ...state,
        expenseTypes: actions.payload,
        loading: false,
      };
    case types.GET_FINANCIAL_API_FAIL:
    case types.POST_EXPENSE_USER_API_FAIL:
    case types.DELETE_EXPENSE_API_FAIL:
    case types.DELETE_EXPENSE_API_SUCCEED:
    case types.DELETE_REVENUE_API_FAIL:
    case types.DELETE_NOTIFICATION_API_SUCCEED:
    case types.UPDATE_REVENUE_API_SUCCEED:
    case types.UPDATE_REVENUE_API_FAIL:
    case types.UPDATE_EXPENSE_API_FAIL:
    case types.UPDATE_EXPENSE_API_SUCCEED:
    case types.POST_EXPENSE_USER_API_SUCCEED:
    case types.POST_REVENUE_USER_API_FAIL:
    case types.POST_REVENUE_USER_API_SUCCEED:
    case types.GET_BUDGET_USER_API_FAIL:
    case types.GET_REVENUE_TYPE_API_FAIL:
    case types.GET_EXPENSE_TYPE_API_FAIL:
    case types.GET_CONTRACTS_API_FAIL:
    case types.GET_DETAILED_CONTRACT_API_FAIL:
    case types.GET_REVENUES_API_FAIL:
    case types.GET_EXPENSES_API_FAIL:
    case types.GET_STATISTICAL_BILL_API_FAIL:
    case types.GET_WATER_ELECTRICAL_UNIT_PRICE_API_FAIL:
    case types.UPDATE_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.DELETE_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.UPDATE_WATER_ELECTRICAL_BILL_API_SUCCEED:
    case types.DELETE_WATER_ELECTRICAL_BILL_API_SUCCEED:
    case types.GET_LIST_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.CREATE_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.UPDATE_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.DELETE_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.CREATE_WATER_ELECTRICAL_INDEX_API_SUCCEED:
    case types.UPDATE_WATER_ELECTRICAL_INDEX_API_SUCCEED:
    case types.DELETE_WATER_ELECTRICAL_INDEX_API_SUCCEED:
    case types.GET_LIST_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
