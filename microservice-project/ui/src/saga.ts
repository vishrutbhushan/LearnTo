import { call, put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import * as ACTIONS from "./actions";
import { CREATE_GRAPH_REQUEST, DELETE_GRAPH_REQUEST, FETCH_GRAPH_REQUEST, FETCH_GRAPHS_REQUEST, UPDATE_GRAPH_REQUEST } from "./constants";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/graph";

function* fetchGraphs(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, API_BASE_URL);
    yield put(ACTIONS.setSavedGraphs(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(ACTIONS.displayNotification(error.message));
    } else {
      yield put(ACTIONS.displayNotification("An unknown error occurred."));
    }
  }
}

function* fetchGraph(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/${action.payload}`);
    yield put(ACTIONS.openSavedGraph(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(ACTIONS.displayNotification(error.message));
    } else {
      yield put(ACTIONS.displayNotification("An unknown error occurred."));
    }
  }
}

function* createGraph(action: {
  type: string;
  payload: any;
}): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, API_BASE_URL, action.payload);
    if (response.status === 201 || response.status === 200) {
      yield put(ACTIONS.displayNotification("Graph created successfully."));
      yield put(ACTIONS.fetchGraphs());
    } else {
      yield put(ACTIONS.displayNotification("Failed to create graph."));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ACTIONS.displayNotification(error.message));
    } else {
      yield put(ACTIONS.displayNotification("An unknown error occurred."));
    }
  }
}

function* updateGraph(action: {
  type: string;
  payload: { id: number; graph: any };
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/${action.payload.id}`,
      action.payload.graph
    );
    if (response.status === 200) {
      yield put(ACTIONS.displayNotification("Graph updated successfully."));
    } else {
      yield put(ACTIONS.displayNotification("Failed to update graph."));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ACTIONS.displayNotification(error.message));
    } else {
      yield put(ACTIONS.displayNotification("An unknown error occurred."));
    }
  }
}

function* deleteGraph(action: {
  type: string;
  payload: number;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.delete,
      `${API_BASE_URL}/${action.payload}`
    );
    if (response.status === 200) {
      yield put(ACTIONS.displayNotification("Graph deleted successfully."));
    } else {
      yield put(ACTIONS.displayNotification("Failed to delete graph."));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ACTIONS.displayNotification(error.message));
    } else {
      yield put(ACTIONS.displayNotification("An unknown error occurred."));
    }
  }
}

// Watcher Sagas
function* watchFetchGraphs() {
  yield takeEvery(FETCH_GRAPHS_REQUEST, fetchGraphs);
}

function* watchFetchGraph() {
  yield takeEvery(FETCH_GRAPH_REQUEST, fetchGraph);
}

function* watchCreateGraph() {
  yield takeEvery(CREATE_GRAPH_REQUEST, createGraph);
}

function* watchUpdateGraph() {
  yield takeEvery(UPDATE_GRAPH_REQUEST, updateGraph);
}

function* watchDeleteGraph() {
  yield takeEvery(DELETE_GRAPH_REQUEST, deleteGraph);
}

// Root Saga
export default function* rootSaga() {
  yield all([
    watchFetchGraphs(),
    watchFetchGraph(),
    watchCreateGraph(),
    watchUpdateGraph(),
    watchDeleteGraph(),
  ]);
}
