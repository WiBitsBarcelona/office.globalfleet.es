import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActionFormField() {

	const actionFormField = ref([]);
	const actionFormFields = ref([]);
	const actionFormFieldErrors = ref([]);
	const { t } = useI18n();

	
	const getActionFormFields = async () => {
		actionFormFieldErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-form-fields/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionFormFieldErrors.value = res.errors;
			}else{
				actionFormFields.value = res.data;
			}
		})
		.catch((e) => {
			actionFormFieldErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionFormField = async (id) => {
		actionFormFieldErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-form-fields/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionFormFieldErrors.value = res.errors;
			}else{
				actionFormField.value = res.data;
			}
		})
		.catch((e) => {
			actionFormFieldErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActionFormField = async (data) => {
		actionFormFieldErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-form-fields/store`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionFormFieldErrors.value = res.errors;
			}else{
				actionFormField.value = res.data;
			}
		})
		.catch((e) => {
			actionFormFieldErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActionFormField = async (id, data) => {
		actionFormFieldErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-form-fields/update/${id}`,{
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionFormFieldErrors.value = res.errors;
			}else{
				actionFormField.value = res.data;
			}
		})
		.catch((e) => {
			actionFormFieldErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionFormField = async (id) => {
		actionFormFieldErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-form-fields/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionFormFieldErrors.value = res.errors;
			}else{
				actionFormField.value = res.data;
			}
		})
		.catch((e) => {
			actionFormFieldErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		actionFormFieldErrors,
		actionFormField,
		actionFormFields,
		getActionFormField,
		getActionFormFields,
		storeActionFormField,
		updateActionFormField,
		destroyActionFormField,
	}

}
