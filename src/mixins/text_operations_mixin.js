/* Миксин содержит функцию преобразования первой буквы строки в заглавную */

export default {
	methods: {
		capitalizeFirstLetter(text) {
			const firstLetterCapitalized = text[0].toUpperCase();
			return firstLetterCapitalized + text.slice(1);
		}
	}
}