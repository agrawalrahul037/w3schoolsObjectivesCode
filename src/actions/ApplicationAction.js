export function storeSidePanelData(ob) {
    return (dispatch) => {
        dispatch({ type: "SIDE_PANEL_DATA", payload: ob });
    }
}
export function storeMcqData(ob) {
    return (dispatch) => {
        dispatch({ type: "MCQ_DATA", payload: ob });
    }
}