export const formatPhoneNumber = (countryCode: string, phoneNumber: string): string => {
  // Remove any non-digit characters
  const cleanCountryCode = countryCode.replace(/\D/g, '');
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Remove leading zero if present
  const numberWithoutLeadingZero = cleanPhoneNumber.replace(/^0+/, '');
  
  // Return the concatenated number without any + symbol
  return `${cleanCountryCode}${numberWithoutLeadingZero}`;
};