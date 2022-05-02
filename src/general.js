export const token = '4fd743056c0ddc68c6ab8f2c879f96d8726d55f72d95ec72bb44df58ba57ce84';
export const baseURL = process.env.NODE_ENV === 'development' ? 'https://api.legionsn.com/encuesta/' : 'https://api.legionsn.com/encuesta/'


export const rules = {
	required: v => !!v || 'Este campo es requerido',
	onehundred: v => v.length <= 100 || 'Escribe 100 caracteres como máximo',
	seventen: v => v.length <= 17 || 'Escribe 17 caracteres como máximo',
};

export const createForm = (newForm) => {
	let formulario = new FormData();
	formulario.append('data', JSON.stringify(newForm));
	//console.log(formulario.get('data')); //Permite observar lo que se envia al API desde la consola
	return formulario;
};

export const definido = (value) => {
	return value !== undefined && value !== null && value !== '';
}