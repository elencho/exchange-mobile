export const actionTypes = {
  SET_MODAL_REF: 'SET_MODAL_REF',
};

export const setModalRef = (modalRef) => ({
  type: actionTypes.SET_MODAL_REF,
  modalRef,
});
