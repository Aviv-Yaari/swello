const initialState = {
  boards: [],
  board: null,
  isFullLabels: false,
  labelsClass: '',
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: { ...action.board } };
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    case 'SET_FULL_LABELS':
      return { ...state, isFullLabels: action.isFullLabels };
    case 'SET_LABELS_CLASS':
      return { ...state, labelsClass: action.labelsClass };
    default:
      return state;
  }
}
