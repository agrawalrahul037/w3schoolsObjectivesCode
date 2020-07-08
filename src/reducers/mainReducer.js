export default (state = {}, action) => {
    switch (action.type) {
        case "SIDE_PANEL_DATA":
            return {
                ...state,
                sidePanelData: action.payload
            }
        case "MCQ_DATA":
            return {
                ...state,
                mcqData: action.payload
            }
        default:
            return state;
    }
}