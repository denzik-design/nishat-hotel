export const MOCK_LOYALTY_MEMBER = {
  memberId: 'NH-ELITE-88291',
  fullName: 'Malik Hamza Farooq',
  tier: 'Nishat Black Elite',
  tierColor: 'from-zinc-950 via-zinc-900 to-amber-950',
  points: 14850,
  tierMultiplier: '2.5x Points per Stay',
  joinDate: 'March 2024',
  validity: 'Permanent Lifetime VIP',
  perks: [
    'Complimentary Executive Daily Buffet Breakfast',
    'Guaranteed 2:00 PM Late Checkout',
    'Complimentary Space-Available Room Upgrade',
    '15% Privilege Dining & Spa Discount at all 3 Properties',
    'Direct Access to Presidential Lounges & Concierge'
  ]
};

export function getAssignedRoomNumber(roomId) {
  // Generate authentic luxury room numbers based on room id
  if (roomId?.includes('presidential') || roomId?.includes('royal') || roomId?.includes('diplomatic')) {
    return 'Suite 704';
  }
  if (roomId?.includes('executive') || roomId?.includes('couture') || roomId?.includes('margalla')) {
    return 'Room 512';
  }
  return 'Room 328';
}
