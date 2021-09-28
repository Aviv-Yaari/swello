const initialState = {
  popoverListId: null,
  isLoadingPage: true,
  cardPopover: { type: '', anchorEl: null, props: null },
};

export function systemReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POPOVER':
      return { ...state, popoverListId: action.popoverListId };
    case 'SET_CARD_POPOVER':
      const { name, anchorEl, props } = action;
      return {
        ...state,
        cardPopover: { name, anchorEl, props },
      };
    case 'SHOW_LOADING_PAGE':
      return { ...state, isLoadingPage: true };
    case 'HIDE_LOADING_PAGE':
      return { ...state, isLoadingPage: false };
    default:
      return state;
  }
}
