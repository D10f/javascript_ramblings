/**
* https://theconversation.com/a-computer-can-guess-more-than-100-000-000-000-passwords-per-second-still-think-yours-is-secure-144418
* https://generatepasswords.org/how-to-calculate-entropy/
*/

/**
* Outputs a random password out of cryptographically secure random numbers
* @param  {number} lenght length of the password
* @return {string} password of specified length and character options
*/
const generatePassword = (length) => {

  const decoder = new TextDecoder();

  let password = '';

  while (password.length < length) {
    const byte = crypto.getRandomValues(new Uint8Array(1));

    if (byte[0] < 33 || byte[0] > 126) {
      continue;
    }

    password += decoder.decode(byte);
  }

  return password;
};

/**
* Calculates the theoretical entropy of a given password and the estimated time required to break it
* @param  {string} password the password to check
* @return {object} an object describing the entropy bits of the password and estimated time to break it.
*/
const calculatePasswordStrength = async (password) => {
  // Character set based on the unicode standard, assuming Englsh alphabet and
  // special characters such as !@#$%^&*() and others are used.
  const characterSetLength = 123;
  const passwordLength = password.length;
  const possibleCombinations = Math.pow(characterSetLength, passwordLength);

  // Theoretical entropy based on length and character set length
  const bitsOfEntropy = Math.log2(possibleCombinations);

  // Statistically an attacker would guess the password correctly at half the total combinations
  const averageGuesses = Math.pow(2, bitsOfEntropy - 1);

  // Assuming 2019 record of 100,000,000,000 passwords per second
  const timeToAverageInSeconds = averageGuesses / 100_000_000_000;
  const timeToAverageInDays = timeToAverageInSeconds / 86400;

  // Convert password into SHA-1 hash
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Check HIBP service
  const url = `https://api.pwnedpasswords.com/range/${hash.slice(0,5)}`;

  const response = await fetch(url);
  const results = await response.text();
  const data = results.split('\n').map(hash => hash.split(':')[0]);

  const match = data.find(hash => hash.statsWith(hash.slice(6, 12).toUpperCase()));

  if (match) {
    console.log('Your password has been found on a public list of leaked passwords');
  }
};
