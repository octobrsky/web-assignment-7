import { useReducer, useEffect } from "react";

const initialState = {
  data: null,
  loading: true,
  error: null
};

function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export function useFetch(fetchFn, deps = []) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function executeFetch() {
      dispatch({ type: "FETCH_START" });
      try {
        const result = await fetchFn(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({
            type: "FETCH_ERROR",
            payload: err.message || "Failed to fetch data"
          });
        }
      }
    }

    executeFetch();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
