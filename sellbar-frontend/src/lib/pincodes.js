// Sample pincode data. Asli lookup chahiye to API se jodein.
const PINCODES = {
  '122001': 'Gurgaon',
  '110001': 'Delhi NCR',
  '201301': 'Noida',
  '560001': 'Bengaluru',
  '400001': 'Mumbai',
  '411001': 'Pune',
  '500001': 'Hyderabad',
  '600001': 'Chennai',
  '700001': 'Kolkata',
  '380001': 'Ahmedabad',
};

export function lookupPincode(pincode) {
  const pin = String(pincode || '').trim();
  const city = PINCODES[pin];
  return {
    pincode: pin,
    city: city || `Pincode ${pin}`,
  };
}