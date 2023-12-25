import { useModal } from '@components/modal/global_modal'

export const useNotificationHandler = (data) => {
	const { showModal } = useModal()
	showModal(data)
}
