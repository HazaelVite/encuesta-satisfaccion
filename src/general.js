export const baseURL = process.env.NODE_ENV === 'development' ? 'https://api.legionsn.com/encuesta/' : 'https://api.legionsn.com/encuesta/'
export const createForm = (newForm) => {
	let formulario = new FormData();
	formulario.append('data', JSON.stringify(newForm));
	return formulario;
};