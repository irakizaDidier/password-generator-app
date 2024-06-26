const password_el = document.querySelector('#password');
const length_el = document.querySelector('#length');
const length_value_el = document.querySelector('#length-value');
const uppercase_el = document.querySelector('#uppercase');
const lowercase_el = document.querySelector('#lowercase');
const numbers_el = document.querySelector('#numbers');
const symbols_el = document.querySelector('#symbols');
const strength_text_el = document.querySelector('#strength-text');
const strength_segments = document.querySelectorAll('.strength-segment');

const generate_btn = document.querySelector("#generate");
generate_btn.addEventListener('click', () => generatePassword());
const copy_btn = document.querySelector("#copy");
copy_btn.addEventListener('click', () => copyPassword());

const uppercase_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase_chars = "abcdefghijklmnopqrstuvwxyz";
const numbers_chars = "0123456789";
const symbols_chars = "!@#$%^&*()";

length_el.addEventListener('input', () => {
	length_value_el.textContent = length_el.value;
	updateRangeBackground();
});

const updateRangeBackground = () => {
	const value = ((length_el.value - length_el.min) / (length_el.max - length_el.min)) * 100;
	length_el.style.background = `linear-gradient(to right, #a4ffaf ${value}%, #3a3a4f ${value}%)`;
};

const generatePassword = () => {
	let password = "";
	let char_set = "";

	if (uppercase_el.checked) char_set += uppercase_chars;
	if (lowercase_el.checked) char_set += lowercase_chars;
	if (numbers_el.checked) char_set += numbers_chars;
	if (symbols_el.checked) char_set += symbols_chars;

	if (char_set.length === 0) {
		password_el.value = "";
		return;
	}

	for (let i = 0; i < length_el.value; i++) {
		const random_idx = Math.floor(Math.random() * char_set.length);
		password += char_set[random_idx];
	}

	password_el.value = password;
	calculateStrength(password);
	strength_text_el.classList.remove('hidden');
};

const copyPassword = () => {
	password_el.select();
	document.execCommand('copy');
};

const calculateStrength = (password = "") => {
	let strength = 0;

	const [lowercaseRegex, uppercaseRegex, numbersRegex, symbolsRegex] = [
		/[a-z]/,
		/[A-Z]/,
		/[0-9]/,
		/[^a-zA-Z0-9]/
	];

	[lowercaseRegex, uppercaseRegex, numbersRegex, symbolsRegex].forEach((regex) => {
		if (regex.test(password)) {
			strength += 1;
		}
	});

	if (password.length < 8) strength = 1;

	strength_text_el.textContent = getStrengthText(strength);
	updateStrengthSegments(strength);
};

const getStrengthText = (strength) => {
	switch (strength) {
		case 1:
			return 'Too Weak!';
		case 2:
			return 'Weak';
		case 3:
			return 'Medium';
		case 4:
			return 'Strong';
		default:
			return 'Too Weak!';
	}
};

const updateStrengthSegments = (strength) => {
	strength_segments.forEach((segment, index) => {
		segment.className = 'strength-segment';

		if (index < strength) {
			switch (strength) {
				case 1:
					segment.classList.add('active', 'too-weak');
					break;
				case 2:
					segment.classList.add('active', 'weak');
					break;
				case 3:
					segment.classList.add('active', 'medium');
					break;
				case 4:
					segment.classList.add('active', 'strong');
					break;
			}
		}
	});
};

updateRangeBackground();
length_value_el.textContent = length_el.value;